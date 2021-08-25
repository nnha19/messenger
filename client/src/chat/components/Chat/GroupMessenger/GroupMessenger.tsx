import React, { useState, useContext } from "react";
import AvatarImage from "../../../../common/AvatarImage/AvatarImage";
import { AuthContext } from "../../../../context/authContext";

import { IGroup } from "../../../../types/types";
import DisplayMessages from "../Messenger/DisplayMessages/DisplayMessages";
import SendMessage from "../Messenger/SendMessage/SendMessage";

function GroupMessenger(props: { group: IGroup }) {
  const [messages, setMessages] = useState([]);
  const authContext = useContext(AuthContext);

  const { group } = props;
  const sendMessageHandler = (message: string) => {
    console.log(message);
  };

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
