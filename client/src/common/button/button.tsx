import React, { ReactChild } from "react";

interface IProps {
  children: ReactChild;
  clss?: string;
}

const Button: React.FC<IProps> = ({ children, clss }) => {
  return (
    <button
      className={`bg-primary px-6 py-2 w-full rounded text-white font-medium mt-2 ${clss}`}
    >
      {children}
    </button>
  );
};

export default Button;
