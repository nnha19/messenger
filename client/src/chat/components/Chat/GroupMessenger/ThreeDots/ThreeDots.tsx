import React from "react";

import axios from "axios";
import { useUserAndGroup } from "../../../../../customHooks/userUserAndGroup";
import { useAuthContext } from "../../../../../customHooks/useAuthContext";

interface IProps {
  userId: string;
  groupId: string;
}

const ThreeDots: React.FC<IProps> = ({ userId, groupId }) => {
  const authContext = useAuthContext("");

  const { users, setUsers, groups, setGroups } = useUserAndGroup();
  const leaveGroupHandler = async () => {
    try {
      const resp = await axios({
        method: "PUT",
        url: "http://localhost:5000/group/member",
        data: {
          userId,
          groupId,
        },
      });
      if (resp.status !== 200) return;

      //delete group in a user
      const { curUser, setCurUser } = authContext;
      const updatedGroup = curUser?.groups.filter((group) => group !== groupId);
      if (!curUser || !updatedGroup) return;
      curUser.groups = updatedGroup;
      setCurUser(curUser);

      //delete user in a group
      const clonedGroups = [...groups];
      const group = clonedGroups.find((group) => group._id === groupId);
      if (!group) return;
      const updatedMember = group.members.filter((user) => user._id !== userId);
      group.members = updatedMember;
      const groupIndex = clonedGroups.findIndex((g) => g._id === groupId);
      clonedGroups[groupIndex] = group;
      setGroups(clonedGroups);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <span className="block h-1 w-1 mb-1 bg-black rounded-full"></span>
      <span className="block h-1 w-1 mb-1 bg-black rounded-full"></span>
      <span className="block h-1 w-1 mb-1 bg-black rounded-full"></span>
      <div className="absolute w-max   ">
        <ul>
          <li className="three-dots-list">Members</li>
          <li onClick={leaveGroupHandler} className="three-dots-list">
            Leave Group
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ThreeDots;
