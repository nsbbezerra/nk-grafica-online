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
  X,
} from "phosphor-react";
import DarkTheme from "./DarkTheme";
import { useTheme } from "next-themes";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

export default function Header() {
  const { theme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

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

  const UserActions = () => (
    <div className="flex items-center flex-col gap-3 lg:flex-row">
      <div className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 dark:border-sky-300 dark:text-sky-300">
        <User />
      </div>
      <div className="flex flex-col items-center lg:items-start">
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
  );

  const SocialActions = () => (
    <div className="flex justify-center items-center gap-2 h-10">
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
  );

  return (
    <>
      <header className="w-full relative bg-gradient-to-tr from-sky-50 to-blue-200 dark:from-zinc-800 dark:to-gray-900">
        <div className="h-28 md:h-36 container mx-auto max-w-5xl px-10 xl:px-0 flex items-center justify-between">
          <div className="relative w-48 sm:w-60 md:w-72">{handleImage()}</div>

          <div className="hidden lg:flex items-center gap-10">
            <UserActions />

            <div className="relative">
              <button className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-200 dark:hover:text-zinc-800 dark:border-sky-300 dark:text-sky-300">
                <ShoppingCart />
              </button>

              <span className="bg-zinc-900 dark:bg-zinc-700 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -right-2 top-0">
                12
              </span>
            </div>
          </div>

          <button
            className="icon-buttom-lg buttom-blue-outline lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <List />
          </button>
        </div>
      </header>

      <div className="h-12 sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm shadow-md dark:bg-zinc-900 dark:bg-opacity-90 dark:backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-10 xl:px-0 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <div className="Container">
              <Popover.Root>
                <Popover.Trigger className="h-12 flex text-sky-700 items-center gap-2 font-bold px-5 hover:bg-sky-700 hover:text-white dark:text-sky-300 dark:hover:bg-sky-300 dark:hover:text-zinc-800 select-none">
                  <Tag />
                  Todos os Produtos
                </Popover.Trigger>
                <Popover.Anchor />
                <Popover.Portal>
                  <Popover.Content className="Content">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                      <a className="flex items-center gap-3 dark:hover:bg-zinc-800 p-2 rounded-md cursor-pointer hover:bg-sky-50">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              "https://img.freepik.com/psd-gratuitas/modelo-de-modelo-de-cartao-de-visita-isometrico_1051-3064.jpg?w=2000"
                            }
                            alt="NK Gráfica online banner"
                            layout="responsive"
                            width={600}
                            height={600}
                            objectFit="cover"
                          />
                        </div>
                        <span>Cartões de visita</span>
                      </a>
                    </div>
                    <Popover.Arrow className="Arrow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>

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

          <div className="hidden sm:flex">
            <SocialActions />
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 bottom-0 left-0 right-0 bg-zinc-900 z-20 bg-opacity-30 ${
          open ? "ml-0 block" : "-ml-[100%] hidden"
        }`}
      >
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-80 backdrop-blur-sm w-[70vw] h-[100%] shadow-2xl relative max-w-xs">
          <button
            className="bg-zinc-300 w-7 h-7 flex items-center justify-center absolute right-2 top-2 rounded-full dark:bg-zinc-900"
            onClick={() => setOpen(!open)}
          >
            <X />
          </button>

          <div className="flex p-2 text-sky-700 gap-3 font-bold items-center text-xl border-b border-b-sky-700 bg-sky-50 dark:bg-zinc-800 dark:text-sky-300 dark:border-b-sky-300">
            <List />
            Menu
          </div>

          <div className="p-3 mt-5">
            <UserActions />

            <div className="w-full border-b mt-10 border-b-sky-700 dark:border-b-sky-300" />

            <div className="w-full rounded-md overflow-hidden items-center flex mt-10 mb-10 h-12">
              <button className="flex items-center gap-3 w-full border border-sky-700 h-full rounded-l-md px-3 text-sky-700 font-bold hover:bg-sky-50 select-none dark:border-sky-300 dark:text-sky-300 dark:hover:bg-zinc-800">
                <ShoppingCart /> Meu Carrinho
              </button>
              <span className="bg-sky-700 h-full w-16 text-white font-bold flex items-center justify-center dark:bg-sky-300 dark:text-zinc-800">
                12
              </span>
            </div>

            <SocialActions />
          </div>
        </div>
      </nav>
    </>
  );
}
