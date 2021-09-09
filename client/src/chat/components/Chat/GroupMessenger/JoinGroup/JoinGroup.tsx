import React, { useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../../../../../customHooks/useAuthContext";
import { UserAndGroupContext } from "../../../../../context/userAndGroupContext";
import Button from "../../../../../common/button/button";

interface IProps {
  userId: string;
  groupId: string;
}

const JoinGroup: React.FC<IProps> = ({ userId, groupId }) => {
  const userAndGroupContext = useContext(UserAndGroupContext);
  const authContext = useAuthContext("");
  const joinGroupHandler = async () => {
    try {
      const resp = await axios({
        url: `http://localhost:5000/group/member`,
        method: "POST",
        data: {
          userId,
          groupId,
        },
      });

      if (authContext.curUser) {
        const curUser = { ...authContext.curUser };
        curUser.groups.push(groupId);
        authContext.setCurUser(curUser);
        const groups = [...userAndGroupContext.groups];
        const joinedGroup = groups.find((g) => g._id === groupId);
        if (!joinedGroup) {
          return;
        }
        const i = groups.findIndex((g) => g._id === groupId);
        joinedGroup.members.push(authContext.curUser);
        groups[i] = joinedGroup;
        userAndGroupContext.setGroups(groups);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <Button clicked={joinGroupHandler}>Join Group</Button>;
};

export default JoinGroup;
