import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  CircleNotch,
  FloppyDisk,
  ImageSquare,
  Pencil,
  TagSimple,
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
  FIND_DASHBOARD_CATEGORIES,
  PUBLISH_CATEGORY,
  UPDATE_CATEGORY_IMAGE,
  UPDATE_CATEGORY_INFO,
} from "../../../../graphql/dashboard/categories";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface CategoriesProps {
  id: string;
  thumbnail: { id: string; url: string; width: number; height: number };
  name: string;
  slug: string;
  description?: string;
}

interface ImagesPorps {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function ListCategories() {
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [modalImages, setModalImages] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [imageId, setImageId] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  const [findCategoriesResults, findCategories] = useQuery({
    query: FIND_DASHBOARD_CATEGORIES,
    requestPolicy: "network-only",
  });

  const { data, error, fetching } = findCategoriesResults;

  const [updatImageResults, updateImage] = useMutation(UPDATE_CATEGORY_IMAGE);

  const { fetching: updateImageFetching } = updatImageResults;

  const [publishCategoryResults, publishCategory] =
    useMutation(PUBLISH_CATEGORY);

  const { error: publishError } = publishCategoryResults;

  const [updateInfoResults, updateInfo] = useMutation(UPDATE_CATEGORY_INFO);

  const { fetching: fetchingUpdateInfo } = updateInfoResults;

  async function setPublishCategory(id: string) {
    await publishCategory({ id });
    findCategories();
  }

  function setUpdateInfo() {
    if (!name.length) {
      setToast({
        message: "O nome é obrigatório",
        title: "Atenção",
        type: "warning",
      });
      setOpenToast(true);
      return;
    }

    updateInfo({
      id: categoryId,
      name,
      description,
      slug: name
        .normalize("NFD")
        .replaceAll(/[^\w\s]/gi, "")
        .replaceAll(" ", "-")
        .toLowerCase(),
    })
      .then((response) => {
        const { data } = response;
        if (data) {
          setPublishCategory(data.updateCategory.id);
          setModalEdit(false);
          setToast({
            message: "Informação atualizada com sucesso",
            title: "Sucesso",
            type: "success",
          });
          setOpenToast(true);
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

  function setUpdateImage(id: string) {
    setImageId(id);
    updateImage({ imageId: id, id: categoryId })
      .then((response) => {
        const { data } = response;
        if (data) {
          setPublishCategory(data.updateCategory.id);
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

  function handleUpdateImage(id: string) {
    setCategoryId(id);
    setModalImages(true);
  }

  function handleEditInfo(id: string) {
    setCategoryId(id);
    const result = categories.find((obj) => obj.id === id);
    setName(result?.name as string);
    setDescription(result?.description as string);
    setModalEdit(true);
  }

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
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
    if (publishError) {
      setToast({
        message: publishError.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
  }, [data, error, publishError]);

  return (
    <Fragment>
      <Toast
        title={toast.title}
        message={toast.message}
        onClose={setOpenToast}
        open={openToast}
        scheme={toast.type}
      />
      <HeadApp title={`${configs.companyName} - Listagem de categorias`} />
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-5 xl:px-0 py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <TagSimple className="text-primary-500 dark:text-primary-300" />
          <span>Listagem de categorias</span>
        </div>

        {fetching ? (
          <div className="flex flex-col justify-center items-center gap-5 py-5">
            <CircleNotch className="text-6xl animate-spin" />
            <span>Buscando informações...</span>
          </div>
        ) : (
          <div className="w-full max-w-ful overflow-y-auto card">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-center py-3 border-b dark:border-b-zinc-700 w-16"></th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[320px]">
                    NOME
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[280px]">
                    SLUG
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 w-32">
                    OPÇÕES
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <div className="w-10 rounded-sm overflow-hidden relative">
                        <Image
                          src={cat.thumbnail.url}
                          layout="responsive"
                          width={cat.thumbnail.width}
                          height={cat.thumbnail.height}
                          alt="Imagem"
                        />
                        <div
                          className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer delay-75 opacity-0 hover:opacity-100"
                          onClick={() => handleUpdateImage(cat.id)}
                        >
                          <Pencil className="text-white text-xl" />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cat.name}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cat.slug}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      <Button
                        buttonSize="xs"
                        variant="outline"
                        isFullSize
                        onClick={() => handleEditInfo(cat.id)}
                      >
                        <Pencil /> Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      <Dialog.Root open={modalEdit} onOpenChange={() => setModalEdit(false)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="dialog-content-dashboard overflow-auto p-2">
            <div className="rounded-md bg-white dark:bg-zinc-800 shadow-2xl w-full max-w-4xl overflow-hidden">
              <Dialog.Title className="header-modal bg-transparent">
                <div className="flex items-center gap-3 text-lg">
                  <Pencil />
                  Editar informações
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <div>
                    <label>Nome *</label>
                    <input
                      className="inputs"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                  <Button
                    isLoading={fetchingUpdateInfo}
                    onClick={() => setUpdateInfo()}
                    buttonSize="lg"
                  >
                    <FloppyDisk /> Salvar
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
