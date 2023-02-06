import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Barcode,
  Check,
  CircleNotch,
  CreditCard,
  CurrencyDollar,
  IdentificationCard,
  ShoppingCart,
  Trash,
  User,
  X,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";
import Steps from "../../../components/layout/Steps";
import Toast from "../../../components/layout/Toast";
import ClientContext from "../../../context/client/client";
import {
  CANCEL_ORDER,
  FIND_ORDERS_BY_CLIENT,
  PUBLISH_ORDER,
} from "../../../graphql/order";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

type OrderItemProps = {
  id: string;
  name: string;
  quantity: number;
  total: number;
  unity: number;
  thumbnail: string;
};

interface OrdersProps {
  id: string;
  orderStatus:
    | "payment"
    | "design"
    | "production"
    | "shipping"
    | "finished"
    | "canceled";
  payment: "waiting" | "refused" | "paid_out";
  shippingInformation?: string;
  shippingValue: number;
  stripeCheckoutId: string;
  total: number;
  items: OrderItemProps[];
  paymentIntentId?: string;
  shippingId?: string;
  createdAt: Date;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const MinhasCompras: NextPage = () => {
  const { query } = useRouter();
  const { client: clientUrl } = query;
  const { client } = useContext(ClientContext);
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentsMethods, setPaymentMethods] = useState<string[]>([]);

  const [paymentsModal, setPaymentsModal] = useState<boolean>(false);

  const [findOrdersResult, findOrders] = useQuery({
    query: FIND_ORDERS_BY_CLIENT,
    variables: { client: clientUrl },
    requestPolicy: "network-only",
  });

