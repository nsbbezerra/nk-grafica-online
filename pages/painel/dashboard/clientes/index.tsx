import {
  ArrowFatLineLeft,
  ArrowFatLineRight,
  CircleNotch,
  MagnifyingGlassPlus,
  MapPin,
  Users,
  X,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import { FIND_CLIENTS_PAG } from "../../../../graphql/dashboard/clients";
import * as Dialog from "@radix-ui/react-dialog";

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface ClientsProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    cep: string;
    uf: string;
    city: string;
    district: string;
    number: string;
    street: string;
  };
}

export default function DashboardClients() {
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientsProps[]>([]);
  const [client, setClient] = useState<ClientsProps | null>(null);

  const [findClientsResult, findClients] = useQuery({
    query: FIND_CLIENTS_PAG,
    variables: { page },
  });

  const [modalAddress, setModalAddress] = useState<boolean>(false);

  const { fetching, data, error } = findClientsResult;

  useEffect(() => {
    if (error) {
      setToast({
        message: error.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    if (data) {
      console.log({ data });
      setPageInfo(data.clientsConnection.pageInfo);
      setClients(data.clients);
    }
  }, [data, error]);

  function handlePreviousPage() {
    setPage(page - configs.paginate);
    findClients();
  }

  function handleNextPage() {
    setPage(page + configs.paginate);
    findClients();
  }

  function handleClient(id: string) {
    const result = clients.find((obj) => obj.id === id);
    setClient(result || null);
    setModalAddress(true);
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
      <HeadApp title={`${configs.companyName} - Clientes`} />
      <DashboardHeader />

      <div className="px-5 xl:px-0 container mx-auto max-w-7xl py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <Users className="text-primary-500 dark:text-primary-300" />
          <span>Clientes</span>
        </div>
        {fetching ? (
          <div className="flex flex-col justify-center items-center gap-5 py-5">
            <CircleNotch className="text-6xl animate-spin" />
            <span>Buscando informações...</span>
          </div>
        ) : (
          <div className="w-full max-w-ful overflow-y-auto card">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[320px]">
                    NOME
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[280px]">
                    EMAIL
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[150px]">
                    TELEFONE
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[120px]">
                    ENDEREÇO
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((cli) => (
                  <tr key={cli.id}>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.name}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.email}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.phone}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <Button
                        buttonSize="xs"
                        variant="outline"
                        isFullSize
                        onClick={() => handleClient(cli.id)}
                      >
                        <MagnifyingGlassPlus /> Visualizar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full p-2 flex justify-center items-center bg gap-3 mt-2">
              <Button
                variant="outline"
                buttonSize="sm"
                isDisabled={!pageInfo?.hasNextPage}
                onClick={() => handlePreviousPage()}
              >
                <ArrowFatLineLeft />
                Anterior
              </Button>
              <Button
                variant="outline"
                buttonSize="sm"
                isDisabled={!pageInfo?.hasPreviousPage}
                onClick={() => handleNextPage()}
              >
                Próxima
                <ArrowFatLineRight />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog.Root
        open={modalAddress}
        onOpenChange={() => setModalAddress(false)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-login">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <MapPin />
                  Endereço
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

                {client && (
                  <div className="w-full text-left">
                    <p>
                      {client.address.street}, N: {client.address.number}
                    </p>
                    <p>{client.address.district}</p>
                    <p>CEP: {client.address.cep}</p>
                    <p>
                      {client.address.city} - {client.address.uf}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
