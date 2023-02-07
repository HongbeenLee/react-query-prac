import React, { useContext } from "react";
import { ModalsStateContext } from "./ModalProvider";

const ModalsContainer = () => {
  const openedModals = useContext(ModalsStateContext);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, key } = modal;

        return (
          <React.Fragment key={`${key}-${index}`}>{Component}</React.Fragment>
        );
      })}
    </>
  );
};

export default ModalsContainer;
