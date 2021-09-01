import React, { useState } from "react";
import { IUsersType, IUserType, IGroup } from "../../../types/types";

import GroupMessenger from "./GroupMessenger/GroupMessenger";
import Groups from "./Groups/Groups";
import Messenger from "./Messenger/Messenger";
import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";

const Chat: React.FC<IUsersType> = ({ users }) => {
  const [activeHeader, setActiveHeader] = useState("Users");
  const [chatWithUser, setChatWithUser] = useState<IUserType["user"]>();
  const [chatInGroup, setChatInGroup] = useState<IGroup>();

  const toggleHeaderHandler = (header: string): void => {
    setActiveHeader(header);
  };

  const setChatWithUserHandler = (user: IUserType["user"]): void => {
    setChatWithUser(user);
    setChatInGroup(undefined);
  };

  const setChatInGroupHandler = (group: IGroup): void => {
    setChatInGroup(group);
    setChatWithUser(undefined);
  };

  const sendMsgInGroupHandler = (
    message: string,
    sender: IUserType["user"]
  ): void => {
    const updateGroup: any = { ...chatInGroup };
    updateGroup.messages?.push({ sender, message });
    setChatInGroup(updateGroup);
  };

  return (
    <div className=" flex p-12 items-start">
      <div className="shadow-md mx-24 pb-4 w-80">
        <div className="flex justify-between bg-primary ">
          <ToggleHeader
            toggleHeader={toggleHeaderHandler}
            activeHeader={activeHeader}
            header="Users"
          />
          <ToggleHeader
            toggleHeader={toggleHeaderHandler}
            activeHeader={activeHeader}
            header="Groups"
          />
        </div>
        <hr />
        {activeHeader === "Users" ? (
          <Users setChatWithUser={setChatWithUserHandler} users={users} />
        ) : (
          <Groups setChatInGroup={setChatInGroupHandler} />
        )}
      </div>
      {chatWithUser && (
        <Messenger
          hideChatWithUser={() => setChatWithUser(undefined)}
          user={chatWithUser}
        />
      )}
      {chatInGroup && (
        <GroupMessenger
          sendMsgInGroup={sendMsgInGroupHandler}
          group={chatInGroup}
        />
      )}
    </div>
  );
};

export default Chat;
