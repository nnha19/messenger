import React, { useEffect, useState, useContext } from "react";
import { UserAndGroupContext } from "../../../context/userAndGroupContext";
import { IUserType, IGroup } from "../../../types/types";
import { io } from "socket.io-client";

import GroupMessenger from "./GroupMessenger/GroupMessenger";
import Groups from "./Groups/Groups";
import Messenger from "./Messenger/Messenger";
import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";
import { AuthContext } from "../../../context/authContext";

let socket: any;

const Chat = () => {
  const { users, setUsers, groups, setGroups } =
    useContext(UserAndGroupContext);
  const authContext = useContext(AuthContext);

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
    sender: IUserType["user"],
    room: string
  ): void => {
    socket.emit("send-message", {
      user: authContext?.curUser,
      message,
      room,
    });
  };

  useEffect(() => {
    socket = io(`http://localhost:5000`);
    socket.emit("joined", authContext?.curUser?._id);
  }, []);

  useEffect(() => {
    socket.on("joined", (userId: string) => {
      //update active now user
      const updateUsers = [...users];
      const user = updateUsers.find((u) => u._id === userId);
      if (!user) {
        return;
      }
      user.activeNow = true;
      const i = users.findIndex((u) => u._id === userId);
      updateUsers[i] = user;
      setUsers(updateUsers);
    });
  }, [users, setUsers]);

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
          <Users users={users} setChatWithUser={setChatWithUserHandler} />
        ) : (
          <Groups socket={socket} setChatInGroup={setChatInGroupHandler} />
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
