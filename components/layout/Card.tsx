import Image from "next/image";
import { Plus, ShoppingCart } from "phosphor-react";
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
        <span className="block font-bold">
          Cartão de Visita em Couché Brilho
        </span>
        <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
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
          <span className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">
            R$ 20,00
          </span>
        </div>

        <div className="flex gap-2">
          <Button buttonSize="sm" variant="outline">
            <Plus /> Sacola
          </Button>
          <Button buttonSize="sm">
            <ShoppingCart />
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );

  const DefaultCardPlus = () => (
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
        <span className="block font-bold">
          Cartão de Visita em Couché Brilho Cartão de Visita em Couché Brilho
          Cartão de Visita em Couché Brilho Cartão de Visita em Couché Brilho
        </span>
        <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
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
          <span className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">
            R$ 20,00
          </span>
        </div>

        <div className="flex gap-2">
          <Button buttonSize="sm" variant="outline">
            <Plus /> Sacola
          </Button>
          <Button buttonSize="sm">
            <ShoppingCart />
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid-cards">
      <DefaultCard />
      <DefaultCardPlus />

      <DefaultCard />
      <DefaultCard />

      <DefaultCard />
      <DefaultCardPlus />

      <DefaultCardPlus />
      <DefaultCard />
    </div>
  );
};

export default Card;
