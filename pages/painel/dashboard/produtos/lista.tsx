import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowFatLineLeft,
  ArrowFatLineRight,
  Check,
  CircleNotch,
  ImageSquare,
  Pencil,
  Tag,
  X,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import {
  FIND_PRODUCTS_BY_NAME,
  FIND_PRODUCTS_PAG,
  PUBLISH_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
} from "../../../../graphql/dashboard/products";
import { ShippingProps } from "../../../../utils/Types";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import Image from "next/image";
import { clientQuery } from "../../../../lib/urql";
import { FIND_DASHBOARD_IMAGES } from "../../../../graphql/dashboard/imagens";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
}

interface ProductProps {
  id: string;
  name: string;
  information: string;
  active: boolean;
  destak: boolean;
  description?: string;
  thumbnail?: { id: string; url: string; width: number; height: number };
  slug: string;
  price: number;
  shipping: ShippingProps;
  shippingOptions: string;
  category: { id: string; name: string };
  collection: { id: string; name: string };
  promotional: boolean;
  promoRate?: number;
}

interface ImagesPorps {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function ListProducts() {
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [modalImages, setModalImages] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("all");
  const [text, setText] = useState<string>("");

  const [productId, setProductId] = useState<string>("");
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    setText("");
  }, [search]);

  const [findProductsResult, findProducts] = useQuery({
    query: FIND_PRODUCTS_PAG,
    variables: { page },
    requestPolicy: "network-only",
    pause: search === "name",
  });
  const { data: findData, error: findError, fetching } = findProductsResult;

  const [publishProductResults, publishProduct] = useMutation(PUBLISH_PRODUCT);

  const { error: publishError } = publishProductResults;

  const [updateImageResults, updateImage] = useMutation(UPDATE_PRODUCT_IMAGE);

  const { fetching: updateImageFetching } = updateImageResults;

  async function setPublishProduct(id: string) {
    await publishProduct({ id });
    search === "name" ? findProductsByName() : findProducts();
  }

  async function findProductsByName() {
    if (!text.length) {
      setToast({
        message: "Digite um nome para busca",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    setIsLoading(true);
    const { data, error } = await clientQuery
      .query(
        FIND_PRODUCTS_BY_NAME,
        { name: text },
        { requestPolicy: "network-only" }
      )
      .toPromise();

    if (data) {
      setProducts(data.products);
    }
    if (error) {
      setToast({
        message: error.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    setIsLoading(false);
  }

  function setSearchProducts() {
    if (search === "name") {
      findProductsByName();
    } else {
      findProducts();
    }
  }

  const [findProductsResults] = useQuery({
    query: FIND_DASHBOARD_IMAGES,
    requestPolicy: "network-only",
  });

  const { data, error } = findProductsResults;

  useEffect(() => {
    if (data) {
      setImages(data.assets);
    }
    if (error) {
      setToast({
        message: error.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    if (findError) {
      setToast({
        message: findError.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    if (publishError) {
      setToast({
        message: publishError.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    if (findData) {
      setProducts(findData.products);
      setPageInfo(findData.productsConnection.pageInfo);
    }
  }, [data, error, findData, findError, publishError]);

  function handlePreviousPage() {
    setPage(page - configs.paginate);
    findProducts();
  }

  function handleNextPage() {
    setPage(page + configs.paginate);
    findProducts();
  }

  function handleChangeImage(id: string) {
    setProductId(id);
    setModalImages(true);
  }

  function setUpdateImage(id: string) {
    setImageId(id);

    updateImage({ id: productId, imageId: id })
      .then((response) => {
        const { data } = response;
        if (data) {
          setPublishProduct(data.updateProduct.id);
          setToast({
            message: "Imagem alterada com sucesso",
            title: "Sucesso",
            type: "success",
          });
          setOpenToast(true);
          setModalImages(false);
        }
      })
      .catch((error) => {
        setToast({
          message: error.message,
          title: "Erro",
          type: "error",
        });
        setOpenToast(true);
      });
  }

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title={`${configs.companyName} - Listagem de produtos`} />
      <DashboardHeader />

      <div className="w-full container mx-auto px-5 xl:px-0 max-w-7xl py-10 gap-5">
        <div className="flex flex-col lg:items-center lg:flex-row justify-between gap-5 mb-10 w-full">
          <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3">
            <Tag className="text-primary-500 dark:text-primary-300" />
            <span>Listagem de produtos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-3 w-full lg:w-fit">
            <select
              className="inputs"
              placeholder="Selecione uma busca"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option value={""}>Selecione uma busca</option>
              <option value={"all"}>Busca todos</option>
              <option value={"name"}>Busca por nome</option>
            </select>
            <input
              className="inputs"
              disabled={search === "all"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              isFullSize
              onClick={() => setSearchProducts()}
              isLoading={isLoading}
            >
              Buscar
            </Button>
          </div>
        </div>

        {fetching ? (
          <div className="flex flex-col justify-center items-center gap-5 py-5">
            <CircleNotch className="text-6xl animate-spin" />
            <span>Buscando informações...</span>
          </div>
        ) : (
          <div className="w-full max-w-ful overflow-y-auto card">
            <table className="w-full" cellPadding={"7px"}>
              <thead>
                <tr>
                  <th className="text-center py-3 border-b dark:border-b-zinc-700 w-16"></th>
                  <th className="text-center py-3 border-b dark:border-b-zinc-700 w-20">
                    ATIVO?
                  </th>
                  <th className="text-center py-3 border-b dark:border-b-zinc-700 w-20">
                    INDEX?
                  </th>
                  <th className="text-center py-3 border-b dark:border-b-zinc-700 w-20">
                    PROMO?
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[250px]">
                    NOME
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[150px]">
                    CATEGORIA
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[150px]">
                    SUB-CATEGORIA
                  </th>
                  <th className="text-right py-3 border-b dark:border-b-zinc-700 min-w-[100px]">
                    PREÇO
                  </th>
                  <th className="text-right py-3 border-b dark:border-b-zinc-700 min-w-[100px]">
                    PREÇO
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((cli) => (
                  <tr key={cli.id}>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <div className="w-10 rounded-sm overflow-hidden relative">
                        <Image
                          src={cli.thumbnail?.url || ""}
                          layout="responsive"
                          width={cli.thumbnail?.width}
                          height={cli.thumbnail?.height}
                          alt="Imagem"
                        />
                        <div
                          className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer delay-75 opacity-0 hover:opacity-100"
                          onClick={() => handleChangeImage(cli.id)}
                        >
                          <Pencil className="text-white text-xl" />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <CheckboxPrimitive.Root
                        id="c1"
                        className={clsx(
                          "flex h-5 w-5 items-center justify-center rounded border dark:border-zinc-600",
                          "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-900",
                          "focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-300"
                        )}
                        onCheckedChange={() => {}}
                        checked={cli.active}
                      >
                        <CheckboxPrimitive.Indicator>
                          <Check className="h-4 w-4 self-center text-zinc-700 dark:text-zinc-100" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <CheckboxPrimitive.Root
                        id="c1"
                        className={clsx(
                          "flex h-5 w-5 items-center justify-center rounded border dark:border-zinc-600",
                          "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-900",
                          "focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-300"
                        )}
                        onCheckedChange={() => {}}
                        checked={cli.destak}
                      >
                        <CheckboxPrimitive.Indicator>
                          <Check className="h-4 w-4 self-center text-zinc-700 dark:text-zinc-100" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <CheckboxPrimitive.Root
                        id="c1"
                        className={clsx(
                          "flex h-5 w-5 items-center justify-center rounded border dark:border-zinc-600",
                          "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-900",
                          "focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-300"
                        )}
                        onCheckedChange={() => {}}
                        checked={cli.promotional}
                      >
                        <CheckboxPrimitive.Indicator>
                          <Check className="h-4 w-4 self-center text-zinc-700 dark:text-zinc-100" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.name || ""}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.category.name || ""}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cli.collection.name || ""}
                    </td>
                    <td className="text-right py-2 border-b dark:border-b-zinc-700">
                      {cli.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      }) || ""}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <Button isFullSize variant="outline" buttonSize="xs">
                        <Pencil />
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {search !== "name" && (
              <div className="w-full p-2 flex justify-center items-center bg gap-3 mt-2">
                <Button
                  variant="outline"
                  buttonSize="sm"
                  isDisabled={!pageInfo?.hasPreviousPage}
                  onClick={() => handlePreviousPage()}
                >
                  <ArrowFatLineLeft />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  buttonSize="sm"
                  isDisabled={!pageInfo?.hasNextPage}
                  onClick={() => handleNextPage()}
                >
                  Próxima
                  <ArrowFatLineRight />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog.Root
        open={modalImages}
        onOpenChange={() => setModalImages(false)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content-dashboard overflow-auto p-2">
            <div className="rounded-md bg-white dark:bg-zinc-800 shadow-2xl w-full max-w-4xl overflow-hidden">
              <Dialog.Title className="header-modal bg-transparent">
                <div className="flex items-center gap-3 text-lg">
                  <ImageSquare />
                  Selecione uma nova imagem
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4 grid grid-cols-3 sm:grid-cols-4 sm:gap-2 md:grid-cols-6 gap-1 md:gap-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="w-full relative overflow-hidden border dark:border-zinc-700 rounded-md"
                  >
                    <Image
                      src={image.url}
                      layout="responsive"
                      alt="Imagem"
                      width={image.width}
                      height={image.height}
                    />
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 flex justify-center items-center p-5 opacity-0 hover:opacity-100 delay-75">
                      <Button
                        onClick={() => setUpdateImage(image.id)}
                        buttonSize="sm"
                        isLoading={imageId === image.id && updateImageFetching}
                      >
                        Selecionar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
