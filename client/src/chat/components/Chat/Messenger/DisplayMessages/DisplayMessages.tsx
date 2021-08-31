import React from "react";
import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";

import { IUserType, IMessages } from "../../../../../types/types";

interface IProps {
  messages: IMessages["messages"];
  curUser: IUserType["user"];
}

const DisplayMessages: React.FC<IProps> = ({ messages, curUser }) => {
  const msgOutput = messages.map((message) => {
    const senderIsCurUser = curUser._id === message.sender._id;
    let textStyle = senderIsCurUser
      ? `bg-primary text-white ml-auto w-max `
      : "ml-4 bg-gray-200";
    return (
      <div key={message._id} className={`flex mb-4 items-center`}>
        {!senderIsCurUser && (
          <AvatarImage
            style={{ height: "3rem", width: "3rem" }}
            imgURL={`http://localhost:5000/${message.sender.img}`}
          />
        )}
        <div className={`${textStyle} rounded-2xl p-4 py-2`}>
          <span>{message.message}</span>
        </div>
      </div>
    );
  });
  return <div className="h-96 px-8 py-4 overflow-y-auto">{msgOutput}</div>;
};

export default DisplayMessages;
