import type { AppProps } from "next/app";
import "../styles/global.css";
import "swiper/css";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";
import CategoriesGlobalContext from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <CategoriesGlobalContext>
        <ThemeProvider enableSystem={false} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </CategoriesGlobalContext>
    </Provider>
  );
}

export default MyApp;
