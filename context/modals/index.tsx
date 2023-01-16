import { ModalsContextProvider } from "./modals";

const GlobalModalsContext = ({ children }: any) => {
  return <ModalsContextProvider>{children}</ModalsContextProvider>;
};

export default GlobalModalsContext;
