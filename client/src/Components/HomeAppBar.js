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

export default function HomeAppBar() {
  const [cookies, setCookie] = useCookies(["user"]);

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
            />
            <PostAddOutlinedIcon sx={{ ml: 5 }}></PostAddOutlinedIcon>
            <GroupIcon sx={{ ml: 5 }}></GroupIcon>
          </IconButton>

          <div className="homeLogo" sx={{ flexGrow: 1 }}>
            Recipefy
          </div>
          <Button className="navButton" color="inherit">
            Categories
          </Button>
          <Button className="navButton" color="inherit" sx={{ ml: 2 }}>
            Trending
          </Button>
          <SearchIcon sx={{ ml: 2 }}></SearchIcon>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
