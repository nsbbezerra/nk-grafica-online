import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Check, FloppyDisk, ImageSquare, Pencil, Tag, X } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import { JoditEditor } from "../../../../lib/jodit";
import clsx from "clsx";
import {
  FIND_CATEGORIES_AND_SUBCATEGORIES,
  SAVE_PRODUCT,
  PUBLISH_PRODUCT,
} from "../../../../graphql/dashboard/products";

interface ImagesPorps {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface ImageIdProps {
  id: string;
  url: string;
}

interface CateoriesProps {
  id: string;
  name: string;
}

interface SubCategoriesProps {
  id: string;
  name: string;
  category: { id: string };
}

type ShippingProps = {
  width: number;
  height: number;
  lenght: number;
  weight: number;
};
export default function ProductsRegister() {
  const { theme } = useTheme();
  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [modalImages, setModalImages] = useState<boolean>(false);
  const [image, setImage] = useState<ImageIdProps>({
    id: "",
    url: "",
  });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<CateoriesProps[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoriesProps[]>([]);
  const [subCategoriesIndex, setSubCategoriesIndex] = useState<
    SubCategoriesProps[]
  >([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [information, setInformation] = useState<string>("");
  const [shipping, setShipping] = useState<ShippingProps>({
    height: 0,
    lenght: 0,
    weight: 0,
    width: 0,
  });
  const [destak, setDestak] = useState<CheckboxPrimitive.CheckedState>(false);
  const [shippingOptions, setShippingOptions] = useState<string>("");

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findImagesResults] = useQuery({
    query: FIND_CATEGORIES_AND_SUBCATEGORIES,
  });

  const { data, error } = findImagesResults;

  const [saveProductsResults, saveProducts] = useMutation(SAVE_PRODUCT);
  const [publishProductResults, publishProduct] = useMutation(PUBLISH_PRODUCT);

  const { fetching, data: saveData, error: saveError } = saveProductsResults;

  const { error: publishError } = publishProductResults;

  function clearForm() {
    setName("");
    setImage({ id: "", url: "" });
    setDescription("");
    setInformation("");
    setPrice(0);
    setShippingOptions("");
    setShipping({ height: 0, lenght: 0, weight: 0, width: 0 });
    setDestak(false);
  }

  async function setSaveProduct() {
    if (!image.id.length) {
      setToast({
        message: "Selecione uma imagem",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    if (!categoryId.length) {
      setToast({
        message: "Selecione uma categoria",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    if (!subCategoryId.length) {
      setToast({
        message: "Selecione uma sub-categoria",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    if (!name.length) {
      setToast({
        message: "O nome é obrigatório",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    if (!shippingOptions.length) {
      setToast({
        message: "Selecione uma entrega",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }
    await saveProducts({
      name,
      slug: name
        .normalize("NFD")
        .replaceAll(/[^\w\s]/gi, "")
        .replaceAll(" ", "-")
        .toLowerCase(),
      description,
      imageId: image.id,
      information,
      shipping,
      destak,
      shippingOptions,
      categoryId,
      subCategoryId,
      price,
    });
  }

  async function setPublishProduct(id: string) {
    await publishProduct({ id });
  }

  function handleSelectCategory(id: string) {
    setCategoryId(id);
    setSubCategoryId("");
    const results = subCategoriesIndex.filter((obj) => obj.category.id === id);
    setSubCategories(results);
  }

  function handleSelectImage(id: string) {
    const result = images.find((obj) => obj.id === id);
    setImage({
      id: result?.id as string,
      url: result?.url as string,
    });
    setModalImages(false);
  }

  useEffect(() => {
    if (error) {
      setToast({
        message: error.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
    if (data) {
      setImages(data.assets);
      setCategories(data.categories);
      setSubCategoriesIndex(data.collections);
    }
    if (saveError) {
      setToast({
        message: saveError.message,
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
    if (saveData) {
      setPublishProduct(saveData.createProduct.id as string);
      setToast({
        message: "Produto salvo com sucesso",
        title: "Sucesso",
        type: "success",
      });
      setOpenToast(true);
      clearForm();
    }
  }, [data, error, saveData, saveError, publishError]);

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title={`${configs.companyName} - Cadastro de produtos`} />
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-5 xl:px-0 py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <Tag className="text-primary-500 dark:text-primary-300" />
          <span>Cadastro de produtos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-5 justify-items-center">
          {!image.id.length ? (
            <div className="card w-[280px] h-[280px] flex items-center justify-center">
              <Button onClick={() => setModalImages(true)} variant="outline">
                Escolha uma imagem
              </Button>
            </div>
          ) : (
            <div className="card w-[280px] h-[280px] relative">
              <Image
                src={image.url}
                layout="responsive"
                alt="Imagem"
                width={600}
                height={600}
              />
              <div className="flex justify-center absolute bottom-5 w-full">
                <Button onClick={() => setModalImages(true)}>
                  <Pencil />
                </Button>
              </div>
            </div>
          )}

          <div className="card p-3 flex flex-col gap-3 w-full min-h-[280px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label>Categoria *</label>
                <select
                  className="inputs"
                  placeholder="Selecione uma opção"
                  value={categoryId}
                  onChange={(e) => handleSelectCategory(e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Sub-categoria *</label>
                <select
                  className="inputs"
                  placeholder="Selecione uma opção"
                  value={subCategoryId}
                  onChange={(e) => setSubCategoryId(e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  {subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-3">
              <div>
                <label>Nome *</label>
                <input
                  className="inputs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Preço *</label>
                <input
                  className="inputs"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type="number"
                />
              </div>
              <div>
                <label>Entrega *</label>
                <select
                  className="inputs"
                  placeholder="Selecione uma opção"
                  value={shippingOptions}
                  onChange={(e) => setShippingOptions(e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  <option value={"slow"}>Normal</option>
                  <option value={"fast"}>Rápida</option>
                </select>
              </div>
            </div>
            <div>
              <label>Descrição</label>
              <textarea
                className="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="-mt-2">
              <label>Informações *</label>
              <JoditEditor
                value={information}
                config={{
                  theme,
                  statusbar: false,
                  language: "pt-br",
                  buttonsXS: configs.joditButtons,
                  buttonsSM: configs.joditButtons,
                  buttonsMD: configs.joditButtons,
                  buttons: configs.joditButtons,
                  showTooltip: false,
                  defaultMode: 1,
                  className: "jodit-editor",
                  editorClassName: "jodit-editor-class",
                }}
                onBlur={(e) => setInformation(e)}
                className="jodit-toolbar"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label>Largura (CM) *</label>
                <input
                  className="inputs"
                  value={shipping.width}
                  onChange={(e) =>
                    setShipping((prev) => ({
                      ...prev,
                      width: Number(e.target.value),
                    }))
                  }
                  type="number"
                />
              </div>
              <div>
                <label>Altura (CM) *</label>
                <input
                  className="inputs"
                  value={shipping.height}
                  onChange={(e) =>
                    setShipping((prev) => ({
                      ...prev,
                      height: Number(e.target.value),
                    }))
                  }
                  type="number"
                />
              </div>
              <div>
                <label>Comprimento (CM) *</label>
                <input
                  className="inputs"
                  value={shipping.lenght}
                  onChange={(e) =>
                    setShipping((prev) => ({
                      ...prev,
                      lenght: Number(e.target.value),
                    }))
                  }
                  type="number"
                />
              </div>
              <div>
                <label>Peso (KG) *</label>
                <input
                  className="inputs"
                  value={shipping.weight}
                  onChange={(e) =>
                    setShipping((prev) => ({
                      ...prev,
                      weight: Number(e.target.value),
                    }))
                  }
                  type="number"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckboxPrimitive.Root
                id="c1"
                checked={destak}
                className={clsx(
                  "flex h-5 w-5 items-center justify-center rounded border dark:border-zinc-600",
                  "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-900",
                  "focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-300"
                )}
                onCheckedChange={setDestak}
              >
                <CheckboxPrimitive.Indicator>
                  <Check className="h-4 w-4 self-center text-zinc-700 dark:text-zinc-100" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
              <label
                htmlFor="c1"
                className="select-none text-red-600 dark:text-red-300"
              >
                Deseja que este item apareça na tela inicial do site?
              </label>
            </div>

            <Button
              isLoading={fetching}
              onClick={() => setSaveProduct()}
              buttonSize="lg"
            >
              <FloppyDisk /> Salvar
            </Button>
          </div>
        </div>
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
                  Imagens
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
                        onClick={() => handleSelectImage(image.id)}
                        buttonSize="sm"
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
