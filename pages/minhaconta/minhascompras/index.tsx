import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BezierCurve,
  Check,
  CircleNotch,
  HandPalm,
  Hourglass,
  IdentificationCard,
  MagnifyingGlassPlus,
  Printer,
  Receipt,
  ShoppingCart,
  Truck,
  User,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "urql";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";
import ClientContext from "../../../context/client/client";
import { FIND_ORDERS_BY_CLIENT } from "../../../graphql/order";

type ImageProps = {
  id: string;
  url: string;
};

type ProductProps = {
  id: string;
  name: string;
  images: ImageProps[];
};

type OrderItemProps = {
  id: string;
  name: string;
  quantity: number;
  total: number;
  width: number;
  height: number;
  product: ProductProps;
};

interface OrdersProps {
  id: string;
  orderStatus: "payment" | "design" | "production" | "shipping" | "finished";
  payment: "waiting" | "refused" | "paid_out";
  shippingInformation?: string;
  shippingValue: number;
  stripeCheckoutId: string;
  total: number;
  orderItems: OrderItemProps[];
  createdAt: Date;
}

interface DetailsProps {
  id: string;
  open: boolean;
}

const MinhasCompras: NextPage = () => {
  const { query } = useRouter();
  const { client: clientUrl } = query;
  const { client } = useContext(ClientContext);
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [details, setDetails] = useState<DetailsProps>({
    id: "",
    open: false,
  });

  const [findOrdersResult, findOrders] = useQuery({
    query: FIND_ORDERS_BY_CLIENT,
    variables: { client: clientUrl },
  });

  const { data, error, fetching } = findOrdersResult;

  useEffect(() => {
    console.log({ data, error });
    if (data) {
      setOrders(data.orders);
    }
  }, [data, error]);

  function formateDate(date: Date) {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("pt-br", { month: "long" });
    const year = initialDate.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Fragment>
      <HeadApp title="NK Gráfica Online | Impressões digitais e offset" />
      <Header />

      <div className="w-full grid grid-cols-[48px_1fr] md:grid-cols-[250px_1fr] overflow-hidden">
        <div className="w-full bg-white dark:bg-zinc-800 h-full shadow-lg">
          <div className="flex items-center gap-3 text-xl py-5 px-4 font-bold my-5 text-sky-700 dark:text-sky-300">
            <User className="w-[48px]" />
            <span className="hidden md:block">Minha conta</span>
          </div>

          <div className="flex flex-col">
            <Link href={`/minhaconta/meusdados?client=${client.id}`} passHref>
              <a className="flex h-12 items-center gap-3 px-3 md:px-4 border-l-4 border-l-transparent hover:border-l-sky-800 cursor-pointer select-none dark:hover:border-l-sky-400">
                <IdentificationCard className="text-lg flex-shrink-0" />
                <span className="hidden md:block">Meus dados</span>
              </a>
            </Link>
            <Link
              href={`/minhaconta/minhascompras?client=${client.id}`}
              passHref
            >
              <a className="flex h-12 items-center gap-3 px-3 md:px-4 border-l-4 border-l-sky-700 cursor-pointer select-none text-sky-700 dark:text-sky-300 dark:border-l-sky-300">
                <ShoppingCart className="text-lg flex-shrink-0" />
                <span className="hidden md:block">Minhas compras</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full py-10">
          <div className="container mx-auto px-5 xl:px-10 max-w-5xl">
            <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-10">
              <span>Minhas compras</span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {fetching ? (
                <div className="flex flex-col justify-center items-center gap-5 py-5 rounded-md shadow bg-white dark:bg-zinc-800">
                  <CircleNotch className="text-6xl animate-spin" />
                  <span>Buscando informações...</span>
                </div>
              ) : (
                <>
                  {orders.map((ord) => (
                    <div
                      className="rounded-md shadow bg-white dark:bg-zinc-800"
                      key={ord.id}
                    >
                      <div className="border-b dark:border-b-zinc-700 py-3 px-3 gap-2 flex sm:items-center justify-between flex-col sm:flex-row">
                        <span>{formateDate(ord.createdAt)}</span>
                        {ord.orderStatus === "payment" && (
                          <>
                            {(ord.payment === "paid_out" && (
                              <span className="text-sm py-1 px-2 bg-green-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-green-300 flex items-center gap-2">
                                <Check />
                                Pagamento confirmado
                              </span>
                            )) ||
                              (ord.payment === "refused" && (
                                <span className="text-sm py-1 px-2 bg-red-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-red-300 flex items-center gap-2">
                                  <HandPalm />
                                  Pagamento recusado
                                </span>
                              )) ||
                              (ord.payment === "waiting" && (
                                <span className="text-sm py-1 px-2 bg-yellow-500 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-yellow-300 flex items-center gap-2">
                                  <Hourglass />
                                  Aguardando pagamento
                                </span>
                              ))}
                          </>
                        )}
                        {ord.orderStatus === "design" && (
                          <span className="text-sm py-1 px-2 bg-green-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-green-300 flex items-center gap-2">
                            <BezierCurve />
                            Criando o design
                          </span>
                        )}
                        {ord.orderStatus === "production" && (
                          <span className="text-sm py-1 px-2 bg-green-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-green-300 flex items-center gap-2">
                            <Printer />
                            Em produção
                          </span>
                        )}
                        {ord.orderStatus === "shipping" && (
                          <span className="text-sm py-1 px-2 bg-green-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-green-300 flex items-center gap-2">
                            <Truck />
                            Pedido enviado
                          </span>
                        )}
                        {ord.orderStatus === "finished" && (
                          <span className="text-sm py-1 px-2 bg-green-600 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-green-300 flex items-center gap-2">
                            <Check />
                            Pedido finalizado
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1">
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] relative">
                          <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 sm:border-r dark:border-r-zinc-700">
                            {/** ITENS */}
                            {ord.orderItems.map((item) => (
                              <div className="flex gap-5 p-3" key={item.id}>
                                <div className="w-[80px] h-fit rounded-md overflow-hidden">
                                  <Image
                                    src={item.product.images[0].url}
                                    alt="NK Gráfica online cartão de visita"
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    objectFit="cover"
                                  />
                                </div>

                                <div className="flex items-start justify-between gap-3 w-full">
                                  <div>
                                    <Link href={`/produto/${item.product.id}`}>
                                      <a className="block hover:underline cursor-pointer text-sm text-sky-600 dark:text-sky-300">
                                        {item.product.name}
                                      </a>
                                    </Link>
                                    <span className="text-sm block">
                                      {item.name}
                                    </span>
                                    <span className="text-sm block">
                                      Dimensões: {item.width}mt x {item.height}
                                      mt
                                    </span>
                                    <span className="text-sm block">
                                      Quatidade: {item.quantity}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-sm">
                                      {calcPrice(item.total)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col gap-2 p-3">
                            <Button
                              isFullSize
                              buttonSize="sm"
                              onClick={() =>
                                setDetails({ id: ord.id, open: true })
                              }
                            >
                              <MagnifyingGlassPlus /> Ver detalhes
                            </Button>
                            <Button
                              isFullSize
                              buttonSize="sm"
                              variant="outline"
                            >
                              <Receipt /> Comprovante
                            </Button>

                            <div className="flex items-center justify-between text-sm mt-5">
                              <span>Sub Total</span>
                              <span>{calcPrice(ord.total)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Frete</span>
                              <span>{calcPrice(ord.shippingValue)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-semibold text-sky-700 dark:text-sky-300">
                              <span>Total</span>
                              <span>
                                {calcPrice(ord.total + ord.shippingValue)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {details.id === ord.id && details.open === true ? (
                          <div className="border-t dark:border-t-zinc-700">
                            <dl>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold">Envio</dt>
                                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                                  {ord.shippingInformation}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {/** CARD DE COMPRAS */}
            </div>
          </div>
        </div>
      </div>

      <Footer space={false} />
    </Fragment>
  );
};

export default MinhasCompras;
