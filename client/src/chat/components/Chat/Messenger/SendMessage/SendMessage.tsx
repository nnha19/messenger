import React, { useEffect, useState } from "react";

import { Input } from "../../../../../components/Form";
import Button from "../../../../../common/button/button";

interface IProps {
  sendMessage(message: string): void;
  style?: object;
}

const SendMessage: React.FC<IProps> = ({ sendMessage, style }) => {
  const [message, setMessage] = useState("");

  const typingMsgHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: any, message: string) => {
    e.preventDefault();
    if (message.length < 1) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="px-8 py-4">
      <form onSubmit={(e) => sendMessageHandler(e, message)} className="flex">
        <Input
          onChange={typingMsgHandler}
          type="text"
          name="message"
          value={message}
          placeholder="Type here"
          style={{ marginBottom: "0", ...style }}
        />
        <div className="flex items-start">
          <Button
            style={{
              width: "max-content",
              margin: "0",
              marginLeft: "1rem",
              padding: "0.4rem 1rem",
            }}
          >
            <i className="far fa-paper-plane self-center mr-2  "></i>
            <span>Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
