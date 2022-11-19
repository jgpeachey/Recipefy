import * as React from "react";
import { AppBar, Grid, Tabs, Tab } from "@mui/material/";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import SendIcon from "@mui/icons-material/Send";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HomeAppBar({ appbarToHome }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    if (!(location.pathname === "/profile")) {
      navigate("/profile");
    }
  };

  const navigateToAddRecipe = (e) => {
    e.preventDefault();
    if (!(location.pathname === "/addrecipe")) {
      navigate("/addrecipe");
    }
  };

  const navigatetoFavorites = (e) => {
    e.preventDefault();
    if (!(location.pathname === "/favorites")) {
      navigate("/favorites");
    }
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    if (!(location.pathname === "/home")) {
      navigate("/home");
    }
  };

  const logoutHome = (e) => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar color="primary" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "left",
            }}
          >
            <IconButton size="large" color="inherit" sx={{ margin: "auto" }}>
              <Avatar
                src={cookies.picture}
                sx={{
                  width: 32,
                  height: 32,
                }}
                // onMouseDown={(event) => event.stopPropagation()}
                onClick={navigateToProfile}
              />
            </IconButton>
            <IconButton size="large" color="inherit" sx={{ margin: "auto" }}>
              <PostAddOutlinedIcon
                sx={{ width: 32, height: 32 }}
                // onMouseDown={(event) => event.stopPropagation()}
                onClick={navigateToAddRecipe}
              ></PostAddOutlinedIcon>
            </IconButton>
            <IconButton size="large" color="inherit" sx={{ margin: "auto" }}>
              <FavoriteIcon
                sx={{ width: 32, height: 32 }}
                onClick={navigatetoFavorites}
              ></FavoriteIcon>
            </IconButton>
            <IconButton size="large" color="inherit" sx={{ margin: "auto" }}>
              <GroupIcon
                sx={{ width: 32, height: 32 }}
                // onClick={navigatetoFavorites}
              ></GroupIcon>
            </IconButton>
          </Box>

          <Button
            className="homeLogo"
            sx={{
              // flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              ml: 11,
            }}
            onClick={navigateToHome}
          >
            <div className="homeLogo" sx={{ flexGrow: 1 }}>
              Recipefy
            </div>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              <MenuItem>
                <Avatar
                  src={cookies.picture}
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                  onClick={navigateToProfile}
                />
              </MenuItem>
              <MenuItem>
                <PostAddOutlinedIcon
                  onClick={navigateToAddRecipe}
                ></PostAddOutlinedIcon>
              </MenuItem>
              <MenuItem>
                <FavoriteIcon onClick={navigatetoFavorites}></FavoriteIcon>
              </MenuItem>
              <MenuItem>
                <GroupIcon></GroupIcon>
              </MenuItem>
              <MenuItem>
                <Search sx={{}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onInput={(e) => {
                      appbarToHome(e.target.value);
                    }}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="contained"
                  endIcon={<LogoutIcon />}
                  onClick={logoutHome}
                  sx={{ ml: 2 }}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
            }}
          >
            <Search sx={{}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onInput={(e) => {
                  appbarToHome(e.target.value);
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={logoutHome}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // {/* </Box> */}
  );
}
