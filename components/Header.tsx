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
  FloppyDisk,
  SignIn,
} from "phosphor-react";
import DarkTheme from "./DarkTheme";
import { useTheme } from "next-themes";
import * as Popover from "@radix-ui/react-popover";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Button from "./layout/Buttom";
import CategoriesContext from "../context/categories/categories";
import CartContext from "../context/cart/cart";
import * as Dialog from "@radix-ui/react-dialog";
import ReactInputMask from "react-input-mask";
import * as Yup from "yup";
import { useFormik } from "formik";
import { clientMutation, clientQuery } from "../lib/urql";
import { CREATE_CLIENT, FIND_CLIENT, PUBLISH_CLIENT } from "../graphql/client";
import Toast from "./layout/Toast";
import { useQuery } from "urql";
import { FIND_CATEGORIES } from "../graphql/products";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface Client {
  id: string;
  name: string;
}

export default function Header() {
  const { theme } = useTheme();
  const { categories, setCategories } = useContext(CategoriesContext);
  const { cart: cartApp, setCart: setCartApp } = useContext(CartContext);

  const [open, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<Client | null>(null);

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findCategoriesResult, findCategories] = useQuery({
    query: FIND_CATEGORIES,
  });

  const { data: categoriesData, error: categoriesError } = findCategoriesResult;

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.categories);
    }
    if (categoriesError) {
      setToast({
        title: "Erro",
        message: categoriesError.message,
        type: "error",
      });
      setOpenToast(true);
    }
  }, [categoriesData, categoriesError]);

  useEffect(() => {
    let user = localStorage.getItem("client");
    if (user) {
      const parsed = JSON.parse(user || "");
      setClient(parsed);
    }
  }, []);

  function removeItemCart(id: string) {
    const result = cartApp.filter((obj) => obj.id !== id);
    setCartApp(result);
  }

  useEffect(() => {
    const sum = cartApp.reduce((a, b) => +a + +b.total, 0);
    setTotal(sum);
  }, [cartApp]);

  const validationSchemaRegister = Yup.object({
    name: Yup.string().required("Insira um nome"),
    document: Yup.string().required("Insira seu documento"),
    phone: Yup.string().required("Insira seu telefone"),
    password: Yup.string().required("Insira uma senha de acesso"),
    email: Yup.string()
      .email("Insira um email válido")
      .required("Insira um email"),
    street: Yup.string().required("Insira um endereço"),
    number: Yup.string().required("Insira o número do seu endereço"),
    district: Yup.string().required("Insira seu bairro"),
    cep: Yup.string().required("Insira seu CEP"),
    city: Yup.string().required("Insira sua cidade"),
    uf: Yup.string().required("Insira seu estado"),
  });

  const initalValuesRegister = {
    name: "",
    document: "",
    phone: "",
    email: "",
    street: "",
    number: "",
    comp: "",
    district: "",
    cep: "",
    city: "",
    uf: "",
    password: "",
  };

  const validationSchemaLogin = Yup.object({
    email: Yup.string()
      .email("Insira um email válido")
      .required("Insira um email"),
    password: Yup.string().required("Insira sua senha de acesso"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  async function setPublishClient(id: string) {
    clientMutation
      .mutation(PUBLISH_CLIENT, { id })
      .toPromise()
      .then((response) => {
        const data = response.data;
        const error = response.error;
        if (error) {
          setToast({
            title: "Erro",
            message: error.message,
            type: "error",
          });
          setOpenToast(true);
          setLoading(false);
        } else if (data) {
          setToast({
            title: "Sucesso",
            message: "Cadastro concluído com sucesso",
            type: "success",
          });
          setOpenToast(true);
          setLoading(false);
          setRegisterModal(false);
        }
      });
  }

  const registerFormik = useFormik({
    validationSchema: validationSchemaRegister,
    initialValues: initalValuesRegister,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const addressValues = {
        street: values.street,
        number: values.number,
        comp: values.comp,
        district: values.district,
        cep: values.cep,
        city: values.city,
        uf: values.uf,
      };
      const variables = {
        name: values.name,
        document: values.document,
        phone: values.phone,
        email: values.email,
        password: values.password,
        address: addressValues,
      };

      clientMutation
        .mutation(CREATE_CLIENT, variables)
        .toPromise()
        .then((response) => {
          const data = response.data;
          const error = response.error;
          if (error) {
            setToast({
              title: "Erro",
              message: error.message,
              type: "error",
            });
            setOpenToast(true);
            setLoading(false);
          } else if (data) {
            let id = data.createClient.id;
            setPublishClient(id);
            resetForm();
          }
        });
    },
  });

  const loginFormik = useFormik({
    validationSchema: validationSchemaLogin,
    initialValues: initialValuesLogin,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const variables = { email: values.email };
      clientQuery
        .query(FIND_CLIENT, variables)
        .toPromise()
        .then((response) => {
          const data = response.data;
          const error = response.error;
          if (error) {
            setToast({
              title: "Erro",
              message: error.message,
              type: "error",
            });
            setOpenToast(true);
            setLoading(false);
          } else if (data) {
            let { password } = data.client;
            if (password === values.password) {
              let client = { id: data.client.id, name: data.client.name };
              localStorage.setItem("client", JSON.stringify(client));
              setClient(client);
              setToast({
                title: "Sucesso",
                message: "Login realizado com sucesso",
                type: "success",
              });
              setOpenToast(true);
              setLoading(false);
              setLoginModal(false);
            } else {
              setToast({
                title: "Erro",
                message: "Senha incorreta",
                type: "error",
              });
              setOpenToast(true);
              setLoading(false);
            }
          } else {
            setToast({
              title: "Atenção",
              message: "Cliente não encontrado",
              type: "info",
            });
            setOpenToast(true);
            setLoading(false);
          }
        });
    },
  });

  function logout() {
    localStorage.removeItem("client");
    setClient(null);
  }

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
        <div className="flex gap-5 items-center w-full">
          <span className="block">Bem vindo!</span>

          {!client ? (
            ""
          ) : (
            <button
              className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300"
              onClick={() => logout()}
            >
              Sair
            </button>
          )}
        </div>
        {!client ? (
          <div className="flex gap-2">
            <button
              className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300"
              onClick={() => setLoginModal(!loginModal)}
            >
              Entre
            </button>
            <span>ou</span>
            <button
              className="text-sky-700 font-bold hover:underline cursor-pointer dark:text-sky-300"
              onClick={() => setRegisterModal(!registerModal)}
            >
              Cadastre-se
            </button>
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

  return (
    <>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
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

      <div className="h-12 sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-sm border-b border-b-sky-700 border-t dark:border-t-sky-300 border-t-sky-700 dark:border-b-sky-300">
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
                    <div className="grid grid-cols-1 gap-3 divide-y dark:divide-zinc-700 -pt-2">
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
                              <a className="grid grid-cols-[30px_1fr] gap-3 pt-3 cursor-pointer relative w-full items-center hover:underline">
                                <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
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
                                  <span className="text-base block">
                                    {cat.name}
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
              <span className="text-lg font-bold">{calcPrice(total)}</span>
            </div>

            <Button isFullSize buttonSize="lg">
              <ShoppingCart /> Finalizar compra
            </Button>
          </div>
        </div>
      </div>

      <Dialog.Root
        open={registerModal}
        onOpenChange={() => setRegisterModal(!registerModal)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="fixed w-full max-w-sm mx-auto text-center transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm rounded-md sm:max-w-xl md:max-w-xl lg:max-w-4xl left-1/2 top-1/2 z-40 shadow-2xl max-h-[90vh] overflow-auto dark:shadow-black">
              <Dialog.Title className="flex items-center justify-between gap-3 px-4 py-2 border-b font-bold dark:border-b-zinc-700 sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm">
                <div className="flex items-center gap-3 text-lg">
                  <FloppyDisk />
                  Cadastro
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>

              <form onSubmit={registerFormik.handleSubmit}>
                <div className="p-4 flex flex-col gap-2">
                  {/** FORMULÁRIO DE CADASTRO */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-3 flex flex-col items-start">
                      <label className="block">
                        Nome
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        type={"text"}
                        name="name"
                        required
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                      />
                      {registerFormik.touched.name &&
                      Boolean(registerFormik.errors.name) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.name &&
                            registerFormik.errors.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="block">
                        CPF / CNPJ
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <ReactInputMask
                        required
                        name="document"
                        value={registerFormik.values.document}
                        onChange={registerFormik.handleChange}
                        mask={"999.999.999-99"}
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                      />
                      {registerFormik.touched.document &&
                      Boolean(registerFormik.errors.document) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.document &&
                            registerFormik.errors.document}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col items-start">
                      <label className="block">
                        Telefone
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <ReactInputMask
                        mask={"(99) 99999-9999"}
                        required
                        name="phone"
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.phone}
                        onChange={registerFormik.handleChange}
                      />
                      {registerFormik.touched.phone &&
                      Boolean(registerFormik.errors.phone) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.phone &&
                            registerFormik.errors.phone}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col items-start">
                      <label className="block">
                        Email
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        type={"email"}
                        required
                        name="email"
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.email}
                        onChange={registerFormik.handleChange}
                      />
                      {registerFormik.touched.email &&
                      Boolean(registerFormik.errors.email) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.email &&
                            registerFormik.errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col items-start">
                      <label className="block">
                        Senha de acesso
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        required
                        name="password"
                        type={"password"}
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                      />
                      {registerFormik.touched.password &&
                      Boolean(registerFormik.errors.password) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.password &&
                            registerFormik.errors.password}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-3 flex flex-col items-start">
                      <label className="block">
                        Endereço
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        type={"text"}
                        required
                        name="street"
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.street}
                        onChange={registerFormik.handleChange}
                      />
                      {registerFormik.touched.street &&
                      Boolean(registerFormik.errors.street) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.street &&
                            registerFormik.errors.street}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="block">
                        Número
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.number}
                        onChange={registerFormik.handleChange}
                        name="number"
                      />
                      {registerFormik.touched.number &&
                      Boolean(registerFormik.errors.number) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.number &&
                            registerFormik.errors.number}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-start">
                      <label className="block">Complemento</label>
                      <input
                        type={"email"}
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.comp}
                        onChange={registerFormik.handleChange}
                        name="comp"
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label className="block">
                        Bairro
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        required
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.district}
                        onChange={registerFormik.handleChange}
                        name="district"
                      />
                      {registerFormik.touched.district &&
                      Boolean(registerFormik.errors.district) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.district &&
                            registerFormik.errors.district}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-5 gap-3">
                    <div className="sm:col-span-1 flex flex-col items-start">
                      <label className="block">CEP</label>
                      <ReactInputMask
                        mask={"99.999-999"}
                        required
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.cep}
                        onChange={registerFormik.handleChange}
                        name="cep"
                      />
                      {registerFormik.touched.cep &&
                      Boolean(registerFormik.errors.cep) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.cep &&
                            registerFormik.errors.cep}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="sm:col-span-3 flex flex-col items-start">
                      <label className="block">
                        Cidade
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        required
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.city}
                        onChange={registerFormik.handleChange}
                        name="city"
                      />
                      {registerFormik.touched.city &&
                      Boolean(registerFormik.errors.city) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.city &&
                            registerFormik.errors.city}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="sm:col-span-1 flex flex-col items-start">
                      <label className="block">
                        UF
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <select
                        className="border bg-white dark:border-zinc-700 dark:bg-zinc-900 h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={registerFormik.values.uf}
                        onChange={registerFormik.handleChange}
                        name="uf"
                      >
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                      {registerFormik.touched.uf &&
                      Boolean(registerFormik.errors.uf) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {registerFormik.touched.uf &&
                            registerFormik.errors.uf}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end px-4 py-2 border-t dark:border-t-zinc-700">
                  <Button buttonSize="lg" type="submit" isLoading={loading}>
                    <FloppyDisk />
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={loginModal}
        onOpenChange={() => setLoginModal(!loginModal)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="fixed w-full max-w-sm mx-auto text-center transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm rounded-md left-1/2 top-1/2 z-40 shadow-2xl max-h-[80vh] overflow-auto dark:shadow-black">
              <Dialog.Title className="flex items-center justify-between gap-3 px-4 py-2 border-b font-bold dark:border-b-zinc-700 sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-95 dark:backdrop-blur-sm">
                <div className="flex items-center gap-3 text-lg">
                  <SignIn />
                  Login
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>

              <form onSubmit={loginFormik.handleSubmit}>
                <div className="p-4">
                  {/** FORMULÁRIO DE CADASTRO */}
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    <div className="flex flex-col items-start">
                      <label className="block">
                        Email
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        autoFocus
                        type={"email"}
                        name="email"
                        required
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                      />
                      {loginFormik.touched.email &&
                      Boolean(loginFormik.errors.email) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {loginFormik.touched.email &&
                            loginFormik.errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="block">
                        Senha de acesso
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        type={"password"}
                        required
                        name="password"
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                      />
                      {loginFormik.touched.password &&
                      Boolean(loginFormik.errors.password) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {loginFormik.touched.password &&
                            loginFormik.errors.password}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <Button
                    buttonSize="lg"
                    isFullSize
                    type="submit"
                    isLoading={loading}
                  >
                    <SignIn />
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
