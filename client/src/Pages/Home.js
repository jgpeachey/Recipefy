import React from "react";
import ReactDOM from "react-dom/client";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import NewAppBar from "../Components/NewAppBar";
import HomeAppBar from "../Components/HomeAppBar";
import { ThemeProvider } from "@emotion/react";
import { fontFamily } from "@mui/system";

export default function Home() {
  return (
    <HomeAppBar/>
  );
}
