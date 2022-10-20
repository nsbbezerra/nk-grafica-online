import { NextPage } from "next";
import Link from "next/link";
import {
  ArrowClockwise,
  CircleNotch,
  IdentificationCard,
  ShoppingBagOpen,
  User,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "urql";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";
import ClientContext from "../../../context/client/client";
import { FIND_CLIENT_INFO } from "../../../graphql/client";
import { useRouter } from "next/router";

type AddressProps = {
  street: string;
  number: string;
  comp?: string;
  district: string;
  cep: string;
  city: string;
  uf: string;
};

interface ClientInfoProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  address: AddressProps;
}

const MeusDados: NextPage = () => {
  const { query } = useRouter();
  const { client: clientUrl } = query;
  const { client } = useContext(ClientContext);

  const [clientInfo, setClientInfo] = useState<ClientInfoProps | null>(null);

  const [findClientResults, findClient] = useQuery({
    query: FIND_CLIENT_INFO,
    variables: { client: clientUrl },
  });

  const { data, error, fetching } = findClientResults;

  useEffect(() => {
    if (data) {
      setClientInfo(data.client);
    }
  }, [data]);

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
            <Link href={`/minhaconta/meusdados?client=${client.id}`} passHref>
              <a className="flex h-12 items-center gap-3 px-4 border-l-4 border-l-sky-700 cursor-pointer select-none text-sky-700 dark:text-sky-300 dark:border-l-sky-300">
                <IdentificationCard className="w-[48px] text-lg" />
                <span className="hidden md:block">Meus dados</span>
              </a>
            </Link>
            <Link
              href={`/minhaconta/minhascompras?client=${client.id}`}
              passHref
            >
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

            <div className="overflow-hidden bg-white dark:bg-zinc-800 shadow rounded-md">
              {fetching ? (
                <div className="flex flex-col justify-center items-center gap-5 py-5">
                  <CircleNotch className="text-6xl animate-spin" />
                  <span>Buscando informações...</span>
                </div>
              ) : (
                <div>
                  <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Nome completo</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        {clientInfo?.name}
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">CPF / CNPJ</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        {clientInfo?.document}
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Telefone</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        {clientInfo?.phone}
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Email</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        {clientInfo?.email}
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Endereço</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        <div className="flex flex-col gap-1">
                          <span>
                            {clientInfo?.address.street}, Nº{" "}
                            {clientInfo?.address.number},{" "}
                            {clientInfo?.address.district}
                          </span>
                          <span>CEP: {clientInfo?.address.cep}</span>
                          <span>
                            {clientInfo?.address.city} -{" "}
                            {clientInfo?.address.uf}
                          </span>
                        </div>
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-bold">
                        <Button buttonSize="lg">
                          <ArrowClockwise /> Atualizar
                        </Button>
                      </dt>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer space={false} />
    </Fragment>
  );
};

export default MeusDados;
