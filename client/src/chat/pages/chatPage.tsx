import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { IUserType } from "../../types/userTypes";

import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  const [users, setUsers] = useState<IUserType["users"]>([]);

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:5000/user");
      const { users } = resp.data;
      setUsers(users);
    })();
  }, []);

  return (
    <div>
      <Chat users={users} />
    </div>
  );
};

export default ChatPage;
