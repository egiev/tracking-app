import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import SocketIOClient from "socket.io-client";

import Navigation from "../../components/navigation";
import TrackingMap from "../../components/tracking/tracking-map";
import VerifyTrackingCode from "../../components/tracking/tracking-verify-form";

import Map from "../../components/map";
const socket = SocketIOClient("");

const Tracking = () => {
  // const [code, setCode] = useState();
  const [user, setUser] = useState(null);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [coordinate, setCoordinate] = useState([]);

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

          socket.emit("tracking", {
            user: user.slug,
            coordinates: [longitude, latitude],
          });

          setIsJourneyStarted(true);
          setCoordinate([longitude, latitude]);

          console.log("successful");
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  };

  const renderAction = () => {
    if (user) {
      return (
        <Box sx={{ maxWidth: "320px" }}>
          <Button
            variant='contained'
            size='large'
            sx={{ mt: 3, height: "50px", width: "100%" }}
            onClick={startTracking}
          >
            Start Journey
          </Button>
        </Box>
      );
    }

    return (
      <VerifyTrackingCode startTracking={startTracking} setUser={setUser} />
    );
  };

  const renderComponent = () => {
    if (isJourneyStarted) {
      return <TrackingMap coordinate={coordinate} />;
    }

    return (
      <Box sx={{ height: "calc(100vh - 70px)", background: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {renderAction()}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Navigation />

      {renderComponent()}
    </>
  );
};

export default Tracking;
