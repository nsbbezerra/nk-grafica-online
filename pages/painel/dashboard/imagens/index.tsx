import Image from "next/image";
import { Check, CircleNotch, Trash, X } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import {
  DELETE_IMAGE,
  FIND_DASHBOARD_IMAGES,
} from "../../../../graphql/dashboard/imagens";
import * as Dialog from "@radix-ui/react-dialog";

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

export default function DashboardImagens() {
  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string>("");

  const [findImagesResults, findImages] = useQuery({
    query: FIND_DASHBOARD_IMAGES,
  });

  const [deleteImageResults, deleteImage] = useMutation(DELETE_IMAGE);

  const {
    data: deleteImagesData,
    error: deleteImagesError,
    fetching: fetchingDeleteImages,
  } = deleteImageResults;

  const { fetching, data, error } = findImagesResults;

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

    if (deleteImagesData) {
      setToast({
        message: "Imagem excluída com sucesso",
        title: "Sucesso",
        type: "success",
      });
      setOpenToast(true);
      setDialog(false);
    }

    if (deleteImagesError) {
      setToast({
        message: deleteImagesError.message,
        title: "Erro",
        type: "error",
      });
      setOpenToast(true);
    }
  }, [data, error, deleteImagesData, deleteImagesError]);

  function handleDelImage(id: string) {
    setImageId(id);
    setDialog(true);
  }

  async function setDeleteImage() {
    await deleteImage({ id: imageId });
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
      <HeadApp title={`${configs.companyName} - Imagens`} />
      <DashboardHeader />

      <div className="w-full container mx-auto px-5 xl:px-0 max-w-7xl py-10 gap-5">
        {fetching ? (
          <div className="flex flex-col justify-center items-center gap-5 py-5">
            <CircleNotch className="text-6xl animate-spin" />
            <span>Buscando informações...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {images.map((image) => (
              <div
                key={image.id}
                className="w-full relative overflow-hidden card"
              >
                <Image
                  src={image.url}
                  layout="responsive"
                  alt="Imagem"
                  width={image.width}
                  height={image.height}
                />
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center opacity-0 hover:opacity-100 delay-75">
                  <Button
                    scheme="error"
                    onClick={() => handleDelImage(image.id)}
                  >
                    <Trash /> Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog.Root open={dialog} onOpenChange={() => setDialog(false)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="flex items-center justify-center relative">
            <div className="content-modal-login">
              <Dialog.Title className="header-modal">
                <div className="flex items-center gap-3 text-lg">
                  <Check />
                  Confirmação
                </div>

                <Dialog.Close
                  asChild
                  className="bg-zinc-300 w-6 h-6 flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-opacity-70 dark:bg-zinc-900"
                >
                  <X />
                </Dialog.Close>
              </Dialog.Title>
              <div className="p-4">
                {/** FORMULÁRIO DE CADASTRO */}

                <p>Tem certeza que deseja excluir esta imagem?</p>

                <div className="flex gap-2 mt-3">
                  <Button
                    isFullSize
                    type="submit"
                    scheme="error"
                    variant="outline"
                    onClick={() => setDialog(false)}
                  >
                    <X />
                    Não
                  </Button>

                  <Button
                    isFullSize
                    type="submit"
                    scheme="success"
                    isLoading={fetchingDeleteImages}
                    onClick={() => setDeleteImage()}
                  >
                    <Check />
                    Sim
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
