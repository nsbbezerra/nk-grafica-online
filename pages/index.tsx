import type { GetStaticProps, NextPage } from "next";
import { Fragment } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import "swiper/css/navigation";
import { CaretRight, Trophy } from "phosphor-react";
import Card from "../components/layout/Card";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../components/Footer";
import { clientQuery } from "../lib/urql";
import { FIND_INDEX_PAGE } from "../graphql/products";
import { IndexProps } from "../utils/Types";
import Link from "next/link";

const Home: NextPage<IndexProps> = ({ products }) => {
  return (
    <Fragment>
      <HeadApp title="NK Gráfica Online | Impressões digitais e Offset" />
      <Header />

      <section className="container mx-auto mt-10 lg:pt-5 px-5 xl:px-0 max-w-6xl">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <Trophy className="text-sky-700 dark:text-sky-300" />
          <span>Os mais vendidos</span>
        </div>

        <Card products={products} />

        <div className="flex justify-start mt-10">
          <Link href={"/itens"} passHref>
            <a className="buttom-md buttom-blue-outline">
              Veja mais produtos
              <CaretRight />
            </a>
          </Link>
        </div>
      </section>

      <Footer space={true} />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await clientQuery.query(FIND_INDEX_PAGE, {}).toPromise();

  return {
    props: {
      products: data.products || [],
    },
    revalidate: 30,
  };
};
