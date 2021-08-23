import React, { ReactChild, useContext } from "react";

interface IProps {
  children: React.ReactNode;
  clss?: string;
  style?: object;
  clicked?: () => void;
}

const Button: React.FC<IProps> = ({ children, clss, style, clicked }) => {
  return (
    <button
      onClick={clicked}
      style={style}
      className={`bg-primary px-6 py-2 w-full rounded text-white font-medium mt-2 ${clss}`}
    >
      {children}
    </button>
  );
};

export default Button;
