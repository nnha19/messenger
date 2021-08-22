import React, { useState } from "react";
import { IUserType } from "../../../types/userTypes";
import Groups from "./Groups/Groups";

import ToggleHeader from "./ToggleHeader/ToggleHeader";
import Users from "./Users/Users";

const Chat: React.FC<IUserType> = ({ users }) => {
  const [activeHeader, setActiveHeader] = useState("Users");

  const toggleHeaderHandler = (header: string): void => {
    setActiveHeader(header);
  };

  return (
    <div className="shadow-md w-1/5 mt-36 mx-24 pb-4">
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
  );
};

export default Chat;
