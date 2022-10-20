import { ClientContextProvider } from "./client";

const GlobalClientContext = ({ children }: any) => {
  return <ClientContextProvider>{children}</ClientContextProvider>;
};

export default GlobalClientContext;
