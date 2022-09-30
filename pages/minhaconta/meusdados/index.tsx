import { NextPage } from "next";
import Link from "next/link";
import {
  ArrowClockwise,
  IdentificationCard,
  ShoppingBagOpen,
  User,
} from "phosphor-react";
import { Fragment } from "react";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";

const MeusDados: NextPage = () => {
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
              <a className="flex h-12 items-center gap-3 px-4 border-l-4 border-l-sky-700 cursor-pointer select-none text-sky-700 dark:text-sky-300 dark:border-l-sky-300">
                <IdentificationCard className="w-[48px] text-lg" />
                <span className="hidden md:block">Meus dados</span>
              </a>
            </Link>
            <Link href={"/minhaconta/minhascompras"} passHref>
              <a className="flex h-12 items-center gap-3 px-4 border-l-4 border-l-transparent hover:border-l-sky-800 cursor-pointer select-none dark:hover:border-l-sky-400">
                <ShoppingBagOpen className="w-[48px] text-lg" />
                <span className="hidden md:block">Minhas compras</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full py-10">
          <div className="container mx-auto px-5 xl:px-10 max-w-3xl">
            <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3 mb-10">
              <span>Meus dados</span>
            </div>

            <div className="overflow-hidden bg-white dark:bg-zinc-900 border rounded-md dark:border-zinc-700">
              <div>
                <dl>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">Nome completo</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      Natanael dos Santos Bezerra
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">CPF / CNPJ</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      017.067.731-10
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">Telefone</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      (63) 99971-1716
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">Email</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      contato.nk.info@gmail.com
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">Endereço</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      <div className="flex flex-col gap-1">
                        <span>Rua 34, 173, Loteamento Canavieiras</span>
                        <span>CEP: 77.710-000</span>
                        <span>Pedro Afonso - TO</span>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                    <dt className="text-sm font-bold">
                      <Button buttonSize="lg">
                        <ArrowClockwise /> Atualizar
                      </Button>
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer space={false} />
    </Fragment>
  );
};

export default MeusDados;
