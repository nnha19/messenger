import React, { useState, useEffect } from "react";

import axios from "axios";
import { IUsersType } from "../../types/types";

import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  const [users, setUsers] = useState<IUsersType["users"]>([]);

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
