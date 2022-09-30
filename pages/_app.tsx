import type { AppProps } from "next/app";
import "../styles/global.css";
import "swiper/css";
import { ThemeProvider } from "next-themes";
import { Provider } from "urql";
import { clientQuery } from "../lib/urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={clientQuery}>
      <ThemeProvider enableSystem={false} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
