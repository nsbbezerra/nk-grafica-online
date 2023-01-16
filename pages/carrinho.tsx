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

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export default function MyCart() {
  const { push } = useRouter();
  const { client } = useContext(ClientContext);
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);
  const [freight, setFreight] = useState<number>(0);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setModals } = useContext(ModalsContext);

  function removeItemCart(id: string) {
    const result = cart.filter((obj) => obj.id !== id);
    setCart(result);
    localStorage.setItem("cart", JSON.stringify(result));
  }

  useEffect(() => {
    const sum = cart.reduce((a, b) => +a + +b.total, 0);
    setTotal(sum);
  }, [cart]);

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
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
    let order = {
      client: client?.id,
      total: total + freight,
      payment: "waiting",
      orderStatus: "payment",
      shippingValue: freight,
    };
    setLoading(true);
    try {
      const shipping = {
        shippingName: "Envio NK Gráfica",
        shippingTotal: freight,
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
    }
  };

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
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <ShoppingCart className="text-sky-700 dark:text-sky-300" />
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
                    <span className="text-sm">
                      {car.width ? `${car.width}mt x` : ""}
                      {car.height ? `${car.height}mt` : ""}
                    </span>

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

        <div className="rounded-md bg-white py-2 px-5 shadow flex flex-col sm:flex-row sm:items-center justify-between dark:bg-zinc-800 mt-5">
          <span>Calcular frete</span>

          <div className="flex items-center gap-3">
            <ReactInputMask
              mask={"99.999-999"}
              required
              className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
              name="cep"
              placeholder="Digite seu CEP"
            />
            <Button variant="outline" isDisabled={cart.length === 0}>
              <Calculator /> Calcular
            </Button>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-white py-2 px-5 shadow grid grid-cols-1 divide-y dark:divide-zinc-700 dark:bg-zinc-800 mb-5">
          <div className="flex items-center justify-between py-3">
            <span>Sub Total</span>
            <span>{calcPrice(total)}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span>Valor da Entrega</span>
            <span>{calcPrice(freight)}</span>
          </div>
          <div className="flex items-center justify-between py-3 font-bold text-xl">
            <span>Total a Pagar</span>
            <span>{calcPrice(total + freight)}</span>
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
