import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";

import TrackingMap from "../../components/tracking/tracking-map";

const socket = SocketIOClient("");

const Booking = () => {
  const [coordinate, setCoordinate] = useState([120.9796101, 14.584492]);

  useEffect(() => {
    socket.on("admin", (data) => {
      if (data) {
        console.log(data);
        setCoordinate(data.coordinates);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <TrackingMap coordinate={coordinate} />
    </>
  );
};

export default Booking;
