// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  CREATE_ORDER,
  PUBLISH_ORDER,
  UPDATE_CHECKOUT_ID,
} from "../../graphql/order";
import { clientMutation } from "../../lib/urql";
import Stripe from "stripe";

type Data = {
  message?: string;
  url?: string;
};

interface Cart {
  id: string;
  thumbnail: string;
  name: string;
  productName: string;
  quantity: number;
  total: number;
  width?: number;
  height?: number;
  design: boolean | string;
  mode: "square_meter" | "unique";
  unity: number;
}

const stripe_pk = process.env.STRIPE_KEY || "";
const stripe = new Stripe(stripe_pk, { apiVersion: "2022-08-01" });

const APP_BASE_URL = process.env.APP_BASE_URL || "";

export default async function order(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { order, items, shipping } = req.body;

  try {
    const shippingOptions = JSON.parse(shipping);

    //CRIAR A ORDEM
    const orderParsed = JSON.parse(order);
    const cart: Cart[] = JSON.parse(items);
    const orderToStore = { ...orderParsed, items: cart };
    const { data: createOrderData, error: createOrderError } =
      await clientMutation.mutation(CREATE_ORDER, orderToStore).toPromise();
    if (createOrderError) {
      res.status(400).json({ message: createOrderError.message });
    }
    const orderId = createOrderData.createOrder.id;

    //CRIAR CHECKOUT
    const line_items = cart.map((car) => {
      return {
        quantity: 1,
        price_data: {
          product_data: {
            images: [car.thumbnail],
            name: car.productName,
            description: car.name,
          },
          currency: "BRL",
          unit_amount: car.total,
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${APP_BASE_URL}/sucesso?pedido=${orderId}`,
      cancel_url: `${APP_BASE_URL}/pagamento?pedido=${orderId}`,
      mode: "payment",
      line_items,
      payment_method_types: ["boleto", "card"],
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: shippingOptions.shippingName,
            fixed_amount: {
              amount: shippingOptions.shippingTotal,
              currency: "BRL",
            },
            type: "fixed_amount",
          },
        },
      ],
    });

    const { data: checkoutOrderData, error: checkoutError } =
      await clientMutation
        .mutation(UPDATE_CHECKOUT_ID, { id: orderId, checkout: session.id })
        .toPromise();

    if (checkoutOrderData) {
      //PUBLICAR A ORDEM
      const { error: publishOrderError } = await clientMutation
        .mutation(PUBLISH_ORDER, { id: orderId })
        .toPromise();

      if (publishOrderError) {
        res.status(400).json({ message: publishOrderError.message });
      }
    }

    if (checkoutError) {
      res.status(400).json({ message: checkoutError.message });
    }

    const checkoutUrl = session.url || "";

    //RETORNAR URL DO CHECKOUT

    res.status(200).json({
      message: "Vamos te redirecionar para o pagamento",
      url: checkoutUrl,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao processar a requisição" });
  }
}
