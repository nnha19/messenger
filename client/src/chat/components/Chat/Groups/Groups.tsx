import React, { useEffect, useContext } from "react";

import { IGroup, IUserType } from "../../../../types/types";
import { UserAndGroupContext } from "../../../../context/userAndGroupContext";

import GroupList from "./GroupList/GroupList";
import { useAuthContext } from "../../../../customHooks/useAuthContext";
import CreateGroup from "./CreateGroup/CreateGroup";

interface IProps {
  socket: any;
}

const Groups: React.FC<IProps> = ({ socket }) => {
  const authContext = useAuthContext("");
  const { groups, setGroups } = useContext(UserAndGroupContext);

  useEffect(() => {
    const rooms = groups.map((g) => g.name);
    socket.emit("join-group", {
      user: authContext?.curUser,
      room: rooms,
    });
  }, []);

  useEffect(() => {
    socket.on(
      "send-message",
      ({
        user,
        message,
        room,
      }: {
        user: IUserType["user"];
        message: string;
        room: string;
      }) => {
        const updateGroups = [...groups];
        const updateGroup = updateGroups.find((g) => g.name === room);
        if (!updateGroup) {
          return;
        }
        const i = updateGroups.findIndex((g) => g.name === room);
        updateGroup.messages.push({
          sender: user,
          message,
          timestamp: new Date().toString(),
          new: !groups.find((g) => g.name === room)?.openedChat,
        });
        updateGroups[i] = updateGroup;
        setGroups(updateGroups);
      }
    );
  }, []);

  return (
    <div className=" bg-white ">
      <div className=" overflow-y-auto h-md">
        <GroupList groups={groups} />
      </div>
      <CreateGroup />
    </div>
  );
};
export default Groups;
