import Image from "next/image";
import {
  Calculator,
  CurrencyDollar,
  Leaf,
  ShoppingCart,
  Trash,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Button from "../components/layout/Buttom";
import CartContext from "../context/cart/cart";

export default function MyCart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState<number>(0);
  const [freight, setFreight] = useState<number>(0);

  function removeItemCart(id: string) {
    const result = cart.filter((obj) => obj.id !== id);
    setCart(result);
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

  return (
    <Fragment>
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
                    <div className="flex justify-between font-bold gap-3 items-start text-sm">
                      <span>{car.name}</span>
                      <span className="block w-32 text-right">
                        {calcPrice(car.total)}
                      </span>
                    </div>
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

        <div className="mt-5 rounded-md bg-white py-2 px-5 shadow grid grid-cols-1 divide-y dark:divide-zinc-700 dark:bg-zinc-800 mb-10">
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

        <Button buttonSize="lg" isFullSize isDisabled={cart.length === 0}>
          <CurrencyDollar />
          Ir para o pagamento
        </Button>
      </div>
      <Footer space={true} />
    </Fragment>
  );
}
