import React, { useState, useEffect } from "react";

import axios from "axios";
import { IUsersType, IGroups } from "../../../types/types";
import { UserAndGroupContext } from "../../../context/userAndGroupContext";

import { useShowModalContext } from "../../../customHooks/useShowModalContext";
import Chat from "../../../chat/components/Chat/Chat";

const ChatPage = () => {
  const { hideModal } = useShowModalContext();
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

  return (
    <UserAndGroupContext.Provider
      value={{ users, groups, setUsers, setGroups }}
    >
      <div onClick={(e) => hideModal(e)}>
        <Chat />
      </div>
    </UserAndGroupContext.Provider>
  );
};

export default ChatPage;
