import React from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

interface IProps {
  header: string;
}

const ToggleHeader: React.FC<IProps> = ({ header }) => {
  const capitalizedHeader =
    header[0].toUpperCase() + header.split("").splice(1).join("");
  return (
    <NavLink
      activeStyle={{ borderBottom: "3px solid white" }}
      to={`/chat/${header}`}
    >
      <h2
        className={`cursor-pointer text-center py-4 text-md text-white px-8 `}
      >
        {capitalizedHeader}
      </h2>
    </NavLink>
  );
};

export default ToggleHeader;
