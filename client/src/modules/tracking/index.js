import { useState } from "react";
import { useEffect } from "react";
import SocketIOClient from "socket.io-client";

import { StartJourney } from "../../services/booking.service";
const socket = SocketIOClient("");

const Tracking = () => {
  const [code, setCode] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const startTracking = () => {
    if (navigator && user) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          console.log("test");

          socket.emit("tracking", {
            user: user.slug,
            coordinates: [longitude, latitude],
          });
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  };

  const verifyCode = async () => {
    try {
      const { data } = await StartJourney({ code });

      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>Test</p>
      <input type='text' onChange={(e) => setCode(e.target.value)} />
      <button type='button' onClick={verifyCode}>
        Verify Code
      </button>

      <button type='button' onClick={startTracking}>
        Start
      </button>
    </div>
  );
};

export default Tracking;
