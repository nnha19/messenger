import React, { useState, useEffect, useContext } from "react";

import { IUserType } from "../../../../types/types";
import { io } from "socket.io-client";
import { AuthContext } from "../../../../context/authContext";

import Button from "../../../../common/button/button";
import Input from "../../../../common/input/Input";
import SingleUser from "../Users/SingleUser/SingleUser";
import { Socket } from "dgram";

const Messenger = (props: {
  user: IUserType["user"];
  hideChatWithUser: () => void;
}) => {
  const authContext = useContext(AuthContext);
  const curUser = authContext?.curUser;
  const { user, hideChatWithUser } = props;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const socket = io(`http://localhost:5000`);

  useEffect(() => {
    socket.emit("joinRoom", {
      room: "user-room",
      username: curUser?.username,
      userId: curUser?._id,
    });
  }, [curUser]);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log(msg);
    });
  }, []);

  const typingMsgHandler = (e: any): void => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e: any) => {
    e.preventDefault();
    const userId = curUser?._id;
    const username = curUser?.username;
    socket.emit("deliverMessage", { username, userId, message });
  };

  return (
    <div className="w-96 shadow border-2 relative">
      <i
        onClick={hideChatWithUser}
        style={{ top: "-2rem", right: "-1rem" }}
        className="fas fa-times-circle absolute text-3xl text-primary cursor-pointer"
      ></i>
      <SingleUser user={user} />
      <hr />
      <div className="h-96 px-8 py-4">Messages</div>
      <hr />
      <div className="px-8 py-4">
        <form onSubmit={sendMessageHandler} className="flex">
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
