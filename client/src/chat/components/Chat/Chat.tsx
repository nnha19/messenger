import React, { useState } from "react";
import { IUsersType, IUserType } from "../../../types/types";
import Groups from "./Groups/Groups";
import Messenger from "./Messenger/Messenger";

import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";

const Chat: React.FC<IUsersType> = ({ users }) => {
  const [activeHeader, setActiveHeader] = useState("Users");
  const [chatWithUser, setChatWithUser] = useState<IUserType["user"]>();

  const toggleHeaderHandler = (header: string): void => {
    setActiveHeader(header);
  };

  const setChatWithUserHandler = (user: IUserType["user"]): void => {
    setChatWithUser(user);
  };

  return (
    <div className=" flex p-12 items-start">
      <div className="shadow-md w-1/5 mx-24 pb-4">
        <div className="flex justify-between bg-primary ">
          <ToggleHeader
            toggleHeader={toggleHeaderHandler}
            activeHeader={activeHeader}
            header="Users"
          />
          <ToggleHeader
            toggleHeader={toggleHeaderHandler}
            activeHeader={activeHeader}
            header="Groups"
          />
        </div>
        <hr />
        {activeHeader === "Users" ? (
          <Users setChatWithUser={setChatWithUserHandler} users={users} />
        ) : (
          <Groups />
        )}
      </div>
      {chatWithUser && <Messenger user={chatWithUser} />}
    </div>
  );
};

export default Chat;
