import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe_pk = process.env.STRIPE_KEY || "";
const stripe = new Stripe(stripe_pk, { apiVersion: "2022-08-01" });

export default async function intentId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { intentId } = req.body;

  try {
    const payments = await stripe.paymentIntents.retrieve(intentId);

    res.status(200).json({ payments: payments.payment_method_types });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao processar a requisição" });
  }
}
