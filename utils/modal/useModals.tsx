// useModals.js
import { ReactNode, useContext } from "react";
import { ModalsDispatchContext } from "./ModalProvider";

const useModals = (key: string, Component: ReactNode) => {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = () => {
    open({ Component, key });
  };
  const closeModal = () => {
    close(key);
  };

  return { openModal, closeModal };
};

export default useModals;
