import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CaretRight,
  Check,
  House,
  Pencil,
  ShoppingCart,
  Star,
} from "phosphor-react";
import { Fragment, useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import * as Checkbox from "@radix-ui/react-checkbox";
import Button from "../../components/layout/Buttom";
import { clientQuery } from "../../lib/urql";
import {
  FIND_PRODUCTS_PATH,
  FIND_PRODUCT_INFORMATION,
} from "../../graphql/products";
import { Products } from "../../utils/Types";
import CartContext from "../../context/cart/cart";
import { configs } from "../../configs";

interface Props {
  product: Products;
}

const Produto: NextPage<Props> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [design, setDesign] = useState<Checkbox.CheckedState>("indeterminate");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (design === true) {
      setPrice(price + configs.design);
    } else if (design === false) {
      setPrice(price - configs.design);
    }
  }, [design]);

  useEffect(() => {
    setPrice(quantity * product.price);
    if (quantity < 1 || isNaN(quantity)) {
      setPrice(product.price);
    }
  }, [quantity]);

  const calcPrice = (price: number) => {
    let transform = price / 100;
    return transform.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  function addToCart() {
    setCart([
      ...cart,
      {
        id: product.id,
        design: design === "indeterminate" ? false : true,
        name,
        quantity,
        total: price,
        thumbnail: product.images[0].url,
      },
    ]);
  }

  return (
    <Fragment>
      <HeadApp
        title={`${product.name} | NK Gráfica Online Impressões digitais e Offset`}
      />
      <Header />
      <div className="container mx-auto px-5 xl:px-0 max-w-6xl mt-10">
        <div className="bg-white dark:bg-zinc-900 flex py-2 px-4 items-center gap-3 rounded-md text-sm md:text-base">
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
          <div className="w-full overflow-hidden rounded-md h-fit max-w-sm">
            <Image
              src={product.images[0].url}
              alt={`NK Gráfica online ${product.name}`}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className="lg:col-span-2">
            <strong className="text-sky-700 text-3xl block dark:text-sky-300">
              {product.name}
            </strong>
            <span className="text-zinc-600 dark:text-zinc-300">
              {product.slug}
            </span>

            <div className="mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3 flex flex-col">
                  <label>
                    Descrição{" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <input
                    className="border dark:border-zinc-700 dark:bg-zinc-900 h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
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
                    className="border h-12 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
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
                      className="border bg-white dark:border-zinc-700 dark:bg-zinc-900 h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                    >
                      {product.widths.map((wd) => (
                        <option key={wd}>{wd}</option>
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
                      className="border h-12 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div className="bg-sky-100 flex items-center gap-3 h-12 rounded-md mt-5 text-sky-700 px-3 dark:bg-sky-900 dark:text-sky-300 py-1">
                <div className="w-[40px]">
                  <Checkbox.Root
                    className="CheckBox"
                    checked={design}
                    onCheckedChange={setDesign}
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </div>
                <span>
                  Não tenho a arte, quero contratar uma -{" "}
                  <strong>(adicional de {calcPrice(configs.design)})</strong>
                </span>
              </div>

              <div className="flex flex-col my-5">
                <strong className="text-2xl font-bold">
                  {calcPrice(price)}
                </strong>
                {design === true && (
                  <span className="text-sm text-sky-700 dark:text-sky-300 block">
                    Contém adicional de arte {calcPrice(configs.design)}
                  </span>
                )}
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

        <div className="border-b my-10 dark:border-b-zinc-700" />

        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-10">
          <span>DETALHES DO PRODUTO</span>
        </div>

        <p className="mt-3 text-justify">
          Eleições 2022 é com a GSE Gráfica Online! Somente aqui você encontra
          os melhores materiais gráficos para utilizar durante toda a campanha
          eleitoral, como Adesivo Parachoque, Adesivo Perfurado, Adesivo para
          Portão, Banner Político, Cartaz, Cartão de Visita, Colinha Política,
          Panfletos, Pragão Político, Praguinha Política e Santão. Além dos
          famosos Santinho Político e os Adesivos Perfurados Formatos Especiais,
          ideais para os eleitores utilizarem no dia da votação, uma vez que é
          possível utilizar a foto, número e coligação do candidato. Conte com
          materiais de alta qualidade e que fazem parte das especificações
          necessárias, garantindo o sucesso na campanha. Aproveite agora mesmo
          as vantagens e diversas opções para aumentar os lucros das revendas
          nas Eleições 2022!
        </p>

        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-10 mt-10">
          <span>COMENTÁRIOS</span>
        </div>

        <div className="grid grid-cols-1 gap-3 divide-y mb-5 dark:divide-zinc-700">
          <div className="grid grid-cols-1 sm:grid-cols-[150px_120px_1fr] gap-5 items-start pt-3">
            <div>
              <strong className="block">Daniel</strong>
              <span>Jan 12, 2022</span>
            </div>
            <div className="flex item-center gap-2">
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star />
              <Star />
            </div>
            <div>
              <strong className="block">Daniel</strong>
              <span>
                A expressão Lorem ipsum em design gráfico e editoração é um
                texto padrão em latim utilizado na produção gráfica para
                preencher os espaços de texto em publicações para testar e
                ajustar aspectos visuais antes de utilizar conteúdo real
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[150px_120px_1fr] gap-5 items-start pt-3">
            <div>
              <strong className="block">Daniel</strong>
              <span>Jan 12, 2022</span>
            </div>
            <div className="flex item-center gap-2">
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star />
              <Star />
            </div>
            <div>
              <strong className="block">Daniel</strong>
              <span>
                A expressão Lorem ipsum em design gráfico e editoração é um
                texto padrão em latim utilizado na produção gráfica para
                preencher os espaços de texto em publicações para testar e
                ajustar aspectos visuais antes de utilizar conteúdo real
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[150px_120px_1fr] gap-5 items-start pt-3">
            <div>
              <strong className="block">Daniel</strong>
              <span>Jan 12, 2022</span>
            </div>
            <div className="flex item-center gap-2">
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star className="text-yellow-500" />
              <Star />
              <Star />
            </div>
            <div>
              <strong className="block">Daniel</strong>
              <span>
                A expressão Lorem ipsum em design gráfico e editoração é um
                texto padrão em latim utilizado na produção gráfica para
                preencher os espaços de texto em publicações para testar e
                ajustar aspectos visuais antes de utilizar conteúdo real
              </span>
            </div>
          </div>
        </div>

        <Button>
          <Pencil /> Adicionar comentário
        </Button>
      </div>

      <Footer space={true} />
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
  console.log(data);

  return {
    props: {
      product: data.product || {},
    },
    revalidate: 60,
  };
};
