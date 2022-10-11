import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

import { socket } from "../../../store/socket.context";
import { AuthContext } from "../../../store/auth.context";
import TrackingMap from "../../../components/tracking/tracking-map";

// import SocketIOClient from "socket.io-client";
// const socket = SocketIOClient("/use-tracking-socket");

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [coordinates, setcoordinates] = useState([120.9796101, 14.584492]);

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

    socket.on("booking-user", (users) => setOnlineUsers(users));

    socket.on("room-messages", (messages) => {
      console.log(messages, "messages");
    });

    return () => {
      socket.off("booking-user");
    };
  }, []);

  useEffect(() => {
    console.log(onlineUsers);
    if (onlineUsers.length > 0) {
      const [user] = onlineUsers;
      const room = `${user.branch}_${user.slug}`;

      console.log(user);
      socket.emit("join-room", room);
    }
  }, [onlineUsers]);

  const onHandleSendMessage = () => {
    // const { slug, branch } = user;
    // if (!!message) {
    //   const data = {
    //     slug,
    //     branch,
    //     message,
    //   };
    //   // socket.emit("send to user", data);
    //   setMessage("");
    //   setMessages((prev) => [...prev, data]);
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "red",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: "300px",
          width: "100%",
          background: "yellow",
        }}
      >
        <Typography>Logo</Typography>

        <ul>
          <li>
            <NavLink to='/admin'>
              <DescriptionIcon />
              Home
            </NavLink>
          </li>
        </ul>
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

      <Box
        sx={{
          maxWidth: "300px",
          width: "100%",
          background: "green",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        quibusdam nihil beatae, pariatur temporibus quasi vel veniam dicta
        dolores soluta quo omnis, magni nulla quod illo sunt quis incidunt
        ducimus!
        {onlineUsers.map((user) => (
          <Typography key={user.slug}>{user.name}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
