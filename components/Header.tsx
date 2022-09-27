import Image from "next/image";
import {
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  User,
  ShoppingCart,
  List,
  Tag,
  House,
  Storefront,
  Phone,
  Question,
} from "phosphor-react";
import DarkTheme from "./DarkTheme";

export default function Header() {
  return (
    <>
      <header className="w-full">
        <div className="h-28 container mx-auto max-w-6xl px-10 xl:px-0 flex items-center justify-between">
          <div className="relative w-56">
            <Image
              src={"/img/logo.svg"}
              layout="responsive"
              alt="NK Gráfica Online logo"
              width={512}
              height={200}
              objectFit="cover"
            />
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 dark:border-sky-300 dark:text-sky-300">
                <User />
              </div>
              <div>
                <span className="block">Bem vindo!</span>
                <div className="flex gap-2">
                  <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
                    Entre
                  </a>
                  <span>ou</span>
                  <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
                    Cadastre-se
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <button className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-200 dark:hover:text-zinc-800 dark:border-sky-300 dark:text-sky-300">
                <ShoppingCart />
              </button>

              <span className="bg-zinc-900 dark:bg-zinc-700 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -right-2 top-0">
                12
              </span>
            </div>
          </div>

          <button className="icon-buttom-lg buttom-blue-outline lg:hidden">
            <List />
          </button>
        </div>
      </header>
      <div className="h-12 sticky top-0 z-10 bg-sky-50 shadow dark:bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-10 xl:px-0 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button className="h-12 flex text-sky-700 items-center gap-2 font-bold px-5 hover:bg-sky-700 hover:text-white dark:text-sky-300 dark:hover:bg-sky-300 dark:hover:text-zinc-800">
              <Tag />
              Todos os Produtos
            </button>

            <a className="hidden lg:flex items-center h-12 gap-1 hover:underline cursor-pointer px-2">
              <House />
              Início
            </a>
            <a className="hidden lg:flex items-center h-12 gap-1 hover:underline cursor-pointer px-2">
              <Storefront />A Empresa
            </a>
            <a className="hidden lg:flex items-center h-12 gap-1 hover:underline cursor-pointer px-2">
              <Phone />
              Contato
            </a>
            <a className="hidden lg:flex items-center h-12 gap-1 hover:underline cursor-pointer px-2">
              <Question />
              Como Comprar?
            </a>
          </div>

          <div className="hidden sm:flex justify-end items-center gap-2 h-10">
            <a href="#" className="icon-buttom-xs buttom-blue-outline">
              <WhatsappLogo />
            </a>
            <a href="#" className="icon-buttom-xs buttom-blue-outline">
              <FacebookLogo />
            </a>
            <a href="#" className="icon-buttom-xs buttom-blue-outline">
              <InstagramLogo />
            </a>
            <a href="#" className="icon-buttom-xs buttom-blue-outline">
              <LinkedinLogo />
            </a>
            <DarkTheme />
          </div>
        </div>
      </div>
    </>
  );
}
