import React from "react";

interface IProps {
  label: string;
  name: string;
  id: string;
  value: string;
  changeVal: (e) => void;
  checked?: boolean;
}

const RadioButton: React.FC<IProps> = ({
  label,
  name,
  id,
  value,
  checked,
  changeVal,
}) => {
  return (
    <div className="mr-8 ">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        checked={checked}
        onChange={changeVal}
        name={name}
        id={id}
        type="radio"
        value={value}
      />
    </div>
  );
};

export default RadioButton;
