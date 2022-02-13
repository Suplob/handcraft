import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../../../hooks/useAuth";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navbar, setNavbar] = React.useState(false);
  const history = useHistory();
  const { user, handleLogOut } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 70) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  });

  const activeNavbarStyle = {
    backgroundColor: "#e7e7e7",
    color: "black",
  };

  const inactiveNavbarStyle = {
    color: "white",
    backgroundColor: "transparent",
  };

  const activeColor = {
    color: "black",
  };

  const inactiveColor = {
    color: "white",
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          style={navbar ? activeNavbarStyle : inactiveNavbarStyle}
          sx={{ boxShadow: 0 }}
        >
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex", cursor: "pointer" },
                }}
                onClick={() => history.push("/")}
              >
                HandCraft
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon></MenuIcon>
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => history.push("/")}
                    >
                      Home
                    </Typography>
                  </MenuItem>
                  {user.email ? (
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => history.push("/allProducts")}
                        >
                          All Products
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => history.push("/dashboard")}
                        >
                          Dashboard
                        </Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => history.push("/login")}
                        >
                          Login
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => history.push("/register")}
                        >
                          Register
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                onClick={() => history.push("/")}
              >
                HandCraft
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => history.push("/")}
                  sx={{ my: 2, display: "block" }}
                  style={navbar ? activeColor : inactiveColor}
                >
                  Home
                </Button>
                {user.email ? (
                  <>
                    <Button
                      sx={{ my: 2, display: "block" }}
                      onClick={() => history.push("/allProducts")}
                      style={navbar ? activeColor : inactiveColor}
                    >
                      All Products
                    </Button>
                    <Button
                      sx={{ my: 2, display: "block" }}
                      onClick={() => history.push("/dashboard")}
                      style={navbar ? activeColor : inactiveColor}
                    >
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => history.push("/login")}
                      sx={{ my: 2, display: "block" }}
                      style={navbar ? activeColor : inactiveColor}
                    >
                      Login
                    </Button>
                    <Button
                      sx={{ my: 2, display: "block" }}
                      onClick={() => history.push("/register")}
                      style={navbar ? activeColor : inactiveColor}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>

              {user.email && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogOut}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
