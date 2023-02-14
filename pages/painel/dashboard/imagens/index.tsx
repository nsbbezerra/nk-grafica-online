import Image from "next/image";
import { CircleNotch, ImageSquare } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
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

export default function DashboardImagens() {
  const [images, setImages] = useState<ImagesPorps[]>([]);
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findImagesResults, findImages] = useQuery({
    query: FIND_DASHBOARD_IMAGES,
  });

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
  }, [data, error]);

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
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <ImageSquare className="text-primary-500 dark:text-primary-300" />
          <span>Imagens</span>
        </div>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}
