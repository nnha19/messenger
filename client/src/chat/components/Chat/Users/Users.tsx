import React, { useContext } from "react";

import { IUsersType } from "../../../../types/types";
import { AuthContext } from "../../../../context/authContext";

const Users: React.FC<IUsersType> = ({ users }) => {
  const context = useContext(AuthContext);

  const displayUsers = users.map((user) => {
    const userIsCurUser = context?.curUser?._id === user._id && "(You)";
    return (
      <div key={user._id} className="mb-2 p-4 flex cursor-pointer">
        <div>
          <img
            className="h-16 rounded-full"
            src={`http://localhost:5000/${user.img}`}
            alt=""
          />
        </div>
        <div className="ml-6 self-center">
          <h1>
            {user.username} {userIsCurUser}
          </h1>
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary block mr-2"></span>
            Active Now
          </span>
        </div>
      </div>
    );
  });
  return <div className="h-96 overflow-y-scroll">{displayUsers}</div>;
};

export default Users;
