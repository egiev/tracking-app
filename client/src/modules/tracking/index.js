import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

import { socket } from "../../store/socket.context";
import Navigation from "../../components/navigation";
import TrackingMap from "../../components/tracking/tracking-map";
import VerifyTrackingCode from "../../components/tracking/tracking-verify-form";

const Tracking = () => {
  const { palette } = useTheme();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    // socket.on("receive message", (data) => {
    //   console.log("receive", data);
    //   setMessages((prev) => [...prev, data]);
    // });
    // return () => {
    //   socket.off("receive message");
    // };
    // const u = {
    //   _id: "6343d0e2d4ad43fc223a81b0",
    //   slug: "8303ccbd-9920-43ca-a337-c7a91d439320",
    //   branch: "14580e3e-c417-46eb-8ff4-baaa3bc6a04c",
    //   name: "jonathan",
    //   email: "reginald.mabanta@gmail.com",
    //   contact: "099999999",
    //   companions: 4,
    //   date_of_departure: "09/24/2022",
    //   status: "approve",
    //   is_online: true,
    //   code: "eNKoEa0ths",
    //   created_at:
    //     "Mon Oct 10 2022 07:59:30 GMT+0000 (Coordinated Universal Time)",
    //   __v: 0,
    // };
    // setUser(u);

    socket.on("room-messages", (messages) => setMessages(messages));

    return () => socket.off("room-messages");
  }, []);

  useEffect(() => {
    if (user) {
      const roomId = `${user.branch}_${user.slug}`;

      socket.emit("join-room", roomId);
      socket.emit("join-tracking-room", user.branch);
      socket.emit("booking-user", user);
    }
  }, [user]);

  const startTracking = async () => {
    if (navigator && user) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          socket.emit("tracking-room", user, [longitude, latitude]);

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
            type="button"
            variant="contained"
            size="large"
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
        room: `${branch}_${slug}`,
        content: message,
        sender: user,
        date: moment().format("MM/DD/YYYY"),
        time: moment().format("hh:mm"),
      };

      socket.emit("message-room", data);

      setMessage("");
      // setMessages((prev) => [...prev, data]);
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
                maxHeight: "calc(100% - 56px)",
                overflow: "auto",
                mb: 2,
              }}
            >
              {messages.map((message, idx) => (
                <Box key={idx}>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {moment().format("MM/DD/YYYY") === message._id
                      ? "TODAY"
                      : message._id}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 3,
                    }}
                  >
                    {message.messagesByDate.map((msg) => (
                      <Box
                        key={msg._id}
                        sx={{
                          alignSelf:
                            msg.from.slug === user.slug
                              ? "flex-end"
                              : "flex-start",
                          textAlign:
                            msg.from.slug === user.slug ? "right" : "left",
                          marginBottom: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              msg.from.slug === user.slug
                                ? "flex-end"
                                : "flex-start",
                            columnGap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              order: msg.from.slug === user.slug ? 2 : 1,
                            }}
                          >
                            {msg.from.slug === user.slug ? "You" : "Admin"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#8d8d8d",
                              order: msg.from.slug === user.slug ? 1 : 2,
                            }}
                          >
                            {msg.time}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "14px",
                            background:
                              msg.from.slug === user.slug
                                ? palette.primary.main
                                : "#f0f0f0",
                            color:
                              msg.from.slug === user.slug ? "white" : "inherit",
                            borderRadius:
                              msg.from.slug === user.slug
                                ? "15px 0px 20px 15px"
                                : "0px 15px 15px 20px",
                            py: 1,
                            px: 1.5,
                            textAlign: "left",
                            marginLeft: msg.from.slug === user.slug && "auto",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {msg.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex" }}>
              <TextField
                required
                label="Message"
                placeholder="Message admin"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ width: "100%", mr: 1 }}
              />

              <Button
                variant="contained"
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
