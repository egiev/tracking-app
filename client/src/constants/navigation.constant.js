import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export const NAVIGATION_LINKS = [
  {
    path: "/admin/dashboard",
    Icon: (props) => {
      console.log("test", props);
      return <DashboardOutlinedIcon {...props} />;
    },
  },
  {
    path: "/admin/bookings",
    Icon: (props) => <BookmarksOutlinedIcon {...props} />,
  },
  {
    path: "/admin/messages",
    Icon: (props) => <ChatBubbleOutlineOutlinedIcon {...props} />,
  },
];
