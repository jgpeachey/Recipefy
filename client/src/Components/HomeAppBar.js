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

export default function HomeAppBar() {
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

  const SearchBar = ({ setSearchQuery }) => (
    <Paper
      variant="outlined"
      component="form"
      sx={{
        p: "1px 2px",
        display: "flex",
        alignItems: "center",
        width: 200,
        backgroundColor: "#1976d2",
      }}
    >
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        type="button"
        sx={{ p: "10px", color: "white" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );

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

          {/* <Button className="navButton" color="inherit">
            Categories
          </Button>
          <Button className="navButton" color="inherit" sx={{ ml: 2 }}>
            Trending
          </Button> */}

          {/* <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            
          </Paper> */}
          <SearchBar />
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={logoutHome}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
