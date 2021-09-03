import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = (initState) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("authContext is undefined. Use is correctly.");
  } else {
    return authContext;
  }
};
