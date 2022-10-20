import Image from "next/image";
import Link from "next/link";
import { Leaf, ShoppingCart, Truck } from "phosphor-react";
import Button from "./Buttom";
import { FC } from "react";
import { ProductProps } from "../../utils/Types";

const CardProducts: FC<ProductProps> = ({ products }) => {
  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="grid-cards-products">
      {products?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 col-span-4 mt-10">
          <Leaf className="text-7xl animate-bounce" />
          <span>Nada para mostrar</span>
        </div>
      ) : (
        <>
          {products?.map((prod) => (
            <div className="card" key={prod.id}>
              {prod.shippingOptions === "fast" && (
                <div className="flex items-center gap-2 bg-sky-100 text-sm rounded-md py-1 px-2 text-sky-700 font-semibold w-fit absolute z-[5] dark:bg-zinc-600 dark:text-white right-3 top-3 shadow">
                  <Truck weight="fill" className="text-base" />
                  <span>Entrega rápida</span>
                </div>
              )}
              <div className="w-full">
                <Image
                  src={prod.images[0].url}
                  alt="NK Gráfica online cartão de visita"
                  width={300}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>

              <div className="p-2 relative">
                <span className="text-sm sm:text-base md:text-lg block font-bold">
                  {prod.name}
                </span>

                <div
                  className="inner-html"
                  dangerouslySetInnerHTML={{ __html: prod.information.html }}
                />

                <div className="flex items-center gap-2 py-3 justify-between">
                  <span className="md:text-xl lg:text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                    {calcPrice(prod.price)}
                  </span>
                </div>

                <Link href={`/produto/${prod.id}`} passHref>
                  <Button isFullSize>
                    <ShoppingCart />
                    Comprar
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CardProducts;
