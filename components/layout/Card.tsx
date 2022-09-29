import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "phosphor-react";
import Button from "./Buttom";

const Card = () => {
  const DefaultCard = () => (
    <div className="card">
      <div className="w-full">
        <Image
          src={
            "https://img.freepik.com/psd-gratuitas/modelo-de-maquete-de-cartao-de-visita-moderno-com-design-elegante_1361-3395.jpg?w=2000"
          }
          alt="NK Gráfica online cartão de visita"
          width={300}
          height={300}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      <div className="p-2">
        <span className="text-sm sm:text-base block font-bold">
          Cartão de Visita em Couché Brilho
        </span>
        <ul className="text-xs list-disc list-inside sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          <li>
            <strong>QTD:</strong> 1000
          </li>
          <li>
            <strong>Material:</strong> papel couchê 300g
          </li>
          <li>
            <strong>Produção:</strong> até 5 dias úteis
          </li>
        </ul>

        <div className="flex items-baseline gap-2 py-3">
          <span className="md:text-xl lg:text-2xl font-extrabold text-sky-700 dark:text-sky-300">
            R$ 20,00
          </span>
        </div>

        <Link href={"/produto"} passHref>
          <Button isFullSize buttonSize="sm">
            <ShoppingCart />
            Comprar
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="grid-cards">
      <DefaultCard />

      <DefaultCard />
      <DefaultCard />

      <DefaultCard />
    </div>
  );
};

export default Card;
