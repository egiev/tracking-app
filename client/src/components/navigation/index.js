import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [{ path: "/", label: "Home" }];

const Navigation = () => {
  const { palette } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const isHomePage = () => {
    return location.pathname === "/";
  };

  return (
    <AppBar
      sx={{
        position: {
          md: isHomePage() ? "fixed" : "relative",
          xs: "relative",
        },
        color: {
          md: scrollY < 100 && isHomePage() ? "#fff" : palette.gray["500"],
          xs: palette.gray["500"],
        },
        backgroundColor: {
          md: scrollY < 100 && isHomePage() ? "transparent" : "#fff",
          xs: "#fff",
        },
        boxShadow: "none",
        transition: "all .3s ease",
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Akyat Pinas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`${page.path}`)}
                sx={{
                  my: 2,
                  color:
                    scrollY < 100 && isHomePage()
                      ? "#fff"
                      : palette.gray["500"],
                  display: "block",
                }}
              >
                {page.label}
              </Button>
            ))}

            <Button
              onClick={() => navigate("/start-journey")}
              sx={{
                my: 2,
                color:
                  scrollY < 100 && isHomePage() ? "#fff" : palette.gray["500"],
                display: "block",
              }}
            >
              Start Journey
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
