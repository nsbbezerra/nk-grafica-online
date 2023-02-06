import { createContext, Dispatch, SetStateAction, useState } from "react";

interface Client {
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

type PropsClientContext = {
  client: Client;
  setClient: Dispatch<SetStateAction<Client>>;
};

const DEFAULT_VALUE: PropsClientContext = {
  client: {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      cep: "",
      city: "",
      district: "",
      number: "",
      street: "",
      uf: "",
    },
  },
  setClient: () => {},
};

const ClientContext = createContext<PropsClientContext>(DEFAULT_VALUE);

const ClientContextProvider = ({ children }: any) => {
  const [client, setClient] = useState(DEFAULT_VALUE.client);

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContextProvider };

export default ClientContext;
