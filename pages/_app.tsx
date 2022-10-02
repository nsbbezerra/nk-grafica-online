import type { AppProps } from "next/app";
import "../styles/global.css";
import "swiper/css";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";
import CategoriesGlobalContext from "../context/categories";
import GlobalCartContext from "../context/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <CategoriesGlobalContext>
        <GlobalCartContext>
          <ThemeProvider enableSystem={true} attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </GlobalCartContext>
      </CategoriesGlobalContext>
    </Provider>
  );
}

export default MyApp;
