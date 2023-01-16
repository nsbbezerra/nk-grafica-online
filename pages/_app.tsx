import type { AppProps } from "next/app";
import "../styles/global.css";
import "swiper/css";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";
import CategoriesGlobalContext from "../context/categories";
import GlobalCartContext from "../context/cart";
import ClientGlobalContext from "../context/client";
import GlobalModalsContext from "../context/modals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <CategoriesGlobalContext>
        <GlobalModalsContext>
          <GlobalCartContext>
            <ClientGlobalContext>
              <ThemeProvider enableSystem={true} attribute="class">
                <Component {...pageProps} />
              </ThemeProvider>
            </ClientGlobalContext>
          </GlobalCartContext>
        </GlobalModalsContext>
      </CategoriesGlobalContext>
    </Provider>
  );
}

export default MyApp;
