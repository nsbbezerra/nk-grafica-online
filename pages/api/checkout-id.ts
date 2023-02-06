import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PUBLISH_ORDER, UPDATE_INTENT_ID } from "../../graphql/order";
import { clientMutation } from "../../lib/urql";

const stripe_pk = process.env.STRIPE_KEY || "";
const stripe = new Stripe(stripe_pk, { apiVersion: "2022-08-01" });

export default async function checkoutId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { checkoutId, orderId } = req.body;

  try {
    const checkout = await stripe.checkout.sessions.retrieve(checkoutId);

    const intentId = await stripe.paymentIntents.retrieve(
      checkout.payment_intent as string
    );

    const { data, error } = await clientMutation
      .mutation(UPDATE_INTENT_ID, { id: orderId, checkout: intentId.id })
      .toPromise();

    if (data) {
      const { error: publishOrderError } = await clientMutation
        .mutation(PUBLISH_ORDER, { id: orderId })
        .toPromise();

      if (publishOrderError) {
        res.status(400).json({ message: publishOrderError.message });
      }
    }

    if (error) {
      res.status(400).json({ message: error.message });
    }

    res.status(200).json({ payments: intentId.payment_method_types });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao processar a requisição" });
  }
}
