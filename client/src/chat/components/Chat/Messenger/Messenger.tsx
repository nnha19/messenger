import React, { useState } from "react";
import Button from "../../../../common/button/button";
import Input from "../../../../common/input/Input";

const Messenger = () => {
  const [message, setMessage] = useState<string>("");

  const typingMsgHandler = (e: any): void => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-96 shadow border-2">
      <div className="px-8 py-4">
        <span>Nyi Nyi</span>
      </div>
      <hr />
      <div className="h-96 px-8 py-4">Messages</div>
      <hr />
      <div className="px-8 py-4">
        <form className="flex">
          <Input
            onChange={typingMsgHandler}
            type="text"
            name="message"
            value={message}
            placeholder="Type here"
            style={{ marginBottom: "0" }}
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
    </div>
  );
};

export default Messenger;
