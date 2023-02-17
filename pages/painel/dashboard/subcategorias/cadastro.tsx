import { FloppyDisk, TagSimple } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import HeadApp from "../../../../components/Head";
import Button from "../../../../components/layout/Buttom";
import DashboardHeader from "../../../../components/layout/DashHeader";
import Toast from "../../../../components/layout/Toast";
import { configs } from "../../../../configs";
import {
  CREATE_SUBCATEGORY,
  GET_ALL_CATEGORIES,
  PUBLISH_SUBCATEGORY,
} from "../../../../graphql/dashboard/subcategories";

interface ToastInfo {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface CategoriesProps {
  id: string;
  name: string;
}

export default function SubCategoriesRegister() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const [toast, setToast] = useState<ToastInfo>({
    title: "",
    message: "",
    type: "info",
  });
  const [openToast, setOpenToast] = useState<boolean>(false);

  const [findImagesResults] = useQuery({
    query: GET_ALL_CATEGORIES,
  });

  const [createSubCategoryResults, createSubCategory] =
    useMutation(CREATE_SUBCATEGORY);
  const [publishSubCategoryResults, publishSubCategory] =
    useMutation(PUBLISH_SUBCATEGORY);

  const { error: publishError } = publishSubCategoryResults;

  const { data, error } = findImagesResults;

  const {
    fetching,
    data: saveData,
    error: saveError,
  } = createSubCategoryResults;

  function clearForm() {
    setName("");
    setDescription("");
    setCategoryId("");
  }

  async function setSaveCategory() {
    if (!categoryId.length) {
      setToast({
        message: "Selecione uma categoria",
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
    await createSubCategory({
      name,
      slug: name
        .normalize("NFD")
        .replaceAll(/[^\w\s]/gi, "")
        .replaceAll(" ", "-")
        .toLowerCase(),
      description,
      id: categoryId,
    });
  }

  async function setPublishCategory(id: string) {
    await publishSubCategory({ id });
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
      setCategories(data.categories);
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
      setPublishCategory(saveData.createCollection.id);
      setToast({
        message: "Sub-categoria salva com sucesso",
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
      <HeadApp title={`${configs.companyName} - Cadastro de sub-categorias`} />
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-5 xl:px-0 py-10 w-full">
        <div className="flex items-center gap-3 text-xl sm:text-2xl w-fit font-extrabold border-b-2 border-b-primary-500 dark:border-b-primary-300 pr-3 mb-10">
          <TagSimple className="text-primary-500 dark:text-primary-300" />
          <span>Cadastro de Sub-categorias</span>
        </div>

        <div className="grid grid-cols-1">
          <div className="card p-3 flex flex-col gap-3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3">
              <div>
                <label>Categoria *</label>
                <select
                  className="inputs"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder="Selecione uma categoria"
                >
                  <option value={""}>Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Nome *</label>
                <input
                  className="inputs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
    </Fragment>
  );
}
