import { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Navigation from "../../components/navigation";
import TrackingMap from "../../components/tracking/tracking-map";
import VerifyTrackingCode from "../../components/tracking/tracking-verify-form";

import SocketIOClient from "socket.io-client";
const socket = SocketIOClient("/use-tracking-socket");

const Tracking = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log("receive", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive message");
    };
  }, []);

  const startTracking = async () => {
    if (navigator && user) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const { name, branch } = user;

          socket.emit("join server", {
            name,
            branch,
            coordinates: [longitude, latitude],
          });

          setIsJourneyStarted(true);
          setCoordinates([longitude, latitude]);
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
            type='button'
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

  const onHandleSendMessage = () => {
    const { slug, branch } = user;

    if (!!message) {
      const data = {
        slug,
        branch,
        message,
      };

      socket.emit("send message", data);

      setMessage("");
      setMessages((prev) => [...prev, data]);
    }
  };

  const renderComponent = () => {
    if (isJourneyStarted) {
      return (
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              xs: "column",
            },
            height: "calc(100vh - 68px)",
          }}
        >
          <Grid
            item
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { lg: "100%", xs: "300px" },
              background: "white",
              p: {
                xs: 2,
                lg: 4,
              },
            }}
            order={{ lg: 1, xs: 2 }}
          >
            <Typography sx={{ fontSize: "16px" }}>Messages</Typography>

            <Box
              sx={{
                display: "flex",
                height: "calc(100% - 56px)",
                overflowY: "auto",
                flexDirection: "column",
                mb: 4,
              }}
            >
              {messages.map((obj, i) => (
                <Box
                  key={`message-${i}`}
                  sx={{
                    textAlign: obj.slug === user.slug ? "right" : "left",
                    p: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    {obj.slug === user.slug ? "You" : "Admin"}
                  </Typography>

                  <Typography sx={{ fontSize: "14px" }}>
                    {obj.message}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex" }}>
              <TextField
                required
                label='Message'
                placeholder='Message admin'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ width: "100%", mr: 1 }}
              />

              <Button
                variant='contained'
                endIcon={<SendIcon />}
                onClick={onHandleSendMessage}
              >
                Send
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            lg={9}
            order={{ lg: 2, xs: 1 }}
            sx={{ display: "flex", flexGrow: 1 }}
          >
            <TrackingMap coordinates={coordinates} />
          </Grid>
        </Grid>
      );
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
