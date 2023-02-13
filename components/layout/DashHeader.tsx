import Image from "next/image";
import { Fragment, useState } from "react";
import { useTheme } from "next-themes";
import DarkTheme from "../DarkTheme";
import Button from "./Buttom";
import {
  House,
  ImageSquare,
  List,
  ShoppingCart,
  Tag,
  TagSimple,
  Users,
  X,
} from "phosphor-react";
import Link from "next/link";

export default function DashboardHeader() {
  const { theme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleImage = () => {
    if (theme === "light") {
      return (
        <Image
          src={"/img/logo.svg"}
          layout="responsive"
          alt="NK Gráfica Online logo"
          width={512}
          height={200}
          objectFit="cover"
        />
      );
    } else {
      return (
        <Image
          src={"/img/logo-transparent.svg"}
          layout="responsive"
          alt="NK Gráfica Online logo"
          width={512}
          height={200}
          objectFit="cover"
        />
      );
    }
  };

  const MenuItems = () => (
    <div className="gap-3 items-center flex flex-col lg:flex-row">
      <Link href={"/"}>
        <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
          <ShoppingCart />
          Loja
        </Button>
      </Link>
      <Link href={"/painel/dashboard"}>
        <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
          <House />
          Dashboard
        </Button>
      </Link>
      <Link href={"/painel/dashboard/imagens"}>
        <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
          <ImageSquare />
          Imagens
        </Button>
      </Link>
      <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
        <Users />
        Clientes
      </Button>
      <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
        <TagSimple />
        Categorias
      </Button>
      <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
        <Tag />
        Produtos
      </Button>
      <Button buttonSize="sm" variant="outline" isFullSize={isMenuOpen}>
        <ShoppingCart />
        Vendas
      </Button>
    </div>
  );

  return (
    <Fragment>
      <div className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-md dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-sm sticky top-0 px-5 xl:px-0 z-20">
        <section className="container mx-auto max-w-7xl flex justify-between">
          <div className="w-36">{handleImage()}</div>
          <div className="items-center gap-3 flex">
            <div className="hidden lg:block">
              <MenuItems />
            </div>
            <DarkTheme />
            <div className="block lg:hidden">
              <Button buttonSize="sm" onClick={() => setIsMenuOpen(true)}>
                <List />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <div
        className={`fixed top-0 bottom-0 left-0 right-0 bg-zinc-900 z-20 bg-opacity-50 flex justify-end ${
          isMenuOpen ? "ml-0 block" : "-ml-[100%] hidden"
        }`}
      >
        <div className="bg-white dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-90 backdrop-blur-sm w-[95vw] h-[100%] shadow-2xl relative max-w-xs">
          <button
            className="bg-zinc-300 w-7 h-7 flex items-center justify-center absolute right-3 top-3 rounded-full dark:bg-zinc-900"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </button>
          <span className="text-lg py-3 px-5 block">Menu</span>

          <div className="px-5 pt-3 pb-44 max-h-[100%] overflow-auto">
            <MenuItems />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
