import Link from "next/link";
import {
  ImageSquare,
  ShoppingCart,
  Tag,
  TagSimple,
  User,
  Users,
} from "phosphor-react";
import { Fragment } from "react";
import HeadApp from "../../../components/Head";
import Button from "../../../components/layout/Buttom";
import DashboardHeader from "../../../components/layout/DashHeader";
import { configs } from "../../../configs";

export default function Dashboard() {
  return (
    <Fragment>
      <HeadApp title={`${configs.companyName} - Dashboard`} />
      <DashboardHeader />

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 container mx-auto px-5 xl:px-0 max-w-7xl py-10 gap-5">
        <div className="card">
          <div className="grid grid-cols-[50px_1fr] gap-3 items-center px-5">
            <Users className="text-3xl text-primary-500 dark:text-primary-300" />
            <div className="flex justify-center items-center flex-col">
              <span className="text-primary-500 dark:text-primary-300 font-bold text-2xl">
                1000
              </span>
              <span className="font-light text-xs text-center">CLIENTES</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-[50px_1fr] gap-3 items-center px-5">
            <Tag className="text-3xl text-primary-500 dark:text-primary-300" />
            <div className="flex justify-center items-center flex-col">
              <span className="text-primary-500 dark:text-primary-300 font-bold text-2xl">
                1000
              </span>
              <span className="font-light text-xs text-center">PRODUTOS</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-[50px_1fr] gap-3 items-center px-5">
            <ShoppingCart className="text-3xl text-primary-500 dark:text-primary-300" />
            <div className="flex justify-center items-center flex-col">
              <span className="text-primary-500 dark:text-primary-300 font-bold text-2xl">
                1000
              </span>
              <span className="font-light text-xs text-center">VENDAS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 container mx-auto px-5 xl:px-0 max-w-7xl pb-10 gap-5">
        <Link href={"/painel/dashboard/categorias/cadastro"}>
          <Button isFullSize buttonSize="lg">
            <TagSimple /> CADASTRAR CATEGORIA
          </Button>
        </Link>
        <Link href={"/painel/dashboard/produtos/cadastro"}>
          <Button isFullSize buttonSize="lg">
            <Tag /> CADASTRAR PRODUTO
          </Button>
        </Link>
        <Link href={"/painel/dashboard/clientes"}>
          <Button isFullSize buttonSize="lg">
            <User /> VISUALIZAR CLIENTES
          </Button>
        </Link>
        <Link href={"/painel/dashboard/vendas"}>
          <Button isFullSize buttonSize="lg">
            <ShoppingCart /> VISUALIZAR VENDAS
          </Button>
        </Link>
        <Link href={"/painel/dashboard/categorias/lista"}>
          <Button isFullSize buttonSize="lg">
            <TagSimple /> VISUALIZAR CATEGORIAS
          </Button>
        </Link>
        <Link href={"/painel/dashboard/produtos/lista"}>
          <Button isFullSize buttonSize="lg">
            <Tag /> VISUALIZAR PRODUTOS
          </Button>
        </Link>
        <Link href={"/painel/dashboard/imagens"}>
          <Button isFullSize buttonSize="lg">
            <ImageSquare /> VISUALIZAR IMAGENS
          </Button>
        </Link>
        <Link href={"/"}>
          <Button isFullSize buttonSize="lg">
            <ShoppingCart /> IR PARA A LOJA
          </Button>
        </Link>
      </div>
    </Fragment>
  );
}
