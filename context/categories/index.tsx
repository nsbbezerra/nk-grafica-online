import { createContext, useState } from "react";

type ThumbnailProps = {
  id: string;
  url: string;
};

interface Categories {
  id: string;
  name: string;
  description: string;
  thumbnail: ThumbnailProps;
}

type PropsCategoriesContext = {
  categories: Categories[];
  setCategories: (data: Categories[]) => void;
};

const DEFAULT_VALUE: PropsCategoriesContext = {
  categories: [],
  setCategories: (data) => {},
};

const CategoriesContext = createContext<PropsCategoriesContext>(DEFAULT_VALUE);

const CategoriesContextProvider = ({ children }: any) => {
  const [categories, setCategories] = useState(DEFAULT_VALUE.categories);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContextProvider };

export default CategoriesContext;
