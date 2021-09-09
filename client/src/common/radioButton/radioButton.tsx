import React from "react";

interface IProps {
  label: string;
  name: string;
  id: string;
}

const RadioButton: React.FC<IProps> = ({ label, name, id }) => {
  return (
    <div className="mr-8 ">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input name={name} id={id} type="radio" />
    </div>
  );
};

export default RadioButton;
