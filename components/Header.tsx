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
  Percent,
  Trash,
} from "phosphor-react";
import DarkTheme from "./DarkTheme";
import { useTheme } from "next-themes";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import Link from "next/link";
import Button from "./layout/Buttom";

export default function Header() {
  const { theme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);

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
      <a href="#" className="icon-buttom-xs buttom-blue">
        <WhatsappLogo />
      </a>
      <a href="#" className="icon-buttom-xs buttom-blue">
        <FacebookLogo />
      </a>
      <a href="#" className="icon-buttom-xs buttom-blue">
        <InstagramLogo />
      </a>
      <a href="#" className="icon-buttom-xs buttom-blue">
        <LinkedinLogo />
      </a>
      <DarkTheme />
    </div>
  );

  const MenuItems = () => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 gap-3">
      <Link href={"/"} passHref>
        <a className="flex items-center lg:h-12 gap-1 hover:underline cursor-pointer px-2">
          <House />
          Início
        </a>
      </Link>
      <a className="flex items-center lg:h-12 gap-1 hover:underline cursor-pointer px-2">
        <Storefront />A Empresa
      </a>
      <a className="flex items-center lg:h-12 gap-1 hover:underline cursor-pointer px-2">
        <Phone />
        Contato
      </a>
      <a className="flex items-center lg:h-12 gap-1 hover:underline cursor-pointer px-2">
        <Question />
        Como Comprar?
      </a>
      <a className="flex items-center lg:h-12 gap-1 hover:underline cursor-pointer px-2 text-red-600 dark:text-red-300 font-extrabold">
        <Percent />
        Promoções
      </a>
    </div>
  );

  return (
    <>
      <header className="w-full relative bg-gradient-to-tr from-sky-50 to-blue-200 dark:from-zinc-800 dark:to-gray-900">
        <div className="h-28 md:h-36 container mx-auto max-w-5xl px-10 xl:px-0 flex items-center justify-between gap-3">
          <div className="relative w-48 sm:w-60 md:w-72">{handleImage()}</div>

          <div className="flex flex-col gap-3 items-end">
            <div className="hidden sm:flex justify-end">
              <SocialActions />
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden lg:flex items-center">
                <UserActions />
              </div>
              <div className="relative">
                <button
                  className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-200 dark:hover:text-zinc-800 dark:border-sky-300 dark:text-sky-300"
                  onClick={() => setCart(!cart)}
                >
                  <ShoppingCart />
                </button>

                <span className="bg-zinc-900 dark:bg-zinc-700 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -right-2 top-0">
                  12
                </span>
              </div>
              <button
                className="icon-buttom-lg buttom-blue lg:hidden"
                onClick={() => setOpen(!open)}
              >
                <List />
              </button>
            </div>
          </div>
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
                      <Link href={"/produtos"} passHref>
                        <a className="grid grid-cols-[40px_1fr] gap-3 dark:hover:bg-zinc-700 p-2 rounded-md cursor-pointer hover:bg-sky-50 relative w-full items-center">
                          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
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
                          <div className="block relative">
                            <span className="text-base font-semibold block">
                              Cartões de visita
                            </span>
                            <span className="text-xs block text-zinc-500 dark:text-zinc-400">
                              Cartões de visita Cartões de visita Cartões de
                              visita Cartões de visita
                            </span>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <Popover.Arrow className="Arrow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>

            <div className="hidden lg:block">
              <MenuItems />
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 bottom-0 left-0 right-0 bg-zinc-900 z-20 bg-opacity-50 ${
          open ? "ml-0 block" : "-ml-[100%] hidden"
        }`}
      >
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-90 backdrop-blur-sm w-[70vw] h-[100%] shadow-2xl relative max-w-xs pt-5">
          <button
            className="bg-zinc-300 w-7 h-7 flex items-center justify-center absolute right-2 top-2 rounded-full dark:bg-zinc-900"
            onClick={() => setOpen(!open)}
          >
            <X />
          </button>

          <div className="p-3">
            <UserActions />

            <div className="w-full border-b mt-5 mb-5 border-b-sky-700 dark:border-b-sky-300" />

            <MenuItems />

            <div className="my-5" />

            <SocialActions />
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 bottom-0 left-0 right-0 bg-zinc-900 z-20 bg-opacity-50 flex justify-end ${
          cart ? "ml-0 block" : "-ml-[100%] hidden"
        }`}
      >
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-90 backdrop-blur-sm w-[95vw] h-[100%] shadow-2xl relative max-w-md">
          <button
            className="bg-zinc-300 w-7 h-7 flex items-center justify-center absolute right-3 top-3 rounded-full dark:bg-zinc-900"
            onClick={() => setCart(!cart)}
          >
            <X />
          </button>
          <span className="text-lg py-3 px-5 block">Meu Carrrinho</span>

          <div className="px-5 pt-3 pb-44 max-h-[100%] overflow-auto">
            <div className="grid grid-cols-1 divide-y dark:divide-zinc-700">
              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-3 py-3">
                <div className="w-full h-fit rounded-md overflow-hidden">
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
                <div>
                  <div className="flex justify-between font-bold gap-3 items-start text-sm">
                    <span>Cartão de visita 1000 unidades</span>
                    <span className="block w-36 text-right">R$ 40,00</span>
                  </div>
                  <span className="text-sm">100mt x 200mt</span>

                  <div className="flex justify-between mt-2 gap-3 items-start text-sm">
                    <span>QTD: 1</span>
                    <Button buttonSize="xs" scheme="error" variant="outline">
                      <Trash />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full absolute bottom-0 right-0 left-0 px-5 bg-white bg-opacity-80 shadow backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-80 dark:backdrop-blur-sm h-[115px] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">Total a pagar</span>
              <span className="text-lg font-bold">R$ 40,00</span>
            </div>

            <Button isFullSize buttonSize="lg">
              <ShoppingCart /> Finalizar compra
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
