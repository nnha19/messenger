import React, { useState, useEffect } from "react";

import axios from "axios";
import { IUsersType, IGroups } from "../../types/types";
import { UserAngGroupContext } from "../../context/userAndGroupContext";

import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  const [users, setUsers] = useState<IUsersType["users"]>([]);
  const [groups, setGroups] = useState<IGroups["groups"]>([]);

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:5000/user");
      const { users } = resp.data;
      setUsers(users);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:5000/group");
      const group = resp.data;
      setGroups(group);
    })();
  }, []);

  return groups.length > 0 && users.length > 0 ? (
    <UserAngGroupContext.Provider
      value={{ users, groups, setUsers, setGroups }}
    >
      <div>
        <Chat />
      </div>
    </UserAngGroupContext.Provider>
  ) : null;
};

export default ChatPage;
