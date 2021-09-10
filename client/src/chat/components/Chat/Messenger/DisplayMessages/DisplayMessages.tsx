import React, { useEffect, useRef, useState } from "react";
import { IUserType, IMessages } from "../../../../../types/types";

import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";
import Message from "./Message/Message";

interface IProps {
  messages: IMessages["messages"];
  curUser: IUserType["user"];
}

const DisplayMessages: React.FC<IProps> = ({ messages, curUser }) => {
  const ref: any = useRef();

  const scrollToBottom = () => {
    const scrollHeight = ref.current.scrollHeight;
    const height = ref.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const msgOutput = messages.map((message) => {
    const senderIsCurUser = curUser._id === message.sender._id;

    return (
      <>
        <div key={message._id} className={`flex mb-4 items-center`}>
          {!senderIsCurUser && (
            <AvatarImage
              style={{ height: "3rem", width: "3rem" }}
              imgURL={`http://localhost:5000/${message.sender.img}`}
            />
          )}

          <Message
            senderIsCurUser={senderIsCurUser}
            message={message.message}
            timestamp={message.timestamp}
          />
        </div>
      </>
    );
  });
  return (
    <div ref={ref} className="h-96 px-8 py-4 overflow-y-auto">
      {msgOutput}
    </div>
  );
};

export default DisplayMessages;
