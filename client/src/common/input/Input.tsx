import React from "react";

interface IProps {
  label?: string;
  placeholder: string;
  value: string;
  name: string;
  clsName?: string;
  type: string;
  onChange: (e: any, name: string) => void;
  style?: object;
}

const Input: React.FC<IProps> = ({
  label,
  placeholder,
  value,
  name,
  clsName,
  type,
  style,
  onChange,
}) => {
  return (
    <div style={style} className="mb-4">
      {label && <label className="block mb-2">{label}</label>}
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
