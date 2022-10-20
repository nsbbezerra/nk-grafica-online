import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { CaretRight, House, PaintBrush, Tag } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import CardProducts from "../components/layout/CardProducts";
import { FIND_ALL_ITEMS } from "../graphql/products";
import { clientQuery } from "../lib/urql";
import { Products } from "../utils/Types";
import * as Popover from "@radix-ui/react-popover";

interface CategoriesProps {
  id: string;
  name: string;
  products: Products[];
}

interface Props {
  categories: CategoriesProps[];
}

const Items: NextPage<Props> = ({ categories }) => {
  const [category, setCategory] = useState<CategoriesProps | undefined>(
    undefined
  );
  const [categoryId, setCategoryId] = useState<string>("all");

  useEffect(() => {
    if (categoryId === "all") {
      setCategory(categories[0]);
    } else {
      const result = categories.find((obj) => obj.id === categoryId);
      setCategory(result);
    }
  }, [categoryId]);

  const CategoriesItem = () => (
    <div className="grid grid-cols-1 divide-y dark:divide-zinc-700">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`flex items-center px-4 py-2 border-l-transparent gap-3 cursor-pointer hover:border-l-sky-600 hover:text-sky-600 dark:hover:border-l-sky-200 dark:hover:text-sky-200 ${
            cat.id === category?.id &&
            "text-sky-700 dark:text-sky-300 border-l-sky-700 dark:border-l-sky-300 font-semibold"
          }`}
          onClick={() => setCategoryId(cat.id)}
        >
          <PaintBrush />
          {cat.name}
        </button>
      ))}
    </div>
  );

  return (
    <Fragment>
      <HeadApp title="Nossos Produtos | NK Gráfica Online | Impressões digitais e Offset" />
      <Header />

      <section className="container mx-auto px-5 xl:px-0 mt-10 max-w-6xl">
        <div className="bg-white dark:bg-zinc-800 flex py-2 px-4 items-center gap-3 rounded-md text-sm md:text-base shadow">
          <Link href={"/"} passHref>
            <a className="hover:underline cursor-pointer">
              <House />
            </a>
          </Link>
          <CaretRight />
          <Link href={`/itens`} passHref>
            <a className="hover:underline cursor-pointer">Todos os produtos</a>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[270px_1fr] gap-5">
          <div className="w-fit relative md:hidden">
            <Popover.Root>
              <Popover.Trigger className="h-12 flex text-white bg-sky-700 rounded-md w-fit items-center gap-2 font-bold px-5 hover:bg-sky-800 hover:text-white dark:text-zinc-900 dark:hover:bg-sky-400 dark:bg-sky-300 select-none">
                <Tag />
                Categorias
              </Popover.Trigger>
              <Popover.Anchor />
              <Popover.Portal>
                <Popover.Content className="Content">
                  <div className="grid grid-cols-1 gap-3 divide-y dark:divide-zinc-700 -mb-2">
                    <CategoriesItem />
                  </div>
                  <Popover.Arrow className="Arrow" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <div className="hidden md:block rounded-md bg-white dark:bg-zinc-800 shadow overflow-hidden h-fit">
            <div className="flex items-center gap-3 bg-sky-50 px-4 py-2 text-sky-700 font-bold dark:bg-sky-200 dark:text-zinc-900 select-none text-lg">
              <Tag />
              Categorias
            </div>
            <CategoriesItem />
          </div>

          <div className="w-full">
            <CardProducts products={category?.products} />
          </div>
        </div>
      </section>

      <Footer space={true} />
    </Fragment>
  );
};

export default Items;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await clientQuery.query(FIND_ALL_ITEMS, {}).toPromise();

  return {
    props: {
      categories: data.categories || [],
      products: data.products || [],
    },
    revalidate: 60,
  };
};
