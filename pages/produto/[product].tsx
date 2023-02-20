import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CaretRight,
  ChatCircle,
  Check,
  FloppyDisk,
  House,
  Pencil,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "phosphor-react";
import { Fragment, useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import Button from "../../components/layout/Buttom";
import { clientQuery } from "../../lib/urql";
import {
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
} from "../../graphql/products";
import { calcDiscount, ProductOptionsProps, Products } from "../../utils/Types";
import CartContext from "../../context/cart/cart";
import Toast from "../../components/layout/Toast";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "urql";
import { CREATE_REVIEW, PUBLISH_REVIEW } from "../../graphql/reviews";
import * as Yup from "yup";
import { useFormik } from "formik";

interface Props {
  product: Products;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const Produto: NextPage<Props> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [width, setWidth] = useState<string>("0");
  const [height, setHeight] = useState<number>(0);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);

  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const [createReviewResults, createReview] = useMutation(CREATE_REVIEW);
  const { fetching: loadingReview } = createReviewResults;
  const [publishReviewResults, publishReview] = useMutation(PUBLISH_REVIEW);
  const [options, setOptions] = useState<ProductOptionsProps | null>(null);

  const initialValues = {
    name: "",
    rating: "3",
    headline: "",
    content: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Insira seu nome"),
    rating: Yup.string().required("Selecione uma nota"),
    headline: Yup.string().required("Insira um título"),
    content: Yup.string().required("Insira uma mensagem"),
  });

  function clear() {
    setQuantity(1);
    setWidth("0");
    setHeight(0);
    setPrice(product.price);
  }

  useEffect(() => {
    setPrice(quantity * product.price);
    if (quantity < 1 || isNaN(quantity)) {
      setPrice(product.price);
    }
  }, [quantity]);

  useEffect(() => {
    if (width === "0" || isNaN(height) || height === 0) {
      setPrice(product.price);
    } else {
      let square_meter = parseFloat(width) * height;
      setPrice(quantity * square_meter * product.price);
    }
  }, [width, height]);

  const calcPrice = (price: number) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  function addToCart() {
    const finder = cart.find((obj) => obj.id === product.id);
    if (finder) {
      setToast({
        title: "Atenção",
        message: "Este produto já foi adicionado ao carrinho.",
        type: "info",
      });
      setOpenToast(true);
      return false;
    }
    if (product.productOptions.length && !options) {
      setToast({
        title: "Atenção",
        message: "Selecione uma opção para seu produto",
        type: "info",
      });
      setOpenToast(true);
      return false;
    }
    const newProduct = {
      id: product.id,
      name: product.name,
      productName: product.name,
      quantity,
      total: parseInt(String(price)),
      thumbnail: product.thumbnail.url,
      unity: product.price,
      shipping: product.shipping,
      options: {
        size: options?.size || "",
        colors: options?.colors || "",
      },
    };
    const updatedCart = [...cart, newProduct];
    setCart(updatedCart);
    setConfirmModal(true);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    clear();
  }

  const setPublishReview = (id: string) => {
    let variables = { id: id };
    publishReview(variables).then((response) => {
      const { error } = response;
      if (error) {
        setToast({
          title: "Erro",
          message: error.message,
          type: "error",
        });
        setOpenToast(true);
      }
    });
  };

  const setCreateReview = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      let variables = {
        name: values.name,
        rating: parseInt(values.rating),
        headline: values.headline,
        content: values.content,
        product: product.id,
      };
      createReview(variables).then((response) => {
        const { data, error } = response;
        if (error) {
          setToast({
            title: "Erro",
            message: error.message,
            type: "error",
          });
          setOpenToast(true);
        } else if (data) {
          const id = data.createReview.id;
          setPublishReview(id);
          resetForm();
          setDialog(false);
          setToast({
            title: "Sucesso",
            message: "Seu comentário foi enviado com sucesso",
            type: "success",
          });
          setOpenToast(true);
        }
      });
    },
  });

  function formatDate(myDate: Date) {
    const initDate = new Date(myDate);
    const day = initDate.getDate();
    const month = initDate.getMonth() + 1;
    const year = initDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp
        title={`${product.name} | NK Gráfica Online Impressões digitais e Offset`}
      />
      <Header />
      <div className="container mx-auto px-5 xl:px-0 max-w-6xl mt-10">
        <div className="bg-white dark:bg-zinc-800 flex py-2 px-4 items-center gap-3 rounded-md text-sm md:text-base shadow">
          <Link href={"/"} passHref>
            <a className="hover:underline cursor-pointer">
              <House />
            </a>
          </Link>
          <CaretRight />
          <Link href={`/produto/${product.id}`} passHref>
            <a className="hover:underline cursor-pointer">{product.name}</a>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 justify-items-center">
          <div className="w-full overflow-hidden rounded-md h-fit max-w-sm shadow bg-white dark:bg-zinc-800">
            <Image
              src={product.thumbnail.url}
              alt={`NK Gráfica online ${product.name}`}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className="lg:col-span-2 relative w-full h-full flex flex-col justify-center">
            <strong className="text-primary-500 text-3xl dark:text-primary-300">
              {product.name}{" "}
            </strong>
            {product.shippingOptions === "fast" && (
              <div className="flex items-center gap-2 bg-primary-100 rounded-md py-1 px-2 text-primary-500 font-semibold w-fit z-[5] dark:bg-zinc-600 dark:text-white shadow mt-3 text-sm">
                <Truck weight="fill" className="text-lg" />
                <span>Entrega rápida</span>
              </div>
            )}
            <span className="block">{product.description}</span>

            <div className="w-full flex flex-wrap mt-3 gap-3">
              {product.productOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`h-10 shadow flex items-center px-5  rounded-md  select-none cursor-pointer ${
                    options && options.id === opt.id
                      ? "bg-primary-500 text-white dark:bg-primary-300 dark:text-zinc-800"
                      : "bg-white dark:bg-zinc-800 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-300 dark:hover:text-zinc-800"
                  }`}
                  onClick={() =>
                    setOptions({
                      active: opt.active,
                      id: opt.id,
                      size: opt.size,
                      colors: opt.colors,
                    })
                  }
                >
                  {opt.size}
                </button>
              ))}
            </div>

            <div className="mt-3 w-full">
              <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 bg-white dark:bg-zinc-800 rounded-md p-3 shadow">
                <div className="flex gap-3 relative pb-2">
                  {product.promotional && product.promoRate ? (
                    <>
                      <strong className="text-lg text-zinc-500 line-through">
                        {calcPrice(product.price)}
                      </strong>
                      <strong className="text-3xl font-bold">
                        {calcDiscount(product.price, product.promoRate)}
                      </strong>
                      <span className="bg-secondary-500 dark:bg-secondary-300 px-2 py-1 text-white dark:text-zinc-800 rounded-md block h-fit text-xs">
                        -{product.promoRate}%
                      </span>
                    </>
                  ) : (
                    <strong className="text-3xl font-bold">
                      {calcPrice(product.price)}
                    </strong>
                  )}
                </div>

                <div className="flex gap-3 relative pt-3 font-light">
                  {product.promotional && product.promoRate ? (
                    <>
                      <strong className="text-lg text-zinc-500">
                        {calcDiscount(price, product.promoRate)}
                      </strong>
                    </>
                  ) : (
                    <strong className="text-lg text-zinc-500">
                      {calcPrice(price)}
                    </strong>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-center mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-end gap-3">
                  <div className="flex flex-col">
                    <label>
                      Quantidade{" "}
                      <span className="text-red-600 dark:text-red-300">*</span>
                    </label>
                    <input
                      type={"number"}
                      className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-300"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>

                  <Button onClick={() => addToCart()} isFullSize>
                    <ShoppingCart />
                    Adicionar ao carrinho
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md mt-10 p-5 bg-white shadow  dark:bg-zinc-800">
          <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-5">
            <span>DETALHES DO PRODUTO</span>
          </div>

          <div
            className="description-product"
            dangerouslySetInnerHTML={{ __html: product.information }}
          />
        </div>

        <div className="rounded-md mt-10 p-5 bg-white shadow dark:bg-zinc-800">
          <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-5">
            <span>COMENTÁRIOS</span>
          </div>

          <div className="grid grid-cols-1 gap-3 divide-y mb-5 dark:divide-zinc-700">
            {product.reviews.map((rev) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[150px_120px_1fr] gap-5 items-start pt-3"
                key={rev.id}
              >
                <div>
                  <strong className="block">{rev.name}</strong>
                  <span>{formatDate(rev.createdAt)}</span>
                </div>

                {!rev.rating ? (
                  <div className="flex item-center gap-2">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                ) : (
                  <>
                    {rev.rating === 1 && (
                      <div className="flex item-center gap-2">
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                    )}
                    {rev.rating === 2 && (
                      <div className="flex item-center gap-2">
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                    )}
                    {rev.rating === 3 && (
                      <div className="flex item-center gap-2">
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star />
                        <Star />
                      </div>
                    )}
                    {rev.rating === 4 && (
                      <div className="flex item-center gap-2">
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star />
                      </div>
                    )}
                    {rev.rating === 5 && (
                      <div className="flex item-center gap-2">
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                        <Star
                          className="text-yellow-500 dark:text-yellow-300"
                          weight="fill"
                        />
                      </div>
                    )}
                  </>
                )}
                <div>
                  <strong className="block">{rev.headline}</strong>
                  <span>{rev.content}</span>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={() => setDialog(true)}>
            <Pencil /> Adicionar comentário
          </Button>
        </div>
      </div>

      <Footer space={true} />

      <Dialog.Root open={dialog} onOpenChange={() => setDialog(!dialog)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-reviews">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <ChatCircle />
                  Comentários
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>

              <form onSubmit={setCreateReview.handleSubmit}>
                <div className="p-4">
                  {/** FORMULÁRIO DE CADASTRO */}
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    <div className="flex flex-col items-start col-span-3">
                      <label className="block">
                        Nome
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        autoFocus
                        name="name"
                        required
                        className="inputs"
                        value={setCreateReview.values.name}
                        onChange={setCreateReview.handleChange}
                      />
                      {setCreateReview.touched.name &&
                      Boolean(setCreateReview.errors.name) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {setCreateReview.touched.name &&
                            setCreateReview.errors.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="block">
                        Nota
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <select
                        required
                        name="rating"
                        className="inputs"
                        value={setCreateReview.values.rating}
                        onChange={setCreateReview.handleChange}
                      >
                        <option value={"1"}>Péssimo</option>
                        <option value={"2"}>Ruim</option>
                        <option value={"3"}>Regular</option>
                        <option value={"4"}>Bom</option>
                        <option value={"5"}>Ótimo</option>
                      </select>
                      {setCreateReview.touched.rating &&
                      Boolean(setCreateReview.errors.rating) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {setCreateReview.touched.rating &&
                            setCreateReview.errors.rating}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col items-start col-span-4">
                      <label className="block">
                        Título
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <input
                        name="headline"
                        required
                        className="inputs"
                        value={setCreateReview.values.headline}
                        onChange={setCreateReview.handleChange}
                      />
                      {setCreateReview.touched.headline &&
                      Boolean(setCreateReview.errors.headline) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {setCreateReview.touched.headline &&
                            setCreateReview.errors.headline}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col items-start col-span-4">
                      <label className="block">
                        Mensagem
                        <span className="text-red-600 dark:text-red-300">
                          *
                        </span>
                      </label>
                      <textarea
                        name="content"
                        required
                        className="textarea"
                        rows={4}
                        value={setCreateReview.values.content}
                        onChange={setCreateReview.handleChange}
                      />
                      {setCreateReview.touched.content &&
                      Boolean(setCreateReview.errors.content) ? (
                        <span className="text-sm text-red-600 dark:text-red-300">
                          {setCreateReview.touched.content &&
                            setCreateReview.errors.content}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <Button
                    buttonSize="lg"
                    type="submit"
                    isLoading={loadingReview}
                  >
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
        open={confirmModal}
        onOpenChange={() => setConfirmModal(!confirmModal)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-login">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <Check />
                  Confirmação
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4">
                {/** FORMULÁRIO DE CADASTRO */}

                <p>
                  Produto adicionado ao carrinho com sucesso, escolha uma opção
                  abaixo:
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  <Button
                    isFullSize
                    type="submit"
                    scheme="gray"
                    variant="outline"
                    onClick={() => setConfirmModal(false)}
                  >
                    <X />
                    Continuar comprando
                  </Button>
                  <Link href={"/carrinho"}>
                    <Button isFullSize type="submit">
                      <ShoppingCart />
                      Ir para o carrinho
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
};

export default Produto;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await clientQuery.query(FIND_PRODUCTS_PATH, {}).toPromise();
  const data: Products[] = response.data.products;
  const paths = data.map((prod) => {
    return { params: { product: prod.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.product;
  const { data } = await clientQuery
    .query(FIND_PRODUCT_INFORMATION, { id })
    .toPromise();

  return {
    props: {
      product: data.products[0] || {},
    },
    revalidate: 30,
  };
};
