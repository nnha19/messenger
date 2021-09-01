import React, { useEffect, useContext } from "react";

import { IGroup, IUserType } from "../../../../types/types";
import { UserAngGroupContext } from "../../../../context/userAndGroupContext";
import { AuthContext } from "../../../../context/authContext";

import GroupList from "./GroupList/GroupList";

interface IProps {
  setChatInGroup(group: IGroup): void;
  socket: any;
}

const Groups: React.FC<IProps> = ({ setChatInGroup, socket }) => {
  const authContext = useContext(AuthContext);
  const { groups, setGroups } = useContext(UserAngGroupContext);

  useEffect(() => {
    const rooms = groups.map((g: IGroup) => g.name);
    socket.emit("join-group", {
      user: authContext?.curUser,
      room: rooms,
    });
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
        const i = updateGroups.findIndex((g) => g.name === room);
        updateGroup.messages.push({ sender: user, message });
        updateGroups[i] = updateGroup;
        setGroups(updateGroups);
      }
    );
  }, []);

  return (
    <div className="h-md overflow-y-auto">
      <GroupList setChatInGroup={setChatInGroup} groups={groups} />
    </div>
  );
};
export default Groups;
