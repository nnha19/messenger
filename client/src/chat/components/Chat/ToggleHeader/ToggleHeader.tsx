import React from "react";

interface IProps {
  header: string;
  activeHeader: string;
  toggleHeader: (header: string) => void;
}

const ToggleHeader: React.FC<IProps> = ({
  header,
  activeHeader,
  toggleHeader,
}) => {
  const active = activeHeader === header && `border-b-4 font-bold `;
  return (
    <h2
      onClick={() => toggleHeader(header)}
      className={`cursor-pointer text-center py-4 text-md text-white px-8 ${active}`}
    >
      {header}
    </h2>
  );
};

export default ToggleHeader;
