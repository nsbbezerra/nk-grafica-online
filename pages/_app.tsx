import type { AppProps } from "next/app";
import "../styles/global.css";
import "swiper/css";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";
import CategoriesGlobalContext from "../context/categories";
import GlobalCartContext from "../context/cart";
import ClientGlobalContext from "../context/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <CategoriesGlobalContext>
        <GlobalCartContext>
          <ClientGlobalContext>
            <ThemeProvider enableSystem={true} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </ClientGlobalContext>
        </GlobalCartContext>
      </CategoriesGlobalContext>
    </Provider>
  );
}

export default MyApp;
