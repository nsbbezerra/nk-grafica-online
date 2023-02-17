import * as Dialog from "@radix-ui/react-dialog";
import { CircleNotch, FloppyDisk, Pencil, TagSimple, X } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import {
  FIND_SUB_CATEGORIES,
  PUBLISH_SUBCATEGORY,
  UPDATE_SUB_CATEGORY,
} from "../../../../graphql/dashboard/subcategories";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface CategoriesProps {
  id: string;
  slug: string;
  name: string;
  description?: string;
  active: boolean;
  category: { id: string; name: string };
}

export default function ListSubCategories() {
  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  const [findCategoriesResults, findCategories] = useQuery({
    query: FIND_SUB_CATEGORIES,
    requestPolicy: "network-only",
  });

  const { data, error, fetching } = findCategoriesResults;

  const [publishCategoryResults, publishCategory] =
    useMutation(PUBLISH_SUBCATEGORY);

  const { error: publishError } = publishCategoryResults;

  const [updateInfoResults, updateInfo] = useMutation(UPDATE_SUB_CATEGORY);

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
          setPublishCategory(data.updateCollection.id);
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

  function handleEditInfo(id: string) {
    setCategoryId(id);
    const result = categories.find((obj) => obj.id === id);
    setName(result?.name as string);
    setDescription(result?.description as string);
    setModalEdit(true);
  }

  useEffect(() => {
    if (data) {
      setCategories(data.collections);
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
      <HeadApp title={`${configs.companyName} - Listagem de Sub-categorias`} />
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-5 xl:px-0 py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <TagSimple className="text-primary-500 dark:text-primary-300" />
          <span>Listagem de Sub-categorias</span>
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
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[280px]">
                    NOME
                  </th>
                  <th className="text-left py-3 border-b dark:border-b-zinc-700 min-w-[280px]">
                    CATEGORIA
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
                      {cat.name || ""}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cat.category.name || ""}
                    </td>
                    <td className="py-2 border-b dark:border-b-zinc-700">
                      {cat.slug || ""}
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
