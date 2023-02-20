import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { CaretDown, CaretRight, House, Tag, TagSimple } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import CardProducts from "../../components/layout/CardProducts";
import { FIND_ALL_ITEMS } from "../../graphql/products";
import { clientQuery } from "../../lib/urql";
import { ProductProps, Products } from "../../utils/Types";
import * as Popover from "@radix-ui/react-popover";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clsx } from "clsx";
import { useRouter } from "next/router";

interface CollectionsProps {
  id: string;
  name: string;
  slug: string;
}

interface CategoriesProps {
  id: string;
  name: string;
  slug: string;
  collections: CollectionsProps[];
  products: Products[];
}

interface Props {
  categories: CategoriesProps[];
}

const Items: NextPage<Props> = ({ categories }) => {
  const [defaultOpen, setDefaultOpen] = useState<string>(categories[0].id);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    setProducts(categories[0].products);
  }, []);

  function handleClickCategories(id: string) {
    const result = categories.find((obj) => obj.id === id);
    setProducts(result?.products || []);
    setDefaultOpen(result?.id as string);
  }

  const CategoriesItem = () => (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={defaultOpen}
      className={clsx("w-full")}
      onValueChange={(e) => handleClickCategories(e)}
    >
      {categories.map((category) => (
        <AccordionPrimitive.Item
          key={category.id}
          value={category.id}
          className="focus:outline-none w-full border-b last:border-b-0 dark:border-b-zinc-700"
        >
          <AccordionPrimitive.Header className="w-full">
            <AccordionPrimitive.Trigger
              className={clsx(
                "focus:outline-none",
                "inline-flex w-full items-center justify-between px-4 py-2 text-left"
              )}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TagSimple className="flex-shrink-0" /> {category.name}
              </span>
              <CaretDown
                className={clsx(
                  "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                  "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3">
            <div className="text-sm text-secondary-500 dark:text-secondary-200 pl-5">
              {category.collections.map((coll) => (
                <Link
                  key={coll.id}
                  href={`/produtos/subcategoria/${coll.slug}`}
                >
                  <a className="flex items-center gap-2 hover:underline">
                    <Tag /> {coll.name}
                  </a>
                </Link>
              ))}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
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
              <Popover.Trigger className="h-10 flex text-white bg-secondary-500 rounded-md w-fit items-center gap-2 font-bold px-5 hover:bg-primary-600 hover:text-white dark:text-zinc-900 dark:hover:bg-primary-400 dark:bg-primary-300 select-none">
                <TagSimple />
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
            <div className="flex items-center gap-3 bg-secondary-500 px-4 py-2 text-white font-bold dark:bg-secondary-100 dark:text-zinc-900 select-none text-lg">
              <Tag />
              Categorias
            </div>
            <CategoriesItem />
          </div>

          <div className="w-full">
            <CardProducts products={products} />
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
    revalidate: 30,
  };
};
