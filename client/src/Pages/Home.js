import React, { useEffect, useState, useRef } from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import RecipeCard from "../Components/RecipeCard";
import ImageCarousel from "../Components/ImageCarousel";

import { SliderData } from "../Components/SliderData";
// import { RecipeCardData } from "../Components/RecipeCardData";
import Axios from "axios";

const theme = createTheme({});

export default function Home() {
  const [reachedBottom, setReachedBottom] = useState(false);
  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };

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
    const config = {
      headers: {
        authorization: cookies.token,
      },
      params: {
        page: 1,
        count: 9,
        search: "",
      },
    };
    Axios.get(buildPath("recipe/findAllRecipe"), config)
      .then((response) => {
        var res = [];
        for (let q = 0; q < response.data.results.length; q++) {
          res.push(response.data.results[q]);
        }
        setRecipeCardsArray(res);
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
        <Grid container spacing={11} marginTop={-8.5} onScroll={onScroll}>
          {recipeCardsArray.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
