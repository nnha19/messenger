import React from "react";

import { IUserType } from "../../../../types/userTypes";

const Users: React.FC<IUserType> = ({ users }) => {
  const displayUsers = users.map((user) => {
    return (
      <div key={user.userId} className="mb-2 p-4 flex">
        <div>
          <img
            className="h-16 rounded-full"
            src="https://github.com/nnha19.png"
            alt=""
          />
        </div>
        <div className="ml-6 self-center">
          <h1>{user.username}</h1>
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
