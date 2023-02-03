import { createContext, useEffect, useState } from "react";
import { ShippingProps } from "../../utils/Types";

interface Cart {
  id: string;
  thumbnail: string;
  name: string;
  productName: string;
  quantity: number;
  total: number;
  unity: number;
  shipping: ShippingProps;
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

  useEffect(() => {
    console.log({ cart });
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider };

export default CartContext;
