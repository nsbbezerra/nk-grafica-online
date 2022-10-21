import Head from "next/head";
import { Fragment } from "react";

type Props = {
  title: string;
};

export default function HeadApp({ title }: Props) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/img/icone.svg" type="image/svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="NK Gráfica Online | Impressões digitais e offset"
        />
        <meta
          name="keywords"
          content="cartão de visita, panfleto, panfletos, banner, banners, blocos, folders, adesivo, offset, gráfica rápida, gráfica digital, gráfica online, materiais gráficos, impressão, apostilas, revistas"
        />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NK Gráfica Online, cartões de visita, panfletos, blocos, banners, faixas, adesivos, plotter, fachadas, bandeiras."
        />
        <meta property="og:url" content="https://nkinfo.com.br/" />
        <meta
          property="og:site_name"
          content="NK Gráfica Online, cartões de visita, panfletos, blocos, banners, faixas, adesivos, plotter, fachadas, bandeiras."
        />
        <meta
          name="og:description"
          content="NK Gráfica Online | Impressões digitais e offset"
        />
        <meta name="robots" content="index,nofollow" />
        <meta
          property="og:author"
          content="NK Informática de Pedro Afonso - TO, Desenvolvedor Responsável: Natanael Bezerra"
        />
        <meta name="googletboot" content="index,nofollow" />
        <meta httpEquiv="content-language" content="pt-br" />
        <meta content="Global" name="distribution" />
        <meta
          name="google-site-verification"
          content="OMkPe5kLX6vC7xAwcUOIrbygHiBHHE7flQj3CobxRVo"
        />
      </Head>
    </Fragment>
  );
}
