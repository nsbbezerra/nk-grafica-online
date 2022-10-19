import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CaretRight,
  ChatCircle,
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
import { Products, ProductsInfoProps } from "../../utils/Types";
import CartContext from "../../context/cart/cart";
import Toast from "../../components/layout/Toast";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "urql";
import { CREATE_REVIEW, PUBLISH_REVIEW } from "../../graphql/reviews";
import * as Yup from "yup";
import { useFormik } from "formik";

interface Props {
  product: ProductsInfoProps;
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
  const [name, setName] = useState<string>("");
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);

  const [createReviewResults, createReview] = useMutation(CREATE_REVIEW);
  const { fetching: loadingReview } = createReviewResults;
  const [publishReviewResults, publishReview] = useMutation(PUBLISH_REVIEW);

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
    setName("");
    setPrice(product.price);
  }

  useEffect(() => {
    if (product.mode === "unique") {
      setPrice(quantity * product.price);
      if (quantity < 1 || isNaN(quantity)) {
        setPrice(product.price);
      }
    } else if (product.mode === "square_meter") {
      if (width === "0") {
        setPrice(product.price);
      } else {
        let square_meter = parseFloat(width) * height;
        setPrice(quantity * square_meter * product.price);
      }
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
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  function addToCart() {
    if (name === "") {
      setToast({
        title: "Atenção",
        message: "Você precisa inserir uma descrição ao item",
        type: "info",
      });
      setOpenToast(true);
      return false;
    }
    if (
      product.mode === "square_meter" &&
      parseInt(width) === 0 &&
      height === 0
    ) {
      setToast({
        title: "Atenção",
        message:
          "Você precisa especificar as dimensões do item, Largura e Comprimento",
        type: "info",
      });
      setOpenToast(true);
      return false;
    }
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
    setCart([
      ...cart,
      {
        id: product.id,
        name,
        productName: product.name,
        quantity,
        total: price,
        thumbnail: product.images[0].url,
        width: parseFloat(width),
        height: height,
        mode: product.mode,
        unity: product.price,
      },
    ]);
    setToast({
      title: "Sucesso",
      message: "Produto adicionado ao carrinho",
      type: "success",
    });
    setOpenToast(true);
    clear();
  }

  function formatDate(myDate: Date) {
    const initDate = new Date(myDate);
    const day = initDate.getDate();
    const month = initDate.getMonth() + 1;
    const year = initDate.getFullYear();

    return `${day}/${month}/${year}`;
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
              src={product.images[0].url}
              alt={`NK Gráfica online ${product.name}`}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className="lg:col-span-2 relative">
            <strong className="text-sky-700 text-3xl block dark:text-sky-300">
              {product.name}
            </strong>
            <span className="text-zinc-600 dark:text-zinc-300">
              {product.slug}
            </span>
            {product.shippingOptions === "fast" && (
              <div className="flex items-center gap-2 bg-sky-100 rounded-md py-1 px-2 text-sky-700 font-semibold w-fit z-[5] dark:bg-zinc-600 dark:text-white shadow mt-3">
                <Truck weight="fill" className="text-lg" />
                <span>Entrega rápida</span>
              </div>
            )}

            <div className="mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3 flex flex-col">
                  <label>
                    Descrição{" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <input
                    className="border dark:border-zinc-700 dark:bg-zinc-900 h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    Quantidade{" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <input
                    type={"number"}
                    className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>

              {product.mode === "square_meter" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="flex flex-col">
                    <label>
                      Largura (Metros){" "}
                      <span className="text-red-600 dark:text-red-300">*</span>
                    </label>
                    <select
                      className="border bg-white dark:border-zinc-700 dark:bg-zinc-900 h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    >
                      <option value={"0"}>Selecione uma opção</option>
                      {product.widths.map((wd) => (
                        <option key={wd} value={wd}>
                          {wd}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label>
                      Comprimento (Metros){" "}
                      <span className="text-red-600 dark:text-red-300">*</span>
                    </label>
                    <input
                      type={"number"}
                      className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col my-5">
                <strong className="text-2xl font-bold">
                  {calcPrice(price)}
                </strong>
                {!product.limit ? (
                  ""
                ) : (
                  <span className="text-sm text-red-600 dark:text-red-300">
                    Valor mínimo {calcPrice(product.limit || 0)}
                  </span>
                )}
              </div>

              <Button buttonSize="lg" onClick={() => addToCart()}>
                <ShoppingCart />
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md mt-10 p-5 bg-white shadow  dark:bg-zinc-800">
          <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-5">
            <span>DETALHES DO PRODUTO</span>
          </div>

          <div
            className="description-product"
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          />

          <div
            className="description-product"
            dangerouslySetInnerHTML={{ __html: product.information.html }}
          />
        </div>

        <div className="rounded-md mt-10 p-5 bg-white shadow dark:bg-zinc-800">
          <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-5">
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
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
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
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
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
                        className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
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
                        className="border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full resize-none"
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
    </Fragment>
  );
};

export default Produto;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await clientQuery.query(FIND_PRODUCTS_PATH, {}).toPromise();
  const data: Products[] = response.data.products;
  const paths = data.map((prod) => {
    return { params: { product: prod.id } };
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
      product: data.product || {},
    },
    revalidate: 60,
  };
};