  const { data, error, fetching } = findOrdersResult;

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data, error]);

  const [cancelOrderResults, cancelOrder] = useMutation(CANCEL_ORDER);
  const [publishOrderResults, publishOrder] = useMutation(PUBLISH_ORDER);

  async function setPublishOrder(id: string) {
    await publishOrder({ id });
  }

  const { error: publishOrderError } = publishOrderResults;
  const {
    data: cancelOrderData,
    error: cancelOrderError,
    fetching: cancelOrderFetching,
  } = cancelOrderResults;

  useEffect(() => {
    if (publishOrderError) {
      setToast({
        title: "Publish Erro",
        message: publishOrderError.message,
        type: "error",
      });
      setOpenToast(true);
    }
    if (cancelOrderError) {
      setToast({
        title: "Cancel Erro",
        message: cancelOrderError.message,
        type: "error",
      });
      setOpenToast(true);
    }
    if (cancelOrderData) {
      setPublishOrder(cancelOrderData.updateOrder.id);
      setConfirmModal(false);
      setToast({
        title: "Pedido Cancelado",
        message:
          "Seu pedido foi cancelado com sucesso, entraremos em contato com você para finalizarmos o procedimento!",
        type: "success",
      });
      setOpenToast(true);
      findOrders();
    }
  }, [publishOrderError, cancelOrderData, cancelOrderError]);

  async function setCancelOrder() {
    await cancelOrder({ id: orderId });
  }

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

  function handleCancelOrder(id: string) {
    setOrderId(id);
    setConfirmModal(true);
  }

  async function findPaymentByCheckoutId(checkoutId: string, idOrder: string) {
    setOrderId(idOrder);
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/checkout-id", {
        checkoutId,
        orderId,
      });
      setPaymentMethods(data.payments);
      setIsLoading(false);
      setPaymentsModal(true);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.message,
          title: "Erro",
        });
        setOpenToast(true);
      }
    }
  }

  async function findPaymentByIntentId(intentId: string, idOrder: string) {
    setOrderId(idOrder);
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/intents-id", {
        intentId,
      });
      setPaymentMethods(data.payments);
      setIsLoading(false);
      setPaymentsModal(true);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        setToast({
          type: "error",
          message: error.message,
          title: "Erro",
        });
        setOpenToast(true);
      }
    }
  }

  function handlePaymentInfo(
    idOrder: string,
    checkoutId: string,
    paymentIntentId: string | null | undefined
  ) {
    if (!paymentIntentId || !paymentIntentId.length) {
      findPaymentByCheckoutId(checkoutId, idOrder);
    } else {
      findPaymentByIntentId(paymentIntentId, idOrder);
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
                      className="rounded-md shadow bg-white dark:bg-zinc-800 overflow-hidden"
                      key={ord.id}
                    >
                      <div className="border-b dark:border-b-zinc-700 py-3 px-4 flex justify-center">
                        <Steps step={ord.orderStatus} />
                      </div>
                      <div className="grid grid-cols-1">
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] relative">
                          <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 sm:border-r dark:border-r-zinc-700">
                            {/** ITENS */}
                            {ord.items.map((item) => (
                              <div className="flex gap-5 p-3" key={item.id}>
                                <div className="w-[80px] h-fit rounded-md overflow-hidden">
                                  <Image
                                    src={item.thumbnail}
                                    alt="NK Gráfica online cartão de visita"
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    objectFit="cover"
                                  />
                                </div>

                                <div className="flex items-start justify-between gap-3 w-full">
                                  <div>
                                    <Link href={`/produto/${item.id}`}>
                                      <a className="block hover:underline cursor-pointer text-sm text-sky-600 dark:text-sky-300">
                                        {item.name}
                                      </a>
                                    </Link>
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
                            {ord.orderStatus !== "canceled" && (
                              <>
                                <Button
                                  isFullSize
                                  buttonSize="xs"
                                  scheme="error"
                                  onClick={() => handleCancelOrder(ord.id)}
                                >
                                  <Trash /> Cancelar pedido
                                </Button>
                                <Button
                                  isFullSize
                                  buttonSize="xs"
                                  variant="outline"
                                  isLoading={ord.id === orderId && isLoading}
                                  onClick={() =>
                                    handlePaymentInfo(
                                      ord.id,
                                      ord.stripeCheckoutId,
                                      ord.paymentIntentId
                                    )
                                  }
                                >
                                  <CurrencyDollar /> Pagamento
                                </Button>
                              </>
                            )}

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
                        <div className="border-t dark:border-t-zinc-700">
                          <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-bold">
                                Data do pedido
                              </dt>
                              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                                {formateDate(new Date(ord.createdAt))}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        {!ord.shippingInformation ? (
                          ""
                        ) : (
                          <div className="border-t dark:border-t-zinc-700">
                            <dl>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold">
                                  Rastreie seu pedido
                                </dt>
                                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                                  {formateDate(new Date(ord.createdAt))}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                        {ord.orderStatus === "canceled" && (
                          <div className="px-4 py-5 sm:px-6 bg-red-600 dark:bg-red-300 dark:text-zinc-800 font-semibold text-white">
                            PEDIDO CANCELADO
                          </div>
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

      <Dialog.Root
        open={confirmModal}
        onOpenChange={() => setConfirmModal(!confirmModal)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-login">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <Check />
                  Confirmação
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4">
                {/** FORMULÁRIO DE CADASTRO */}

                <p>Tem certeza que deseja cancelar o pedido?</p>

                <div className="flex gap-2 mt-3">
                  <Button
                    isFullSize
                    type="submit"
                    scheme="error"
                    variant="outline"
                    onClick={() => setConfirmModal(false)}
                  >
                    <X />
                    Não
                  </Button>

                  <Button
                    isFullSize
                    type="submit"
                    scheme="success"
                    isLoading={cancelOrderFetching}
                    onClick={() => setCancelOrder()}
                  >
                    <Check />
                    Sim
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={paymentsModal}
        onOpenChange={() => setPaymentsModal(false)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-login">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <CurrencyDollar />
                  Formas de Pagamento
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4 grid grid-cols-1 gap-2">
                {paymentsMethods.map((pay) => (
                  <div
                    key={pay}
                    className="border rounded-md dark:border-zinc-700 p-3 text-xl flex items-center gap-4 font-semibold"
                  >
                    {pay === "boleto" && (
                      <>
                        <Barcode className="text-3xl" />
                        <span>Boleto</span>
                      </>
                    )}
                    {pay === "card" && (
                      <>
                        <CreditCard className="text-3xl" />
                        <span>Cartão de crédito</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
};

export default MinhasCompras;
