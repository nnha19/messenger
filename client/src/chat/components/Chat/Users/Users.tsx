import React, { useContext } from "react";

import { IUserType, IUsersType } from "../../../../types/types";
import { AuthContext } from "../../../../context/authContext";

import SingleUser from "./SingleUser/SingleUser";

interface IProps {
  setChatWithUser?: (userObj: IUserType["user"]) => void;
  users: IUsersType["users"];
}

const Users: React.FC<IProps> = ({ setChatWithUser, users }) => {
  const context = useContext(AuthContext);
  const displayUsers = users.map((user: IUserType["user"]) => {
    const userIsCurUser = context?.curUser?._id === user._id && "(You)";
    return (
      <SingleUser
        key={user._id}
        setChatWithUser={setChatWithUser}
        user={user}
        userIsCurUser={userIsCurUser}
      />
    );
  });
  return <div className="h-md overflow-y-auto">{displayUsers}</div>;
};

export default Users;
