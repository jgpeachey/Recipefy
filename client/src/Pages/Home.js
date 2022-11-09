import React, { useEffect, useState } from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import RecipeCard from "../Components/RecipeCard";
import ImageCarousel from "../Components/ImageCarousel";

import { SliderData } from "../Components/SliderData";

import Axios from "axios";

const theme = createTheme({});

export default function Home() {
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies.token);
  const [recipeCardsArray, setRecipeCardsArray] = useState([]);
  const app_name = "recipefy-g1";

  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  useEffect(() => {
    Axios.get(buildPath("recipe/findRecipe"), {
      //page: 0,
      //count: 9,
      //search: "",
      //userId: "63628284bf236aae197aee81"
    })
      .then((response) => {
        setRecipeCardsArray(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar />

      <ImageCarousel slides={SliderData} />

      <Container>
        <Grid container spacing={11} marginTop={-8.5}>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
