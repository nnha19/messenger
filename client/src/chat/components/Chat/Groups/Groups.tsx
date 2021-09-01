import React, { useContext } from "react";

import { IGroups, IGroup } from "../../../../types/types";
import { UserAngGroupContext } from "../../../../context/userAndGroupContext";

import GroupList from "./GroupList/GroupList";

interface IProps {
  setChatInGroup(group: IGroup): void;
}

const Groups: React.FC<IProps> = ({ setChatInGroup }) => {
  const groups = useContext(UserAngGroupContext).groups;
  return (
    <div className="h-md overflow-y-auto">
      <GroupList setChatInGroup={setChatInGroup} groups={groups} />
    </div>
  );
};
export default Groups;
