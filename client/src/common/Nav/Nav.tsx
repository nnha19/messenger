import React, { useContext } from "react";

import { AuthContext } from "../../context/authContext";

import Button from "../button/button";

const Nav = () => {
  const authContext = useContext(AuthContext);
  const signOutHandler = () => {
    authContext?.signOut();
  };

  return (
    <nav className="p-4 bg-gray-500">
      <div className="text-right mr-8">
        <Button clicked={signOutHandler} style={{ width: "8rem" }}>
          Sign Out
        </Button>
      </div>
    </nav>
  );
};
export default Nav;
