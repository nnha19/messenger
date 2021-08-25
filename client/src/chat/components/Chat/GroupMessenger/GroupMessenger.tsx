import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/authContext";
import { IGroup } from "../../../../types/types";
import { io } from "socket.io-client";

import AvatarImage from "../../../../common/AvatarImage/AvatarImage";
import DisplayMessages from "../Messenger/DisplayMessages/DisplayMessages";
import SendMessage from "../Messenger/SendMessage/SendMessage";

function GroupMessenger(props: { group: IGroup }) {
  const [messages, setMessages] = useState<any>([]);
  const authContext = useContext(AuthContext);
  const socket = io(`http://localhost:5000`);
  const { group } = props;

  useEffect(() => {
    socket.emit("joinGroup", { user: authContext?.curUser, group });
    socket.on("message", (msg) => {
      setMessages((prev: any) => [...prev, msg]);
    });
  }, [group]);

  const sendMessageHandler = (message: string) => {
    const user = {
      user: authContext?.curUser,
      room: group.name,
    };
    socket.emit("sendMessage", { user, message });
  };

  console.log(messages);

  const activeNowMembers = group.members.filter((member) => member.activeNow);
  return (
    <div className="w-md border-2">
      <div className="px-12 py-4  flex items-center">
        <AvatarImage imgURL={`http://localhost:5000/${group.img}`} />
        <div className="ml-8">
          <h2 className="text-lg font-medium">{group.name}</h2>
          <span>{activeNowMembers.length} users Active Now</span>
        </div>
      </div>
      <hr />
      {authContext?.curUser && (
        <DisplayMessages curUser={authContext.curUser} messages={messages} />
      )}
      <hr />
      <SendMessage style={{ width: "80%" }} sendMessage={sendMessageHandler} />
    </div>
  );
}

export default GroupMessenger;