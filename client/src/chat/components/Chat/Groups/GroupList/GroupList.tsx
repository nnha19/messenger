import React from "react";
import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";
import { useAuthContext } from "../../../../../customHooks/useAuthContext";

import { IGroups, IGroup } from "../../../../../types/types";
import GroupType from "./GroupType/GroupType";
import ThreeAvatarImgs from "./ThreeAvatarImgs/ThreeAvatarImgs";

interface IProps {
  groups: IGroups["groups"];
  setChatInGroup(group: IGroup): void;
}

const GroupList: React.FC<IProps> = ({ groups, setChatInGroup }) => {
  const { curUser } = useAuthContext("");
  const groupListOutput = groups.map((group): JSX.Element => {
    const newMsgs = group.messages.filter((m) => m.new).length;
    return (
      <div
        key={group._id}
        onClick={() => setChatInGroup(group)}
        className="mb-4 cursor-pointer  p-2 py-4 border-2"
      >
        <div className="flex items-center">
          <AvatarImage
            style={{ alignSelf: "flex-start" }}
            imgURL={`http://localhost:5000/${group.img}`}
          />
          <div className="ml-4">
            <h4 className="font-medium text-xl mb-4">{group.name}</h4>
            <div className="flex items-center">
              {group.members.length > 0 && (
                <div className="flex mr-4">
                  <ThreeAvatarImgs group={group} />
                </div>
              )}
              <span>{group.members.length} Members</span>
            </div>
            <GroupType type={group.type} />
            {newMsgs > 0 && curUser?.groups.some((g) => g === group._id) && (
              <span className="font-bold mt-2 block">
                {newMsgs} new messages
              </span>
            )}
          </div>
        </div>
      </div>
    );
  });
  return <div className="p-4">{groupListOutput}</div>;
};

export default GroupList;
