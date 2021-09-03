import React from "react";

import { IUserType } from "../../../../../types/types";

import AvatarImage from "../../../../../common/AvatarImage/AvatarImage";

interface IProps {
  user: IUserType["user"];
  userIsCurUser?: string | boolean;
  setChatWithUser?: (user: IUserType["user"]) => void;
}

const SingleUser: React.FC<IProps> = ({
  user,
  userIsCurUser,
  setChatWithUser,
}) => {
  let userActiveStyle = !user.activeNow ? "bg-gray-400" : "bg-primary";
  return (
    <div
      onClick={() => {
        setChatWithUser && setChatWithUser(user);
      }}
      className="mb-2 p-4 flex cursor-pointer"
    >
      <div>
        <AvatarImage imgURL={`http://localhost:5000/${user.img}`} />
      </div>
      <div className="ml-6 self-center">
        <h1>
          {user.username} {userIsCurUser}
        </h1>
        <span className="flex items-center">
          <span
            className={`${userActiveStyle} h-2 w-2 rounded-full  block mr-2`}
          ></span>
          {user.activeNow ? "Active Now" : "Away"}
        </span>
      </div>
    </div>
  );
};

export default SingleUser;
