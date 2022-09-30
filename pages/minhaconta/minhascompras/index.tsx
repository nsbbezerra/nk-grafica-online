import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Hourglass,
  IdentificationCard,
  MagnifyingGlassPlus,
  Receipt,
  ShoppingBagOpen,
  User,
} from "phosphor-react";
import { Fragment } from "react";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";

const MinhasCompras: NextPage = () => {
  return (
    <Fragment>
      <HeadApp title="NK Gráfica Online | Impressões digitais e offset" />
      <Header />

      <div className="w-full grid grid-cols-[48px_1fr] md:grid-cols-[250px_1fr] overflow-hidden">
        <div className="w-full bg-white dark:bg-zinc-900 h-full shadow-lg">
          <div className="flex items-center gap-3 text-xl py-5 px-4 font-bold my-5 text-sky-700 dark:text-sky-300">
            <User className="w-[48px]" />
            <span className="hidden md:block">Minha conta</span>
          </div>

          <div className="flex flex-col">
            <Link href={"/minhaconta/meusdados"} passHref>
              <a className="flex h-12 items-center gap-3 px-4 border-l-4 border-l-transparent hover:border-l-sky-800 cursor-pointer select-none dark:hover:border-l-sky-400">
                <IdentificationCard className="w-[48px] text-lg" />
                <span className="hidden md:block">Meus dados</span>
              </a>
            </Link>
            <Link href={"/minhaconta/minhascompras"} passHref>
              <a className="flex h-12 items-center gap-3 px-4 border-l-4 border-l-sky-700 cursor-pointer select-none text-sky-700 dark:text-sky-300 dark:border-l-sky-300">
                <ShoppingBagOpen className="w-[48px] text-lg" />
                <span className="hidden md:block">Minhas compras</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full py-10">
          <div className="container mx-auto px-5 xl:px-10 max-w-5xl">
            <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-10">
              <span>Minhas compras</span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/** CARD DE COMPRAS */}
              <div className="rounded-md border dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <div className="border-b dark:border-b-zinc-700 py-3 px-3 gap-2 flex sm:items-center justify-between flex-col sm:flex-row">
                  <span>28 de Setembro de 2022</span>
                  <span className="text-sm py-1 px-2 bg-yellow-500 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-yellow-300 flex items-center gap-2">
                    <Hourglass />
                    Aguardando pagamento
                  </span>
                </div>
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_170px] relative">
                    <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 sm:border-r dark:border-r-zinc-700">
                      {/** ITENS */}

                      <div className="flex gap-5 p-3">
                        <div className="w-[80px] h-fit rounded-md overflow-hidden">
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
                          <strong className="text-sm mb-1 block">
                            Detalhes do produto:
                          </strong>

                          <a className="block hover:underline cursor-pointer text-sm">
                            Cartão de visita 1000 unidades
                          </a>
                          <span className="text-sm block">
                            Dimensões: 1.20mt x 1.30mt
                          </span>
                          <span className="text-sm block">Quatidade: 1</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-3">
                      <Button isFullSize buttonSize="sm">
                        <MagnifyingGlassPlus /> Ver detalhes
                      </Button>
                      <Button isFullSize buttonSize="sm" variant="outline">
                        <Receipt /> Comprovante
                      </Button>
                    </div>
                  </div>

                  <div className="border-t dark:border-t-zinc-700">
                    <dl>
                      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold">Envio</dt>
                        <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                          A expressão Lorem ipsum em design gráfico e editoração
                          é um texto padrão em latim utilizado na produção
                          gráfica para preencher os espaços de texto em
                          publicações para testar e ajustar aspectos visuais
                          antes de utilizar conteúdo real.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/** CARD DE COMPRAS */}
              <div className="rounded-md border dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <div className="border-b dark:border-b-zinc-700 py-3 px-3 gap-2 flex sm:items-center justify-between flex-col sm:flex-row">
                  <span>28 de Setembro de 2022</span>
                  <span className="text-sm py-1 px-2 bg-yellow-500 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-yellow-300 flex items-center gap-2">
                    <Hourglass />
                    Aguardando pagamento
                  </span>
                </div>
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_170px] relative">
                    <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 sm:border-r dark:border-r-zinc-700">
                      {/** ITENS */}

                      <div className="flex gap-5 p-3">
                        <div className="w-[80px] h-fit rounded-md overflow-hidden">
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
                          <strong className="text-sm mb-1 block">
                            Detalhes do produto:
                          </strong>

                          <a className="block hover:underline cursor-pointer text-sm">
                            Cartão de visita 1000 unidades
                          </a>
                          <span className="text-sm block">
                            Dimensões: 1.20mt x 1.30mt
                          </span>
                          <span className="text-sm block">Quatidade: 1</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-3">
                      <Button isFullSize buttonSize="sm">
                        <MagnifyingGlassPlus /> Ver detalhes
                      </Button>
                      <Button isFullSize buttonSize="sm" variant="outline">
                        <Receipt /> Comprovante
                      </Button>
                    </div>
                  </div>

                  <div className="border-t dark:border-t-zinc-700">
                    <dl>
                      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold">Envio</dt>
                        <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                          A expressão Lorem ipsum em design gráfico e editoração
                          é um texto padrão em latim utilizado na produção
                          gráfica para preencher os espaços de texto em
                          publicações para testar e ajustar aspectos visuais
                          antes de utilizar conteúdo real.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/** CARD DE COMPRAS */}
              <div className="rounded-md border dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <div className="border-b dark:border-b-zinc-700 py-3 px-3 gap-2 flex sm:items-center justify-between flex-col sm:flex-row">
                  <span>28 de Setembro de 2022</span>
                  <span className="text-sm py-1 px-2 bg-yellow-500 rounded-md w-fit text-white dark:text-zinc-800 dark:bg-yellow-300 flex items-center gap-2">
                    <Hourglass />
                    Aguardando pagamento
                  </span>
                </div>
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_170px] relative">
                    <div className="grid grid-cols-1 divide-y dark:divide-zinc-700 sm:border-r dark:border-r-zinc-700">
                      {/** ITENS */}

                      <div className="flex gap-5 p-3">
                        <div className="w-[80px] h-fit rounded-md overflow-hidden">
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
                          <strong className="text-sm mb-1 block">
                            Detalhes do produto:
                          </strong>

                          <a className="block hover:underline cursor-pointer text-sm">
                            Cartão de visita 1000 unidades
                          </a>
                          <span className="text-sm block">
                            Dimensões: 1.20mt x 1.30mt
                          </span>
                          <span className="text-sm block">Quatidade: 1</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-3">
                      <Button isFullSize buttonSize="sm">
                        <MagnifyingGlassPlus /> Ver detalhes
                      </Button>
                      <Button isFullSize buttonSize="sm" variant="outline">
                        <Receipt /> Comprovante
                      </Button>
                    </div>
                  </div>

                  <div className="border-t dark:border-t-zinc-700">
                    <dl>
                      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold">Envio</dt>
                        <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                          A expressão Lorem ipsum em design gráfico e editoração
                          é um texto padrão em latim utilizado na produção
                          gráfica para preencher os espaços de texto em
                          publicações para testar e ajustar aspectos visuais
                          antes de utilizar conteúdo real.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer space={false} />
    </Fragment>
  );
};

export default MinhasCompras;
