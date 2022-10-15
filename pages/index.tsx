import type { GetStaticProps, NextPage } from "next";
import { Fragment, useContext, useEffect } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Panel from "../components/Panel";
import "swiper/css/navigation";
import { Medal, Trophy } from "phosphor-react";
import Card from "../components/layout/Card";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
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
      <Panel />

      <section className="container mx-auto mt-14 lg:pt-5 px-5 xl:px-0 max-w-6xl">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <Trophy className="text-sky-700 dark:text-sky-300" />
          <span>Os mais vendidos</span>
        </div>

        <Card products={products} />
      </section>

      <section className="container mx-auto pt-16 px-5 xl:px-0 max-w-6xl">
        <div className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl w-fit font-extrabold border-b-2 border-b-sky-700 dark:border-b-sky-300 pr-3">
          <Medal className="text-sky-700 dark:text-sky-300" />
          <span>Destaques</span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card">
            <div className="w-full">
              <Image
                src={"/img/banner.jpg"}
                alt="NK Gráfica online banner"
                layout="responsive"
                width={1920}
                height={600}
                objectFit="cover"
              />
            </div>
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
          <div className="card">
            <div className="w-full">
              <Image
                src={"/img/banners-pic.jpg"}
                alt="NK Gráfica online banner"
                layout="responsive"
                width={1920}
                height={600}
                objectFit="cover"
              />
            </div>
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
          <div className="card">
            <div className="w-full">
              <Image
                src={"/img/banner.jpg"}
                alt="NK Gráfica online banner"
                layout="responsive"
                width={1920}
                height={600}
                objectFit="cover"
              />
            </div>
            <a className="p-2 flex flex-col hover:underline cursor-pointer">
              <strong>Campanha política</strong>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </span>
            </a>
          </div>
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
      categories: data.categories || [],
    },
    revalidate: 30,
  };
};
