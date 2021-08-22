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
  const active =
    activeHeader === header && `text-primary border-b-4 border-primary`;
  return (
    <h2
      onClick={() => toggleHeader(header)}
      className={`cursor-pointer text-center py-4 text-md font-bold px-8 ${active}`}
    >
      {header}
    </h2>
  );
};

export default ToggleHeader;
