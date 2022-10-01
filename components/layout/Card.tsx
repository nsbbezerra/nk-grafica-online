import Image from "next/image";
import Link from "next/link";
import { Leaf, ShoppingCart } from "phosphor-react";
import Button from "./Buttom";
import { FC } from "react";
import { ProductProps } from "../../utils/Types";

const Card: FC<ProductProps> = ({ products }) => {
  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="grid-cards">
      {products?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 col-span-4 mt-10">
          <Leaf className="text-7xl animate-bounce" />
          <span>Nada para mostrar</span>
        </div>
      ) : (
        <>
          {products?.map((prod) => (
            <div className="card" key={prod.id}>
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

              <div className="p-2">
                <span className="text-sm sm:text-base block font-bold">
                  {prod.name}
                </span>

                <div
                  className="inner-html"
                  dangerouslySetInnerHTML={{ __html: prod.information.html }}
                />

                <div className="flex items-baseline gap-2 py-3">
                  <span className="md:text-xl lg:text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                    {calcPrice(prod.price)}
                  </span>
                </div>

                <Link href={"/produto"} passHref>
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

export default Card;
