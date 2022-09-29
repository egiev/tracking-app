import { useEffect } from "react";
import SocketIOClient from "socket.io-client";
import Map from "../../components/map";

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

  return <Map></Map>;
};

export default Booking;
