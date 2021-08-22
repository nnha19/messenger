import React from "react";

interface IProps {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  clsName?: string;
  type: string;
  onChange: (e: any, name: string) => void;
}

const Input: React.FC<IProps> = ({
  label,
  placeholder,
  value,
  name,
  clsName,
  type,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <input
        onChange={(e) => onChange(e, name)}
        name={name}
        value={value}
        className={`border-2 w-full px-4 py-1 ${clsName}`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
