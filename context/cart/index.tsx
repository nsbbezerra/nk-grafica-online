import { CartContextProvider } from "./cart";

const GlobalCartContext = ({ children }: any) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default GlobalCartContext;
