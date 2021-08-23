import React, { useState } from "react";
import { IUsersType } from "../../../types/types";
import Groups from "./Groups/Groups";
import Messenger from "./Messenger/Messenger";

import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";

const Chat: React.FC<IUsersType> = ({ users }) => {
  const [activeHeader, setActiveHeader] = useState("Users");

  const toggleHeaderHandler = (header: string): void => {
    setActiveHeader(header);
  };

  return (
    <div className=" flex p-12">
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
        {activeHeader === "Users" ? <Users users={users} /> : <Groups />}
      </div>
      <Messenger />
    </div>
  );
};

export default Chat;
