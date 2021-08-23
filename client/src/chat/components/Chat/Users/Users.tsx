import React, { useContext } from "react";

import { IUsersType, IUserType } from "../../../../types/types";
import { AuthContext } from "../../../../context/authContext";

import SingleUser from "./SingleUser/SingleUser";

interface IProps {
  users: IUsersType["users"];
  setChatWithUser: (userObj: IUserType["user"]) => void;
}

const Users: React.FC<IProps> = ({ users, setChatWithUser }) => {
  const context = useContext(AuthContext);

  const displayUsers = users.map((user) => {
    const userIsCurUser = context?.curUser?._id === user._id && "(You)";
    return (
      <SingleUser
        setChatWithUser={setChatWithUser}
        user={user}
        userIsCurUser={userIsCurUser}
      />
    );
  });
  return <div className="h-md overflow-y-scroll">{displayUsers}</div>;
};

export default Users;
