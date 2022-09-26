import { useEffect } from "react";
import SocketIOClient from "socket.io-client";

const endpoint = "http://localhost:5000";
const socket = SocketIOClient(endpoint);

const Booking = () => {
  useEffect(() => {
    socket.on("admin", (data) => {
      console.log("connected admin", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return <h1>Test</h1>;
};

export default Booking;
