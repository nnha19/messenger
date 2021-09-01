import React, { useEffect, useState, useContext } from "react";
import { UserAngGroupContext } from "../../../context/userAndGroupContext";
import { IUserType, IGroup } from "../../../types/types";
import { io } from "socket.io-client";

import GroupMessenger from "./GroupMessenger/GroupMessenger";
import Groups from "./Groups/Groups";
import Messenger from "./Messenger/Messenger";
import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";
import { AuthContext } from "../../../context/authContext";
import { setgroups } from "process";

let socket: any;

const Chat = () => {
  const authContext = useContext(AuthContext);

  const { users, groups, setGroups, setUsers } =
    useContext(UserAngGroupContext);
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
    socket.emit("send-message", {
      user: authContext?.curUser,
      message,
      room: groups[0].name,
    });
  };

  useEffect(() => {
    socket = io(`http://localhost:5000`);
    if (groups.length > 0) {
      socket.emit("join-group", {
        user: authContext?.curUser,
        room: groups[0].name,
      });
    }
    socket.on("send-message", ({ user, message, room }) => {
      const updateGroups = [...groups];
      const updateGroup = updateGroups.find((g) => g.name === room);
      const i = updateGroups.findIndex((g) => g.name === room);
      updateGroup.messages.push({ sender: user, message });
      updateGroups[i] = updateGroup;
      setGroups(updateGroups);
    });
  }, []);

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
