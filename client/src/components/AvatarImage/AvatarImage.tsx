import React from "react";

interface IProps {
  imgURL: string;
  style?: object;
}

const AvatarImage: React.FC<IProps> = ({ imgURL, style }) => {
  return (
    <img style={style} className="h-16 rounded-full w-16" src={imgURL} alt="" />
  );
};

export default AvatarImage;
