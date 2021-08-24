import React from "react";
import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";

import { IUserType } from "../../../../../types/types";

interface IProps {
  messages: {
    message: string;
    username: string;
    email: string;
    img: string;
    activeNow: boolean;
    _id: string;
  }[];
  curUser: IUserType["user"];
}

const DisplayMessages: React.FC<IProps> = ({ messages, curUser }) => {
  const msgOutput = messages.map((message) => {
    const senderIsCurUser = curUser._id === message._id;
    let textStyle = senderIsCurUser
      ? `bg-primary text-white ml-auto w-max text-center`
      : "ml-4 bg-gray-200";
    return (
      <div className={`flex mb-4 items-center`}>
        {message.img && !senderIsCurUser && (
          <AvatarImage
            style={{ height: "3rem", width: "3rem" }}
            imgURL={`http://localhost:5000/${message.img}`}
          />
        )}
        <div className={`${textStyle} rounded-2xl p-4 py-2`}>
          <span>{message.message}</span>
        </div>
      </div>
    );
  });
  return <div className="h-96 px-8 py-4 overflow-y-scroll">{msgOutput}</div>;
};

export default DisplayMessages;
