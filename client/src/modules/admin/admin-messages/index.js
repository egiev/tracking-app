import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";

import { socket } from "../../../store/socket.context";
import { AuthContext } from "../../../store/auth.context";
import TrackingMap from "../../../components/tracking/tracking-map";
import Layout from "../../../components/ui/layout/layout";
import SendIcon from "@mui/icons-material/Send";

const AdminMessages = () => {
  const { palette } = useTheme();
  const { user } = useContext(AuthContext);
  const [coordinates, setcoordinates] = useState([120.9796101, 14.584492]);

  const [currentRoom, setCurrentRoom] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [privateMessage, setPrivateMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isShowMessage, setIsShowMessage] = useState(true);

  useEffect(() => {
    // socket.on(
    //   `${slug}`,
    //   (data) => {
    //     if (data) setcoordinates(data.coordinates);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // socket.on(`${slug} send message`, (data) => {
    //   setMessages((prev) => [...prev, data]);
    // });
    // return () => {
    //   socket.off("connect");
    //   socket.off("disconnect");
    // };

    socket.emit("online-users", user.branch.slug);

    socket.on("booking-user", (users) => setOnlineUsers(users));

    socket.on("room-messages", (messages) => setMessages(messages));

    return () => {
      socket.off("booking-user");
      socket.off("room-messages");
    };
  }, []);

  const joinRoom = (room) => {
    // setCurrentRoom
    setCurrentRoom(room);
    socket.emit("join-room", room, currentRoom);
  };

  // useEffect(() => {
  //   console.log(onlineUsers);
  //   if (onlineUsers.length > 0) {
  //     const [user] = onlineUsers;
  //     const room = `${user.branch}_${user.slug}`;

  //     console.log(user);
  //     socket.emit("join-room", room);
  //   }
  // }, [onlineUsers]);

  const onHandleSendMessage = () => {
    const { slug, branch } = privateMessage;

    console.log(moment().toNow());

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

  console.log(messages, "user");

  return (
    <Layout>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "auto",
            background: "white",
          }}
        >
          <Box
            sx={{
              width: "320px",
              py: 4,
              px: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                mb: 4,
              }}
            >
              Messages
            </Typography>

            {onlineUsers.map((user) => (
              <Box
                key={user.slug}
                component="a"
                onClick={() => {
                  // setIsShowMessage(!isShowMessage);
                  setPrivateMessage(user);
                  joinRoom(`${user.branch}_${user.slug}`);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 2,
                  height: "60px",
                  borderRadius: 0.5,
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Box
                    alt="avatar"
                    component="img"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    sx={{
                      height: "60px",
                      width: "60px",
                      overflow: "hidden",
                      borderRadius: "40px",
                      objectFit: "cover",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      background: "green",
                      bottom: "10px",
                      right: "4px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                <Box>
                  <Typography>{user.name}</Typography>
                  <Typography>{user.contact}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              width: isShowMessage ? "300px" : "0px",
              transition: "all .3s ease",
              py: 4,
              px: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                mb: 4,
              }}
            >
              Chat with {privateMessage && privateMessage.name}
            </Typography>

            <Box
              sx={{
                maxHeight: "calc(100% - 150px)",
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
                            {msg.from.slug === user.slug
                              ? "You"
                              : msg.from.name}
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
                            width: "fit-content",
                            marginLeft: msg.from.slug === user.slug && "auto",
                            maxWidth: "80%",
                            width: "fit-content",
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

            <Box sx={{ display: "flex", mt: 4 }}>
              <TextField
                required
                label="Message"
                size="small"
                placeholder="Message "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ width: "100%", mr: 1 }}
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={onHandleSendMessage}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            background: "white",
            p: 4,
          }}
        >
          <TrackingMap coordinates={coordinates} />
        </Box>
      </Box>
    </Layout>
  );
};

export default AdminMessages;
