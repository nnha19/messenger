import { useContext } from "react";
import { ShowModalContextProvider } from "../context/showModalContext";

export const useShowModalContext = () => {
  const showModalContext = useContext(ShowModalContextProvider);
  if (!showModalContext) {
    throw new Error("Use this correctly");
  } else {
    return showModalContext;
  }
};
