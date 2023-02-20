import axios from "axios";
import Image from "next/image";
import {
  Calculator,
  CurrencyDollar,
  FloppyDisk,
  Leaf,
  ShoppingCart,
  SignIn,
  Trash,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Button from "../components/layout/Buttom";
import Toast from "../components/layout/Toast";
import CartContext from "../context/cart/cart";
import { useRouter } from "next/router";
import ClientContext from "../context/client/client";
import ModalsContext from "../context/modals/modals";
import cx from "classnames";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Link from "next/link";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface CompaniesProps {
  id: number;
  name: string;
  price: string;
  currency: string;
  error?: string;
  company: { id: number; name: string; picture: string };
}

interface ShippingCalcProps {
  id: number;
  value: string;
  description: string;
}

export default function MyCart() {
  const { push } = useRouter();
  const { client } = useContext(ClientContext);
  const { cart, setCart } = useContext(CartContext);
  const [loadingShipping, setLoadingShipping] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cep, setCep] = useState<string>("");

  const [companies, setCompanies] = useState<CompaniesProps[]>([]);

  const [shippingCalc, setShippingCalc] = useState<ShippingCalcProps>({
    id: 0,
    description: "",
    value: "0.00",
  });

  const { setModals } = useContext(ModalsContext);

  function removeItemCart(id: string) {
    const result = cart.filter((obj) => obj.id !== id);
    setCart(result);
    localStorage.setItem("cart", JSON.stringify(result));
  }

  useEffect(() => {
    const sum = cart.reduce((a, b) => +a + +b.total, 0);
    setTotal(parseInt(String(sum)));
  }, [cart]);

  useEffect(() => {
    client.name.length && setCep(client.address.cep);
    setShippingCalc({
      id: 0,
      description: "Frete grátis",
      value: "0.00",
    });
  }, [client]);

  const calcPrice = (price: number) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const calcFinalValue = (price: number, shippingPrice: number) => {
    let sum = price + shippingPrice;
    return sum.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const setCreateOrder = async () => {
    if (client.id === "") {
      setToast({
        title: "Atenção",
        message:
          "Você não fez login, se você já possui conta clique no cabeçalho do site em Login, ou se não tem conta clique em Cadastrar-se",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }

    if (!shippingCalc.description.length) {
      setToast({
        title: "Atenção",
        message: "Escolha um tipo de frete",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }

    if (cep !== client.address.cep) {
      setToast({
        title: "Atenção",
        message:
          "Há uma divergência no endereço cadastrado com o CEP inserido no cálculo do frete.",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }

    const transformShippingCalc = parseFloat(shippingCalc.value);

    let order = {
      client: client?.id,
      total: total + parseInt(String(transformShippingCalc)),
      payment: "waiting",
      orderStatus: "payment",
      shippingValue: parseInt(String(transformShippingCalc)),
      shippingId: shippingCalc.description,
    };

    console.log(order);

    return;

    /* setLoading(true);
    try {
      const shipping = {
        shippingName: shippingCalc.description,
        shippingTotal: parseInt(String(transformShippingCalc)),
      };
      const { data } = await axios.post("/api/order", {
        order: JSON.stringify(order),
        items: JSON.stringify(cart),
        shipping: JSON.stringify(shipping),
      });
      setToast({
        title: "Sucesso",
        message: data.message,
        type: "success",
      });
      setOpenToast(true);
      setLoading(false);
      localStorage.removeItem("cart");
      push(data.url);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        setToast({
          title: "Atenção",
          message: error.message,
          type: "error",
        });
        setOpenToast(true);
      } else {
        let errorMessage = (error as Error).message;
        setToast({
          title: "Atenção",
          message: errorMessage,
          type: "error",
        });
        setOpenToast(true);
      }
    } */
  };

  async function calcShippingValue() {
    if (!cep.length || cep.includes("_")) {
      setToast({
        title: "Atenção",
        message: "Preencha o CEP corretamente",
        type: "warning",
      });
      setOpenToast(true);
      return false;
    }

    setLoadingShipping(true);

    const products = cart.map((product) => {
      return {
        id: product.id,
        width: product.shipping.width,
        height: product.shipping.height,
        length: product.shipping.lenght,
        weight: product.shipping.weight,
        insurance_value: product.total / 100,
        quantity: product.quantity,
      };
    });

    try {
      const { data } = await axios.post("/api/shipping", {
        products,
        cep: cep.replace(/\.|\-/g, ""),
      });
      setCompanies(data.shipping);
      setLoadingShipping(false);
    } catch (error) {
      setLoadingShipping(false);
      if (axios.isAxiosError(error) && error.message) {
        const message = error.message;
        setToast({
          title: "Atenção",
          message,
          type: "error",
        });
        setOpenToast(true);
      }
    }
  }

  function handleShippingInformation(id: number) {
    if (id === 0) {
      setShippingCalc({
        id: 0,
        description: "Frete grátis",
        value: "0.00",
      });
    } else {
      const result = companies.find((obj) => obj.id === id);
      setShippingCalc({
        id: result?.id || 0,
        description: `${result?.company.name} - ${result?.name}`,
        value: result?.price || "",
      });
    }
  }

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title="NK Gráfica Online | Impressões digitais e Offset" />
      <Header />
      <div className="container max-w-3xl mx-auto px-5 xl:px-0 pt-10">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3">
          <ShoppingCart className="text-primary-500 dark:text-primary-300" />
          <span>Meu carrinho</span>
        </div>

        <div className="mt-10 grid grid-cols-1 divide-y dark:divide-zinc-700 bg-white rounded-md px-5 py-2 shadow dark:bg-zinc-800">
          {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-2 col-span-4 mt-10">
              <Leaf className="text-7xl animate-bounce" />
              <span>Nada para mostrar</span>
            </div>
          ) : (
            <>
              {cart.map((car) => (
                <div
                  className="grid grid-cols-[80px_1fr] gap-3 py-3"
                  key={car.id}
                >
                  <div className="w-full h-fit rounded-md overflow-hidden">
                    <Image
                      src={car.thumbnail}
                      alt="NK Gráfica online cartão de visita"
                      width={300}
                      height={300}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold gap-3 items-start text-sm md:text-base">
                      <span>{car.productName}</span>
                      <span className="block w-32 text-right">
                        {calcPrice(car.total)}
                      </span>
                    </div>
                    <span className="text-sm">{car.name}</span>

                    <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                      <span>QTD: {car.quantity}</span>
                      <Button
                        buttonSize="xs"
                        scheme="error"
                        variant="outline"
                        onClick={() => removeItemCart(car.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {!client.name.length && (
          <div className="rounded-md bg-white py-2 px-5 shadow flex flex-col dark:bg-zinc-800 mt-5">
            <span className="font-semibold block w-full">
              Não encontramos você!
            </span>

            <div className="grid grid-cols-2 gap-5 w-full my-3">
              <button
                className="rounded-md flex flex-col justify-center items-center p-3 gap-2 buttom-blue-outline"
                onClick={() => setModals({ id: "login", isOpen: true })}
              >
                <SignIn className="text-4xl" />
                <span>Faça login</span>
              </button>

              <button
                className="rounded-md flex flex-col justify-center items-center p-3 gap-2 buttom-blue-outline"
                onClick={() => setModals({ id: "register", isOpen: true })}
              >
                <FloppyDisk className="text-4xl" />
                <span>Cadastre-se</span>
              </button>
            </div>
          </div>
        )}

        <div className="rounded-md bg-white shadow dark:bg-zinc-800 mt-5 py-2 px-5">
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between ${
              companies.length && "border-b pb-2 dark:border-b-zinc-700"
            }`}
          >
            <span className="font-semibold">Calcular frete</span>

            <div className="flex items-center gap-3">
              <ReactInputMask
                mask={"99.999-999"}
                required
                className="inputs"
                name="cep"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <Button
                variant="outline"
                isDisabled={cart.length === 0}
                onClick={() => calcShippingValue()}
                isLoading={loadingShipping}
                textLoading="Calculando..."
              >
                <Calculator /> Calcular
              </Button>
            </div>
          </div>

          <RadioGroupPrimitive.Root
            aria-label="Pokemon starters"
            value={String(shippingCalc?.id)}
            onValueChange={(e) => handleShippingInformation(Number(e))}
          >
            {cep === "77.710-000" ||
            cep === "77.704-000" ||
            cep === "77.714-000" ? (
              <div className="flex items-center justify-between border-b dark:border-b-zinc-700 last:border-b-0 py-3">
                <div className="flex items-center">
                  <RadioGroupPrimitive.Item
                    id={"0"}
                    value={"0"}
                    className={cx(
                      "peer relative w-5 h-5 rounded-full",
                      "border bg-zinc-50 dark:bg-zinc-900 text-white"
                    )}
                  >
                    <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-300" />
                    </RadioGroupPrimitive.Indicator>
                  </RadioGroupPrimitive.Item>
                  <label htmlFor={"free"} className="ml-2 block">
                    Grátis
                  </label>
                </div>

                <span className="font-semibold">R$ 0,00</span>
              </div>
            ) : (
              ""
            )}
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between border-b dark:border-b-zinc-700 last:border-b-0 py-3"
              >
                <div className="flex items-center">
                  <RadioGroupPrimitive.Item
                    id={String(company.id)}
                    value={String(company.id)}
                    className={cx(
                      "peer relative w-5 h-5 rounded-full",
                      "border bg-zinc-50 dark:bg-zinc-900 text-white"
                    )}
                  >
                    <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-300" />
                    </RadioGroupPrimitive.Indicator>
                  </RadioGroupPrimitive.Item>
                  <label htmlFor={String(company.id)} className="ml-2 block">
                    {company.company.name} - {company.name}
                  </label>
                </div>

                <span className="font-semibold">
                  {company.currency} {company.price}
                </span>
              </div>
            ))}
          </RadioGroupPrimitive.Root>
        </div>

        {!!client.name.length && (
          <div className="rounded-md bg-white shadow dark:bg-zinc-800 mt-5 py-2 px-5">
            <span className="block font-semibold">Endereço de entrega:</span>

            <div className="flex flex-col mt-2 pb-1 text-zinc-700 dark:text-zinc-300">
              <span>
                {client.address.street}, Nº {client.address.number}
              </span>
              <span>Bairro: {client.address.district}</span>
              <span>CEP: {client.address.cep}</span>
              <span>
                Cidade: {client.address.city} - {client.address.uf}
              </span>

              {cep !== client.address.cep ? (
                <div className="bg-red-600 rounded-md px-3 py-2 mt-2 text-white dark:bg-red-300 dark:text-zinc-800">
                  O CEP para o cálculo do frete está diferente do CEP do seu
                  endereço cadastrado, se você quer usar um novo endereço clique
                  no botão abaixo.
                </div>
              ) : (
                ""
              )}

              <Link href={`/minhaconta/meusdados?client=${client.id}`} passHref>
                <a className="text-primary-500 mt-2 dark:text-primary-300 hover:underline">
                  Alterar endereço
                </a>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-5 rounded-md bg-white py-2 px-5 shadow grid grid-cols-1 divide-y dark:divide-zinc-700 dark:bg-zinc-800 mb-5">
          <div className="flex items-center justify-between py-3">
            <span>Sub Total</span>
            <span>{calcPrice(total)}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span>Valor da Entrega</span>
            <span>
              {Number(shippingCalc?.value).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 font-bold text-xl">
            <span>Total a Pagar</span>
            <span>{calcFinalValue(total, Number(shippingCalc?.value))}</span>
          </div>
        </div>

        <Button
          buttonSize="lg"
          isFullSize
          isDisabled={cart.length === 0 || !client.name.length}
          onClick={() => setCreateOrder()}
          isLoading={loading}
        >
          <CurrencyDollar />
          Ir para o pagamento
        </Button>
      </div>
      <Footer space={true} />
    </Fragment>
  );
}
