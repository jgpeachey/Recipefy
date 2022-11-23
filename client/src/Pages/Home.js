import React, { useEffect, useState, useRef } from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Button, AppBar, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import RecipeCard from "../Components/RecipeCard";
import ImageCarousel from "../Components/ImageCarousel";
import FollowItem from "../Components/FollowItem";

import { SliderData } from "../Components/SliderData";
import { useNavigate, Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { BottomScrollListener } from "react-bottom-scroll-listener";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import { useCounter, useDeepCompareEffect } from "react-use";

import Axios from "axios";

const theme = createTheme({});

export default function Home() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  if (
    cookies.token === "" ||
    cookies.token === undefined ||
    cookies.token == null
  ) {
    navigate("/");
  }
  var counter = 0;

  const [page, setPage] = useState(1);

  console.log(cookies.token);
  const app_name = "recipefy-g1";

  const [openProfile, setOpenProfile] = useState(false);
  const [searcher, setSearcher] = useState("");
  const [change, setChange] = useState(false);
  const [recipeCardsArray, setRecipeCardsArray] = useState([]);
  const [likeChange, setlikeChange] = useState(false);

  const [userCards, setUserCards] = useState([]);
  const [clickedUser, setClickedUser] = useState(0);
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");

  const [followingArray, setFollowingArray] = useState([]);
  const [followlistchange, setFollowingListChange] = useState(false);

  const [newRecipes, setNewRecipes] = useState([]);
  const [newRecipes2, setNewRecipes2] = useState([]);

  const appbarToHome = (appbardata) => {
    console.log(appbardata);
    setSearcher(appbardata);
  };

  const likeChanger = () => {
    setlikeChange(!likeChange);
  };

  const handleClickOpen = () => {
    setOpenProfile(true);
  };

  const handleClose = () => {
    setOpenProfile(false);
  };

  const handlefollowchange = () => {
    setFollowingListChange(true);
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

  function getFollowingList() {
    Axios.post(buildPath("user/getFollowing"), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        console.log(response);
        var res = [];

        for (let i = 0; i < response.data.results.length; i++) {
          res.push(response.data.results[i]);
        }

        setFollowingArray(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getNewRecipes() {
    Axios.post(buildPath(`recipe/findAllRecipe?search&page&count`), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        var res = [];
        var res2 = [];
        let length = response.data.results.length;

        for (let i = length - 1; i > length - 6; i--) {
          res.push(response.data.results[i].Pic);
          res2.push(response.data.results[i]);
        }

        setNewRecipes2(res2);
        setNewRecipes(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getRecipes() {
    setPage(page + 1);
    console.log(page);
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
      Axios.post(
        buildPath(`recipe/findAllRecipe?page=${page}&&count=${9}&search`),
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
          if (page === 1) {
            console.log("cheese");
            setRecipeCardsArray(res);
            setChange(!change);
          } else if (res.length != 0) {
            setRecipeCardsArray((current) => [...recipeCardsArray, ...res]);
          }
          console.log(recipeCardsArray);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.error);
        });
    } else {
      setPage(1);
      console.log("here");
      Axios.post(
        buildPath(
          `recipe/findAllRecipe?page=${page}&&count=${9}&search=${searcher}`
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

  useEffect(() => {
    console.log("called");
    console.log(page);
    getRecipes();
    getFollowingList();
    getNewRecipes();
    setFollowingListChange(false);
  }, [searcher, change, followlistchange]);

  // useDeepCompareEffect(() => {
  //   console.log("called");
  //   getFollowingList();
  // }, [followingArray]);

  return (
    <BottomScrollListener offset={2} onBottom={getRecipes}>
      <ThemeProvider theme={theme}>
        <HomeAppBar appbarToHome={appbarToHome} />

        <ImageCarousel slides={newRecipes} info={newRecipes2} />
        {/* <Button
          onClick={(event) => {
            setOpenProfile(true);
            setClickedUser(clickedUser + 1);
            getUserRecipes(event.target.innerText);
          }}
        >
          omarashry98
        </Button> */}

        <Container>
          <Grid container spacing={11} marginTop={-8.5}>
            {recipeCardsArray.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                handlefollowchange={handlefollowchange}
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
                <RecipeCard
                  recipe={recipe}
                  handlefollowchange={handlefollowchange}
                />
              ))}
            </Grid>
          </Container>
        </Dialog>

        <Drawer
          variant="permanent"
          anchor="left"
          PaperProps={{ sx: { width: "12%" } }}
        >
          <HomeAppBar appbarToHome={appbarToHome} />
          <Divider />
          <Button sx={{ mt: 9 }}>Following:</Button>
          {/* will end up navigating to following page */}
          <Divider />
          <List sx={{}}>
            {followingArray.map((person) => (
                <FollowItem person={person}/>
            ))}
          </List>
        </Drawer>
      </ThemeProvider>
    </BottomScrollListener>
  );
}
