import { useNavigate } from "react-router-dom";

import { Box, IconButton, useTheme } from "@mui/material";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LandscapeIcon from "@mui/icons-material/Landscape";
import {
  NAVIGATION,
  NAVIGATION_LINKS,
} from "../../../constants/navigation.constant";
import { Component } from "react";

export const Layout = ({ children }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 6,
          maxWidth: "80px",
          width: "80px",
          background: "white",
          borderRight: "1px solid rgb(0 0 0 / 10%);",
        }}
      >
        <LandscapeIcon
          sx={{
            color: palette.primary.main,
            fontSize: 40,
            mb: 6,
          }}
        />

        {NAVIGATION_LINKS.map(({ path, Icon }, idx) => (
          <IconButton
            key={idx}
            sx={{
              my: 1,
            }}
            onClick={() => navigate(path)}
          >
            <Icon
              sx={{
                fontSize: 18,
                color: palette.gray["500"],
              }}
            />
          </IconButton>
        ))}
      </Box>

      <Box
        sx={{
          paddingLeft: "80px",
          minHeight: "100%",
          height: "auto",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
