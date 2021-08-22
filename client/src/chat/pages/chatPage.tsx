import React, { useState, useEffect } from "react";

import { IUserType } from "../../types/userTypes";

import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  const [users, setUsers] = useState<IUserType["users"]>([]);

  useEffect(() => {
    setUsers([
      { username: "Nyi Nyi", email: "nyinyi@gmail.com", userId: "1" },
      {
        username: "Myat Hsu Ko Ko",
        email: "myathsukoko@gmail.com",
        userId: "2",
      },
      { username: "Nan Khin", email: "nankhin@gmail.com", userId: "3" },
      {
        username: "Aung Kaung Khant",
        email: "aungkaungkhant@gmail.com",
        userId: "4",
      },
    ]);
  }, []);

  return (
    <div>
      <Chat users={users} />
    </div>
  );
};

export default ChatPage;
