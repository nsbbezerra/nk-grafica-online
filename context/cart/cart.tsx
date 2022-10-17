import { createContext, useState } from "react";

interface Cart {
  id: string;
  thumbnail: string;
  name: string;
  productName: string;
  quantity: number;
  total: number;
  width?: number;
  height?: number;
  design: boolean | string;
  mode: "square_meter" | "unique";
  unity: number;
}

type PropsCartContext = {
  cart: Cart[];
  setCart: (data: Cart[]) => void;
};

const DEFAULT_VALUE: PropsCartContext = {
  cart: [],
  setCart: (data) => {},
};

const CartContext = createContext<PropsCartContext>(DEFAULT_VALUE);

const CartContextProvider = ({ children }: any) => {
  const [cart, setCart] = useState(DEFAULT_VALUE.cart);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider };

export default CartContext;
