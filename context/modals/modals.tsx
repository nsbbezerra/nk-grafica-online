import { createContext, Dispatch, SetStateAction, useState } from "react";

interface Modals {
  id: "register" | "login";
  isOpen: boolean;
}

type PropsModalsContext = {
  modals: Modals;
  setModals: Dispatch<SetStateAction<Modals>>;
};

const DEFAULT_VALUE: PropsModalsContext = {
  modals: {
    id: "login",
    isOpen: false,
  },
  setModals: () => {},
};

const ModalsContext = createContext<PropsModalsContext>(DEFAULT_VALUE);

const ModalsContextProvider = ({ children }: any) => {
  const [modals, setModals] = useState(DEFAULT_VALUE.modals);

  return (
    <ModalsContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalsContext.Provider>
  );
};

export { ModalsContextProvider };

export default ModalsContext;
