import { useState, useEffect, useContext } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SocketIOClient from "socket.io-client";
import TrackingMap from "../../components/tracking/tracking-map";
import { AuthContext } from "../../store/auth.context";

const socket = SocketIOClient("/use-tracking-socket");

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [coordinate, setCoordinate] = useState([120.9796101, 14.584492]);

  useEffect(() => {
    const { slug } = user.branch;

    socket.on(
      `${slug}`,
      (data) => {
        console.log("connected to admin");
        if (data) {
          console.log(data);
          setCoordinate(data.coordinates);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    socket.on(`${slug} send message`, (data) => {
      console.log(data, user);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const onHandleSendMessage = () => {
    const { slug, branch } = user;
    if (!!message) {
      const data = {
        slug,
        branch,
        message,
      };

      socket.emit("send to user", data);
      setMessage("");
      setMessages((prev) => [...prev, data]);
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: {
            lg: "row",
            xs: "column",
          },
          height: "100vh",
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
                  {obj.slug === user.slug ? "You" : "User"}
                </Typography>

                <Typography sx={{ fontSize: "14px" }}>{obj.message}</Typography>
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
          <TrackingMap coordinate={coordinate} />
        </Grid>
      </Grid>
    </>
  );
};

export default Booking;
