import { CategoriesContextProvider } from "./categories";

const GlobalCategoriesContext = ({ children }: any) => {
  return <CategoriesContextProvider>{children}</CategoriesContextProvider>;
};

export default GlobalCategoriesContext;
