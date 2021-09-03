import React, { useState, useEffect, useContext } from "react";

import { IUserType } from "../../../../types/types";
import { io } from "socket.io-client";
import { AuthContext } from "../../../../context/authContext";

import SingleUser from "../Users/SingleUser/SingleUser";
import DisplayMessages from "./DisplayMessages/DisplayMessages";
import SendMessage from "./SendMessage/SendMessage";

const Messenger = (props: {
  user: IUserType["user"];
  hideChatWithUser: () => void;
}) => {
  const authContext = useContext(AuthContext);
  const curUser = authContext?.curUser;
  const { user, hideChatWithUser } = props;
  const [messages, setMessages] = useState<any[]>([]);

  const socket = io(`http://localhost:5000`);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessageHandler = (message: string) => {
    socket.emit("send-message", user._id, message);
    socket.on("receive-message", (receiverId, message) => {
      console.log(receiverId);
      console.log(message);
    });
    console.log(message);
  };

  return curUser ? (
    <div className="w-96 shadow border-2 relative">
      <i
        onClick={hideChatWithUser}
        style={{ top: "-2rem", right: "-1rem" }}
        className="fas fa-times-circle absolute text-3xl text-primary cursor-pointer"
      ></i>
      <SingleUser user={user} />
      <hr />
      <DisplayMessages curUser={curUser} messages={messages} />
      <hr />
      <SendMessage sendMessage={sendMessageHandler} />
    </div>
  ) : null;
};

export default Messenger;
