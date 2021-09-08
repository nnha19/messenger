import React, { useState, createContext } from "react";

interface IShowModalContext {
  children: React.ReactNode;
}

interface IContextValue {
  showModal: boolean;
  modalShow: () => void;
  hideModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | null) => void;
}

export const ShowModalContextProvider = createContext({} as IContextValue);

const ShowModalContext: React.FC<IShowModalContext> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = function () {
    setShowModal(true);
  };

  const hideModalHandler = function (e) {
    if (e.target.closest("#three-dots")) {
      return;
    }
    setShowModal(false);
  };

  return (
    <ShowModalContextProvider.Provider
      value={{
        showModal,
        modalShow: showModalHandler,
        hideModal: hideModalHandler,
      }}
    >
      {children}
    </ShowModalContextProvider.Provider>
  );
};

export default ShowModalContext;
