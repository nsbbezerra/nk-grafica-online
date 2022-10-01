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
  Leaf,
} from "phosphor-react";
import DarkTheme from "./DarkTheme";
import { useTheme } from "next-themes";
import * as Popover from "@radix-ui/react-popover";
import { useState, useContext } from "react";
import Link from "next/link";
import Button from "./layout/Buttom";
import CategoriesContext from "../context/categories/categories";
import CartContext from "../context/cart/cart";

export default function Header() {
  const { theme } = useTheme();
  const { categories } = useContext(CategoriesContext);
  const { cart: cartApp, setCart: setCartApp } = useContext(CartContext);

  const [open, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(true);

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
    <div className="flex items-center flex-col gap-3 lg:flex-row lg:w-80">
      <div className="w-12 h-12 border border-sky-700 rounded-full text-2xl flex items-center justify-center text-sky-700 dark:border-sky-300 dark:text-sky-300">
        <User />
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <span className="block">Bem vindo!</span>
        {!isLogged ? (
          <div className="flex gap-2">
            <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
              Entre
            </a>
            <span>ou</span>
            <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
              Cadastre-se
            </a>
          </div>
        ) : (
          <div className="flex sm:gap-2 sm:flex-row flex-col items-center">
            <Link href={"/minhaconta/meusdados"} passHref>
              <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
                Meus dados
              </a>
            </Link>
            <span className="hidden sm:block">-</span>
            <Link href={"/minhaconta/minhascompras"} passHref>
              <a className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300">
                Minhas compras
              </a>
            </Link>
          </div>
        )}
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

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  function removeItemCart(id: string) {
    const result = cartApp.filter((obj) => obj.id !== id);
    setCartApp(result);
  }

  return (
    <>
      <header className="w-full relative bg-gradient-to-tr from-white to-blue-200 dark:from-transparent dark:to-gray-900">
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

                <span className="bg-sky-700 dark:bg-sky-300 text-white dark:text-zinc-800 w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -right-2 top-0">
                  {cartApp.length}
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

      <div className="h-12 sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-sm border-b border-b-sky-700 dark:border-b-sky-300">
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
                      {categories.length === 0 ? (
                        ""
                      ) : (
                        <>
                          {categories.map((cat) => (
                            <Link
                              href={`/produtos/${cat.id}`}
                              passHref
                              key={cat.id}
                            >
                              <a className="grid grid-cols-[40px_1fr] gap-3 dark:hover:bg-zinc-700 p-2 rounded-md cursor-pointer hover:bg-sky-100 relative w-full items-center">
                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                  <Image
                                    src={cat.thumbnail.url}
                                    alt="NK Gráfica online banner"
                                    layout="responsive"
                                    width={600}
                                    height={600}
                                    objectFit="cover"
                                  />
                                </div>
                                <div className="block relative">
                                  <span className="text-base font-semibold block">
                                    {cat.name}
                                  </span>
                                  <span className="text-xs block text-zinc-500 dark:text-zinc-400">
                                    {cat.description}
                                  </span>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </>
                      )}
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
        <div className="bg-white dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-90 backdrop-blur-sm w-[70vw] h-[100%] shadow-2xl relative max-w-xs pt-5">
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
        <div className="bg-white dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm bg-opacity-90 backdrop-blur-sm w-[95vw] h-[100%] shadow-2xl relative max-w-md">
          <button
            className="bg-zinc-300 w-7 h-7 flex items-center justify-center absolute right-3 top-3 rounded-full dark:bg-zinc-900"
            onClick={() => setCart(!cart)}
          >
            <X />
          </button>
          <span className="text-lg py-3 px-5 block">Meu Carrrinho</span>

          <div className="px-5 pt-3 pb-44 max-h-[100%] overflow-auto">
            <div className="grid grid-cols-1 divide-y dark:divide-zinc-700">
              {cartApp.length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-2 col-span-4 mt-10">
                  <Leaf className="text-7xl animate-bounce" />
                  <span>Nada para mostrar</span>
                </div>
              ) : (
                <>
                  {cartApp.map((car) => (
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
                          <span className="block w-36 text-right">
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
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="w-full absolute bottom-0 right-0 left-0 px-5 bg-white bg-opacity-80 shadow backdrop-blur-sm dark:bg-zinc-900 dark:bg-opacity-80 dark:backdrop-blur-sm h-[115px] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">Total a pagar</span>
              <span className="text-lg font-bold">R$ 0,00</span>
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
