import React, { useState } from "react";

import axios from "axios";
import { useUserAndGroup } from "../../../../../customHooks/userUserAndGroup";
import { useAuthContext } from "../../../../../customHooks/useAuthContext";
import { useShowModalContext } from "../../../../../customHooks/useShowModalContext";
import GroupMembers from "./GroupMembers/GroupMembers";
import { IGroup } from "../../../../../types/types";

interface IProps {
  userId: string;
  groupId: string;
  group: IGroup;
  curUserIsGroupMember: Boolean | undefined;
}

const ThreeDots: React.FC<IProps> = ({
  userId,
  groupId,
  group,
  curUserIsGroupMember,
}) => {
  const [showMembers, setShowMembers] = useState(false);
  const authContext = useAuthContext("");
  const { showModal, modalShow, hideModal } = useShowModalContext();

  const { groups, setGroups } = useUserAndGroup();
  const leaveGroupHandler = async () => {
    hideModal(null);
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

  const showMembersHandler = () => {
    setShowMembers(true);
    hideModal(null);
  };

  const hideMembersHandler = () => {
    setShowMembers(false);
  };

  return (
    <>
      <div id="three-dots" onClick={modalShow} className="relative">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>

        {showModal && (
          <div id="three-dots-modal" className="absolute w-max">
            <ul>
              <li onClick={showMembersHandler} className="three-dots-list">
                Members
              </li>
              {curUserIsGroupMember && (
                <li onClick={leaveGroupHandler} className="three-dots-list">
                  Leave Group
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {showMembers && (
        <GroupMembers
          groupMembers={group.members}
          hideMembers={hideMembersHandler}
        />
      )}
    </>
  );
};

export default ThreeDots;
