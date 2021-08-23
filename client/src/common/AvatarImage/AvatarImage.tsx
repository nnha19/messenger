import React from "react";

interface IProps {
  imgURL: string;
}

const AvatarImage: React.FC<IProps> = ({ imgURL }) => {
  return <img className="h-16 rounded-full" src={imgURL} alt="" />;
};

export default AvatarImage;
