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

  const navigateToHome = (e) => {
    e.preventDefault();
    if (!(location.pathname === "/home")) {
      navigate("/home");
    }
  };

  const logoutHome = (e) => {
    removeCookie("user", { path: "/" });
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <Avatar
              src={cookies.picture}
              sx={{
                width: 24,
                height: 24,
              }}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={navigateToProfile}
            />
            <PostAddOutlinedIcon
              sx={{ ml: 5 }}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={navigateToAddRecipe}
            ></PostAddOutlinedIcon>
            <GroupIcon sx={{ ml: 5 }}></GroupIcon>
          </IconButton>

          <Button
            className="homeLogo"
            sx={{ flexGrow: 1 }}
            onClick={navigateToHome}
          >
            <div className="homeLogo" sx={{ flexGrow: 1 }}>
              Recipefy
            </div>
          </Button>

          <Search>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
