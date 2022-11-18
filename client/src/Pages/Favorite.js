import React, { useEffect, useState, useRef } from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Button } from "@mui/material";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import RecipeCard from "../Components/RecipeCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageCarousel from "../Components/ImageCarousel";

import { SliderData } from "../Components/SliderData";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useCounter, useDeepCompareEffect } from "react-use";

import Axios from "axios";

const theme = createTheme({});

export default function Favorite() {
  var counter = 0;

  const [page, setPage] = useState(0);
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies.token);
  const [pageTitle, setPageTitle] = useState("");
  const app_name = "recipefy-g1";

  const [openProfile, setOpenProfile] = useState(false);
  const [searcher, setSearcher] = useState("");
  const [change, setChange] = useState(false);
  const [recipeCardsArray, setRecipeCardsArray] = useState([]);

  const [userCards, setUserCards] = useState([]);
  const [clickedUser, setClickedUser] = useState(0);
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");
  var pedroboolean = true;

  const appbarToHome = (appbardata) => {
    console.log(appbardata);
    setSearcher(appbardata);
  };

  const handleClickOpen = () => {
    setOpenProfile(true);
  };

  const handleClose = () => {
    setOpenProfile(false);
  };

  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  function getUserRecipes(name) {
    var userToGet;
    if (clickedUser >= 1) return;

    console.log(clickedUser);
    setUsername(name);
    console.log(pfp);

    Axios.post(
      buildPath(`user/searchUsers?page=${1}&count=${9}&search=${name}`),
      null,
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        console.log(response.data.results[0]);
        userToGet = response.data.results[0]._id;
        setPfp(response.data.results[0].Pic);

        console.log(userToGet);
        console.log(pfp);

        Axios.post(
          buildPath("recipe/getUserRecipe"),
          {
            userId: userToGet,
          },
          {
            headers: {
              authorization: cookies.token,
            },
          }
        )
          .then((response) => {
            console.log(response);
            var res = [];
            for (let q = 0; q < response.data.results.length; q++) {
              res.push(response.data.results[q]);
            }
            if (res.length != 0) {
              setUserCards((current) => [...userCards, ...res]);
            }
            console.log(userCards);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data.error);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getClickedRecipe() {
    console.log("pee");
  }

  function getLikedRecipes() {
    setPage(page + 1);
    // const config = {
    //   headers: {
    //     authorization: cookies.token,
    //   },
    //   params: {
    //     page: page,
    //     count: 9,
    //     search: "",
    //   },
    // };
    if (searcher === "") {
      setPageTitle(cookies.first + "'s Favorite Recipes");
      Axios.post(buildPath(`recipe/getLikedRecipes`), null, {
        headers: {
          authorization: cookies.token,
        },
      })
        .then((response) => {
          console.log(response);
          var res = [];
          counter = recipeCardsArray.length;
          for (let q = 0; q < response.data.results.length; q++) {
            response.data.results[q].index = counter;
            counter++;
            res.push(response.data.results[q]);
          }
          if (page === 1) {
            console.log("cheese");
            setRecipeCardsArray(res);
            setChange(!change);
          }
          if (res.length != 0) {
            setRecipeCardsArray(res);
          }
          console.log(recipeCardsArray);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.error);
        });
    } else {
      setPageTitle("Search Result");
      setPage(1);
      console.log("here");
      Axios.post(
        buildPath(
          `recipe/findRecipe?page=${page}&&count=${9}&search=${searcher}`
        ),
        null,
        {
          headers: {
            authorization: cookies.token,
          },
        }
      )
        .then((response) => {
          console.log(response);
          var res = [];
          counter = recipeCardsArray.length;
          for (let q = 0; q < response.data.results.length; q++) {
            response.data.results[q].index = counter;
            counter++;
            res.push(response.data.results[q]);
          }
          if (res.length != 0) {
            setRecipeCardsArray(res);
          }
          console.log(recipeCardsArray);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.error);
        });
      // Axios.get(buildPath("recipe/findAllRecipe"), config)
      //   .then((response) => {
      //     console.log(response);
      //     var res = [];
      //     for (let q = 0; q < response.data.results.length; q++) {
      //       res.push(response.data.results[q]);
      //     }
      //     if (res.length != 0) {
      //       setRecipeCardsArray((current) => [...recipeCardsArray, ...res]);
      //     }
      //     console.log(recipeCardsArray);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     console.log(error.response.data.error);
      //   });
    }
  }

  useDeepCompareEffect(() => {
    console.log("called");
    getLikedRecipes();
  }, [searcher, recipeCardsArray]);

  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar appbarToHome={appbarToHome} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        marginTop={12}
        marginBottom={3}
      >
        <Box
          sx={{
            width: 2000,
            display: "flex",
            alignItems: "center",
          }}
          marginLeft={2}
        >
          <Typography
            sx={{
              display: "flex",
            }}
            variant="h5"
            component="h2"
          >
            {pageTitle}
          </Typography>
        </Box>
      </Box>

      <Container>
        <Grid container spacing={11} marginTop={-7.5}>
          {recipeCardsArray.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              getLikedRecipes={getLikedRecipes}
              pedro={pedroboolean}
            />
          ))}
        </Grid>
      </Container>

      <Dialog
        open={openProfile}
        keepMounted
        onClose={handleClose}
        maxWidth={maxWidth}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="modalContainerTop">
          <DialogTitle sx={{ color: "white" }}>{username}</DialogTitle>
          <Avatar
            src={pfp}
            sx={{
              width: 24,
              height: 24,
            }}
            onMouseDown={(event) => event.stopPropagation()}
          />
          <Button sx={{ color: "white", pl: 2 }}>Follow+</Button>
        </div>

        <DialogContentText className="profileBio">
          List of posted recipes:
        </DialogContentText>

        <Container>
          <Grid container spacing={11} marginTop={-8.5} marginBottom={3}>
            {userCards.map((recipe) => (
              <RecipeCard recipe={recipe} />
            ))}
          </Grid>
        </Container>
      </Dialog>
    </ThemeProvider>
  );
}
