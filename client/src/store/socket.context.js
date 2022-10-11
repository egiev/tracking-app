import { createContext, useState } from "react";
import SocketIOClient from "socket.io-client";

export const socket = SocketIOClient();

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const value = {
    users,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
