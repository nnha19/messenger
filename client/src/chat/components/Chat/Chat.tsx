import React, { useEffect, useState, useContext } from "react";
import { UserAndGroupContext } from "../../../context/userAndGroupContext";
import { IUserType, IGroup } from "../../../types/types";
import { io } from "socket.io-client";
import { Route } from "react-router-dom";

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

  const [chatWithUser, setChatWithUser] = useState<IUserType["user"]>();
  const [chatInGroup, setChatInGroup] = useState<IGroup>();

  const setChatWithUserHandler = (user: IUserType["user"]): void => {
    setChatWithUser(user);
    const clonedGroups = [...groups];
    const updatedGroups = clonedGroups.map((g) => ({
      ...g,
      openedChat: false,
    }));
    setGroups(updatedGroups);
    setChatInGroup(undefined);
  };

  const setChatInGroupHandler = (group: IGroup): void => {
    setChatInGroup(group);
    const clonedGroups = [...groups];
    clonedGroups.forEach((g) => (g.openedChat = false));
    const groupIndex = clonedGroups.findIndex((g) => g._id === group._id);
    clonedGroups[groupIndex].openedChat = true;
    setGroups(clonedGroups);
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

  useEffect(() => {
    //Clear unread messages
    if (!chatInGroup) return;
    const clonedGroups = [...groups];
    const index = clonedGroups.findIndex((g) => g._id === chatInGroup._id);
    clonedGroups[index].messages.forEach((m) => (m.new = false));
    setGroups(clonedGroups);
  }, [chatInGroup]);

  return (
    <div className=" flex p-12 items-start">
      <div className="shadow-md mx-24  w-80">
        <div className="flex justify-between bg-primary ">
          <ToggleHeader header="users" />
          <ToggleHeader header="groups" />
        </div>
        <hr />
        <Route
          path="/chat/users"
          render={(props) => (
            <Users
              {...props}
              users={users}
              setChatWithUser={setChatWithUserHandler}
            />
          )}
        />
        <Route
          path="/chat/groups"
          render={(props) => (
            <Groups
              {...props}
              chatInGroup={chatInGroup}
              socket={socket}
              setChatInGroup={setChatInGroupHandler}
            />
          )}
        />
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
