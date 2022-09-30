import type { NextPage } from "next";
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
import { Fragment } from "react";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import * as Checkbox from "@radix-ui/react-checkbox";
import Button from "../../components/layout/Buttom";

const Produto: NextPage = () => {
  return (
    <Fragment>
      <HeadApp title="Cartão de visita | NK Gráfica Online" />
      <Header />
      <div className="container mx-auto px-5 xl:px-0 max-w-6xl mt-10">
        <div className="bg-white dark:bg-zinc-900 flex py-2 px-4 items-center gap-3 rounded-md text-sm md:text-base">
          <Link href={"/"} passHref>
            <a className="hover:underline cursor-pointer">
              <House />
            </a>
          </Link>
          <CaretRight />
          <Link href={"/produtos"} passHref>
            <a className="hover:underline cursor-pointer">Cartões de visita</a>
          </Link>
          <CaretRight />
          <Link href={"/produto"} passHref>
            <a className="hover:underline cursor-pointer">
              Cartões de visita personalizados
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 justify-items-center">
          <div className="w-full overflow-hidden rounded-md h-fit max-w-sm">
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

          <div className="lg:col-span-2">
            <strong className="text-sky-700 text-3xl block dark:text-sky-300">
              Cartão de visita personalizado
            </strong>
            <span className="text-zinc-600 dark:text-zinc-300">
              A expressão Lorem ipsum em design gráfico e editoração.
            </span>

            <div className="mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3 flex flex-col">
                  <label>
                    Descrição{" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <input className="border dark:border-zinc-700 dark:bg-zinc-900 h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300" />
                </div>
                <div className="flex flex-col">
                  <label>
                    Quantidade{" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <input
                    type={"number"}
                    className="border h-12 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300"
                    defaultValue={1}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="flex flex-col">
                  <label>
                    Largura (Metros){" "}
                    <span className="text-red-600 dark:text-red-300">*</span>
                  </label>
                  <select className="border bg-white dark:border-zinc-700 dark:bg-zinc-900 h-12 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300">
                    <option>0.62</option>
                    <option>0.72</option>
                    <option>0.82</option>
                    <option>0.92</option>
                    <option>1.42</option>
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
                    defaultValue={1}
                  />
                </div>
              </div>

              <div className="bg-sky-100 flex items-center gap-3 h-12 rounded-md mt-5 text-sky-700 px-3 dark:bg-sky-900 dark:text-sky-300 py-1">
                <div className="w-[40px]">
                  <Checkbox.Root className="CheckBox">
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </div>
                <span>
                  Não tenho a arte, quero contratar uma -{" "}
                  <strong>(Adicional de R$ 40,00)</strong>
                </span>
              </div>

              <div className="grid sm:grid-cols-[250px_1fr] gap-5 sm:gap-10 mt-5 items-center">
                <div className="order-2 sm:order-1">
                  <Button buttonSize="lg">
                    <ShoppingCart />
                    Adicionar ao carrinho
                  </Button>
                </div>

                <div className="order-1 sm:order-2 flex flex-col">
                  <strong className="text-2xl font-bold">R$ 40,00</strong>
                  <span className="text-sm text-red-600 dark:text-red-300">
                    Valor mínimo R$ 40,00
                  </span>
                </div>
              </div>
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
