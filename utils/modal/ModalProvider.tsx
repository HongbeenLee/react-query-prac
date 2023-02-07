import { PropsWithChildren, ReactNode, useState, createContext } from "react";

type ModalsProviderProps = PropsWithChildren<{}>;
type Modal = {
  Component: ReactNode;
  key: string;
};

export const ModalsStateContext = createContext<Modal[]>([]);
export const ModalsDispatchContext = createContext({
  open: (modal: Modal) => {},
  close: (key: string) => {},
});

export const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<Modal[]>([]);

  const open = (newModal: Modal) => {
    setOpenedModals((modals) => {
      return [...modals, newModal];
    });
  };

  const close = (key: string) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal.key !== key);
    });
  };

  return (
    <ModalsDispatchContext.Provider value={{ open, close }}>
      <ModalsStateContext.Provider value={openedModals}>
        {children}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
};
