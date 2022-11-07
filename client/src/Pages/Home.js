import React from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

import RecipeCard from "../Components/RecipeCard";
import ImageCarousel from '../Components/ImageCarousel'

import { SliderData } from '../Components/SliderData';

const theme = createTheme({});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar />

      <ImageCarousel slides={SliderData}/>

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
