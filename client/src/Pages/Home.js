import React, { useEffect, useState, useRef } from "react";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Button } from "@mui/material";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import RecipeCard from "../Components/RecipeCard";
import ImageCarousel from "../Components/ImageCarousel";

import { SliderData } from "../Components/SliderData";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

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
  const [openProfile, setOpenProfile] = useState(false);

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
      <Button onClick={() => setOpenProfile(true)}>
        Testing Profile Modal
      </Button>

      <Container>
        <Grid container spacing={11} marginTop={-8.5} onScroll={onScroll}>
          {recipeCardsArray.map((recipe) => (
            <RecipeCard recipe={recipe} />
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
          <DialogTitle sx={{ color: "white" }}>{"Alex's Recipes"}</DialogTitle>
          <Avatar
            src={cookies.picture}
            sx={{
              width: 24,
              height: 24,
            }}
            onMouseDown={(event) => event.stopPropagation()}
          />
          <Button sx={{ color: "white", pl: 2 }}>Follow+</Button>
        </div>

        <DialogContentText className="profileBio">
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum id lacus pharetra, rhoncus sem non, commodo tellus. Aliquam
          pharetra sem at arcu luctus, sed consectetur magna auctor. Etiam
          ornare neque in fermentum convallis. Morbi laoreet mauris pretium
          elementum posuere. Proin viverra faucibus rhoncus. Curabitur tempus
          ultricies cursus. Vestibulum ut lacinia nisl, quis auctor metus.
        </DialogContentText>

        <Container>
          <Grid container spacing={11} marginTop={-8.5} onScroll={onScroll}>
            {recipeCardsArray.map((recipe) => (
              <RecipeCard recipe={recipe}/>
            ))}
          </Grid>
        </Container>
      </Dialog>
    </ThemeProvider>
  );
}
