import { Fragment } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CaretRight, House } from "phosphor-react";
import Link from "next/link";
import Card from "../../components/layout/Card";
import { clientQuery } from "../../lib/urql";
import {
  FIND_CATEGORIES_PATH,
  FIND_PRODUCTS_BY_CATEGORY,
} from "../../graphql/products";
import { Products } from "../../utils/Types";

type CategoryPaths = {
  id: string;
  name?: string;
};

interface Props {
  category: CategoryPaths;
  products: Products[];
}

const Products: NextPage<Props> = ({ category, products }) => {
  return (
    <Fragment>
      <HeadApp
        title={`${category.name} | NK Gráfica Online Impressões digitais e Offset`}
      />
      <Header />

      <div className="container mx-auto px-5 xl:px-0 max-w-6xl mt-10">
        <div className="bg-white dark:bg-zinc-800 flex py-2 px-4 items-center gap-3 rounded-md text-sm md:text-base">
          <Link href={"/"} passHref>
            <a className="hover:underline cursor-pointer">
              <House />
            </a>
          </Link>
          <CaretRight />
          <Link href={`/produtos/${category.id}`} passHref>
            <a className="hover:underline cursor-pointer">{category.name}</a>
          </Link>
        </div>

        <div className="mt-10">
          <Card products={products} />
        </div>
      </div>

      <Footer space={true} />
    </Fragment>
  );
};

export default Products;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await clientQuery
    .query(FIND_CATEGORIES_PATH, {})
    .toPromise();
  const data: CategoryPaths[] = response.data.categories;
  const paths = data.map((path) => {
    return { params: { category: path.id } };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.category;
  const { data } = await clientQuery
    .query(FIND_PRODUCTS_BY_CATEGORY, { id })
    .toPromise();

  const category = {
    id: data.category.id || "",
    name: data.category.name || "",
  };
  const products = data.category.products || [];

  return {
    props: {
      category,
      products,
    },
    revalidate: 30,
  };
};
