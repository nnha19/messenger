import { useContext } from "react";
import { UserAndGroupContext } from "../context/userAndGroupContext";

export const useUserAndGroup = () => {
  const userAndGroupContext = useContext(UserAndGroupContext);
  if (!userAndGroupContext) {
    throw new Error("Use this correctly.");
  } else {
    return userAndGroupContext;
  }
};
