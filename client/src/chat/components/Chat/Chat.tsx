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

  const [chatInGroup, setChatInGroup] = useState<IGroup>();

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
      <div className="shadow-md mx-24  w-80">
        <div className="flex justify-between bg-primary ">
          <ToggleHeader header="users" />
          <ToggleHeader header="groups" />
        </div>
        <hr />
        <Route
          path="/chat/users"
          render={(props) => <Users {...props} users={users} />}
        />
        <Route
          path="/chat/groups"
          render={(props) => <Groups {...props} socket={socket} />}
        />
      </div>
      {groups && groups.length > 0 && (
        <Route
          path="/chat/groups/:groupId"
          render={(props) => (
            <GroupMessenger {...props} sendMsgInGroup={sendMsgInGroupHandler} />
          )}
        />
      )}
    </div>
  );
};

export default Chat;
