import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { FloppyDisk, ImageSquare, Pencil, TagSimple, X } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import {
  CREATE_CATEGORY,
  PUBLISH_CATEGORY,
} from "../../../../graphql/dashboard/categories";
import { FIND_DASHBOARD_IMAGES } from "../../../../graphql/dashboard/imagens";

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

export default function CategoriesRegister() {
  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [modalImages, setModalImages] = useState<boolean>(false);
  const [image, setImage] = useState<ImageIdProps>({
    id: "",
    url: "",
  });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findImagesResults] = useQuery({
    query: FIND_DASHBOARD_IMAGES,
  });

  const { data, error } = findImagesResults;

  const [saveCategoryResults, saveCategory] = useMutation(CREATE_CATEGORY);
  const [publishCategoryResults, publishCategory] =
    useMutation(PUBLISH_CATEGORY);

  const { fetching, data: saveData, error: saveError } = saveCategoryResults;

  const { error: publishError } = publishCategoryResults;

  function clearForm() {
    setName("");
    setImage({ id: "", url: "" });
    setDescription("");
  }

  async function setSaveCategory() {
    if (!image.id.length) {
      setToast({
        message: "Selecione uma imagem",
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
    await saveCategory({
      name,
      slug: name
        .normalize("NFD")
        .replaceAll(/[^\w\s]/gi, "")
        .replaceAll(" ", "-")
        .toLowerCase(),
      description,
      imageId: image.id,
    });
  }

  async function setPublishCategory(id: string) {
    await publishCategory({ id });
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
      setPublishCategory(saveData.createCategory.id as string);
      setToast({
        message: "Categoria salva com sucesso",
        title: "Sucesso",
        type: "success",
      });
      setOpenToast(true);
      clearForm();
    }
  }, [data, error, saveData, saveError, publishError]);

  function handleSelectImage(id: string) {
    const result = images.find((obj) => obj.id === id);
    setImage({
      id: result?.id as string,
      url: result?.url as string,
    });
    setModalImages(false);
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
      <HeadApp title={`${configs.companyName} - Cadastro de categorias`} />
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-5 xl:px-0 py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <TagSimple className="text-primary-500 dark:text-primary-300" />
          <span>Cadastro de categorias</span>
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
              isLoading={fetching}
              onClick={() => setSaveCategory()}
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
