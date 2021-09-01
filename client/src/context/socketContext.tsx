import React, { createContext, useEffect } from "react";
let socket: any;
export const socketContext = createContext(socket);

interface ISocket {
  children: React.ReactNode;
  value: any;
}

const SocketContext = ({ children, value }: ISocket) => {
  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};
export default SocketContext;
