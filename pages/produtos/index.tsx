import { Fragment } from "react";
import type { NextPage } from "next";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CaretRight, House } from "phosphor-react";
import Link from "next/link";
import Card from "../../components/layout/Card";

const Products: NextPage = () => {
  return (
    <Fragment>
      <HeadApp title="Cartões de visita | NK Gráfica online" />
      <Header />

      <div className="container mx-auto px-5 xl:px-0 max-w-6xl mt-10">
        <div className="bg-zinc-50 dark:bg-zinc-900 flex py-2 px-4 items-center gap-3 rounded-md">
          <Link href={"/"} passHref>
            <a className="hover:underline cursor-pointer">
              <House />
            </a>
          </Link>
          <CaretRight />
          <Link href={"/produtos"} passHref>
            <a className="hover:underline cursor-pointer">Cartões de visita</a>
          </Link>
        </div>

        <div className="mt-10">
          <Card />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Products;
