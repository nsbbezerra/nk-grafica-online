import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface ProductProps {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
}

interface CompaniesProps {
  id: number;
  name: string;
  price: string;
  currency: string;
  error?: string;
  company: { id: number; name: string; picture: string };
}

const TOKEN = process.env.MELHOR_ENVIO_TOKEN || "";
const ENDPOINT = process.env.MELHOR_ENVIO_ENDPOINT || "";

export default async function Shipping(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products, cep } = req.body;
  try {
    const data = {
      from: {
        postal_code: "77710000",
      },
      to: {
        postal_code: cep,
      },
      products,
    };

    var config = {
      method: "post",
      url: `${ENDPOINT}/api/v2/me/shipment/calculate`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "User-Agent": "Aplicação contato.nk.info@gmail.com",
      },
      data: data,
    };

    const response = await axios(config);
    const companies: CompaniesProps[] = response.data;

    const shippingInfo = companies.filter((obj) => !obj.error);

    res.status(200).json({ shipping: shippingInfo });
  } catch (error) {
    if (axios.isAxiosError(error) && error.message) {
      res.status(400).json({
        message: "Ocorreu um erro ao processar a requisição",
        error: error.message,
      });
    }
    res.status(400).json({
      message: "Ocorreu um erro ao processar a requisição",
      error: error,
    });
  }
}
