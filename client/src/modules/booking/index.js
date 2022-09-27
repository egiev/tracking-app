import { useEffect } from "react";
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("");

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

  return <h1>Testsss</h1>;
};

export default Booking;
