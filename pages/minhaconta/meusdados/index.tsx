import { NextPage } from "next";
import Link from "next/link";
import {
  ArrowClockwise,
  CircleNotch,
  IdentificationCard,
  ShoppingCart,
  User,
} from "phosphor-react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import Footer from "../../../components/Footer";
import HeadApp from "../../../components/Head";
import Header from "../../../components/Header";
import Button from "../../../components/layout/Buttom";
import ClientContext from "../../../context/client/client";
import {
  FIND_CLIENT_INFO,
  PUBLISH_CLIENT,
  UPDATE_CLIENT,
} from "../../../graphql/client";
import { useRouter } from "next/router";
import ReactInputMask from "react-input-mask";
import Toast from "../../../components/layout/Toast";

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

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const MeusDados: NextPage = () => {
  const { query } = useRouter();
  const { client: clientUrl } = query;
  const { client } = useContext(ClientContext);

  const [clientInfo, setClientInfo] = useState<ClientInfoProps | null>(null);

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [name, setName] = useState<string>(client.name || "");
  const [phone, setPhone] = useState<string>(client.phone || "");
  const [email, setEmail] = useState<string>(client.email || "");
  const [street, setStreet] = useState<string>(client.address.street || "");
  const [number, setNumber] = useState<string>(client.address.number || "");
  const [district, setDistrict] = useState<string>(
    client.address.district || ""
  );
  const [cep, setCep] = useState<string>(client.address.cep || "");
  const [city, setCity] = useState<string>(client.address.city || "");
  const [uf, setUf] = useState<string>(client.address.uf || "");

  const [findClientResults, findClient] = useQuery({
    query: FIND_CLIENT_INFO,
    variables: { client: clientUrl },
  });

  const { data, error, fetching } = findClientResults;

  const [updateClientResults, updateClient] = useMutation(UPDATE_CLIENT);
  const [publishClientResults, publishClient] = useMutation(PUBLISH_CLIENT);

  const {
    data: updateClientData,
    error: updateClientError,
    fetching: updateClientFetching,
  } = updateClientResults;

  const { error: publishClientError } = publishClientResults;

  async function setPublishClient(id: string) {
    await publishClient({ id });
  }

  useEffect(() => {
    if (updateClientData) {
      setPublishClient(updateClientData.updateClient.id);
      const updatedClient = {
        id: updateClientData.updateClient.id,
        email: updateClientData.updateClient.email,
        phone: updateClientData.updateClient.phone,
        name: updateClientData.updateClient.name,
        address: updateClientData.updateClient.address,
      };
      localStorage.setItem("client", JSON.stringify(updatedClient));
      setToast({
        type: "success",
        message: "Atualização bem sucedida!",
        title: "Sucesso",
      });
      setOpenToast(true);
    }
    if (updateClientError) {
      setToast({
        type: "error",
        message: updateClientError.message,
        title: "Erro",
      });
      setOpenToast(true);
    }
    if (publishClientError) {
      setToast({
        type: "error",
        message: publishClientError.message,
        title: "Erro",
      });
      setOpenToast(true);
    }
  }, [updateClientData, updateClientError, publishClientError]);

  async function setUpdateClient() {
    const variables = {
      id: clientUrl,
      name,
      phone,
      email,
      address: { street, number, district, cep, city, uf },
    };
    await updateClient(variables);
  }

  useEffect(() => {
    if (data) {
      setClientInfo(data.client);
      setName(data.client.name);
      setEmail(data.client.email);
      setPhone(data.client.phone);
      setStreet(data.client.address.street);
      setNumber(data.client.address.number);
      setDistrict(data.client.address.district);
      setCep(data.client.address.cep);
      setCity(data.client.address.city);
      setUf(data.client.address.uf);
    }
  }, [data]);

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
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
              <a className="flex h-12 items-center gap-3 px-3 md:px-4 border-l-4 border-l-sky-700 cursor-pointer select-none text-sky-700 dark:text-sky-300 dark:border-l-sky-300">
                <IdentificationCard className="flex-shrink-0 text-lg" />
                <span className="hidden md:block">Meus dados</span>
              </a>
            </Link>
            <Link
              href={`/minhaconta/minhascompras?client=${client.id}`}
              passHref
            >
              <a className="flex h-12 items-center gap-3 px-3 md:px-4 border-l-4 border-l-transparent hover:border-l-sky-800 cursor-pointer select-none dark:hover:border-l-sky-400">
                <ShoppingCart className="flex-shrink-0 text-lg" />
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
                        <input
                          type={"text"}
                          name="street"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        />
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
                        <ReactInputMask
                          mask={"(99) 99999-9999"}
                          required
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Email</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        <input
                          type={"text"}
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-b-zinc-700">
                      <dt className="text-sm font-bold">Endereço</dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        <div className="flex flex-col gap-2">
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px] gap-2">
                            <div>
                              <label className="block">Rua</label>
                              <input
                                type={"text"}
                                name="street"
                                required
                                className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block">Número</label>
                              <input
                                type={"text"}
                                name="street"
                                required
                                className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block">Bairro</label>
                            <input
                              type={"text"}
                              name="street"
                              required
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr_80px] gap-2">
                            <div>
                              <label className="block">CEP</label>
                              <ReactInputMask
                                mask={"99.999-999"}
                                required
                                className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                                name="cep"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="block">Cidade</label>
                              <input
                                type={"text"}
                                name="street"
                                required
                                className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="block">UF</label>
                              <select
                                className="border bg-white dark:border-zinc-700 dark:bg-zinc-900 h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
                                name="uf"
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
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
                            </div>
                          </div>
                        </div>
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-bold">
                        <Button
                          isLoading={updateClientFetching}
                          onClick={() => setUpdateClient()}
                        >
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
