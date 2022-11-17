import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import Container from "@mui/system/Container";
import { useState } from "react";

import Axios from "axios";
import { cookies, useCookies } from "react-cookie";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "body3",
          },
          style: {
            fontSize: 10,
          },
        },
      ],
    },
  },
});

export default function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);
  // const [username, setUsername] = useState("");
  // const [pfp, setPfp] = useState("");
  // console.log(recipe);
  const app_name = "recipefy-g1";
  const [cookies, setCookie] = useCookies(["user"]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // getLikedRecipes()
    setOpen(false);
  };

  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  // function getUserInfo(){

  //   Axios.post(
  //     buildPath(`user/searchUsers?page=${1}&count=${9}&filter=${recipe.User_ID}`),
  //     null,
  //     {
  //       headers: {
  //         authorization: cookies.token,
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data.results[0]);

  //       setUsername(response.data.results[0].Username);
  //       setPfp(response.data.results[0].Pic);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(error.response.data.error);
  //     });
  // }

  function likeRecipe() {
    Axios.post(
      buildPath("recipe/likerecipe"),
      {
        recipeId: recipe._id,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function unlikeRecipe() {
    Axios.post(
      buildPath("recipe/unlikerecipe"),
      {
        recipeId: recipe._id,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Grid item xs={4}>
      <ThemeProvider theme={theme}>
        <Paper elevation={10}>
          <Box padding={1}>
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                }}
                marginTop={0.5}
                marginBottom={1}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={recipe.profilePic}
                  sx={{ width: 32, height: 32 }}
                ></Avatar>
                <Typography
                  variant="body2"
                  component="h2"
                  color="blue"
                  marginTop={0.3}
                  marginLeft={1}
                  fontSize={18}
                >
                  {recipe.Username}
                </Typography>
              </Box>
              <img src={recipe.Pic} alt="" className="img" />
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                }}
                marginTop={0.5}
              >
                <Button
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setOpen(true);
                    console.log(recipe);
                  }}
                >
                  <RestaurantMenuOutlinedIcon
                    sx={{
                      width: 18,
                      m: ".45rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="h2"
                    marginTop={0.5}
                    noWrap="false"
                  >
                    {recipe.Title}
                  </Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "right",
                }}
                marginTop={-1}
                marginBottom={0.5}
              >
                <Typography variant="body1" component="p" marginTop={1}>
                  {recipe.Likes} likes
                </Typography>
                <FavoriteIcon
                  sx={{
                    width: 18,
                    m: ".45rem",
                  }}
                />
              </Box>
            </CardActionArea>
          </Box>
        </Paper>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          maxWidth={maxWidth}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="modalContainerTop">
            <DialogTitle sx={{ color: "white" }}>{recipe.Title}</DialogTitle>
            <DialogContentText sx={{ color: "white" }}>
              <Button sx={{ color: "white" }}>by: {recipe.Username}</Button>
            </DialogContentText>
            <Avatar
              src={recipe.profilePic}
              sx={{
                width: 24,
                height: 24,
              }}
              onMouseDown={(event) => event.stopPropagation()}
            />
            <Button
              variant="contained"
              sx={{ color: "red", ml: 2, backgroundColor: "white" }}
              endIcon={<FavoriteIcon />}
              onClick={likeRecipe}
            >
              Like
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white", ml: 2 }}
              endIcon={<FavoriteIcon />}
              onClick={unlikeRecipe}
            >
              UnLike
            </Button>
            {/* lemme know how you feel about this button, I was thinking we could change the color and all that nonsense.
            We can put the follow when you click on that persons username instead cause idk where else we would put the like
          unless we put it all the way at the end of the modal screen area.  @ ALEX */}
            {/* THESE ARE TEMPORARY LIKE AND UNLIKE BUTTONS,IN THE FUTURE MAKE IT ONE BUTTON @ALEX */}

            {/* <Button sx={{ color: "white", pl: 2 }}>Favorite+</Button> */}
          </div>
          <DialogContent>
            <Container>
              <Grid container spacing={1}>
                <div className="modalContainer">
                  <img className="modalImg" src={recipe.Pic} />
                  <DialogContent>
                    <DialogTitle className="ingredientHeader">
                      Ingredients:
                    </DialogTitle>
                    <DialogContentText className="recipeText">
                      {recipe.Ingredients.map((ingredient) => (
                        <DialogContentText>-{ingredient}</DialogContentText>
                      ))}
                    </DialogContentText>
                    <DialogTitle>Instructions:</DialogTitle>
                    <DialogContentText className="recipeText">
                      {recipe.Instructions.map((instruction) => (
                        <DialogContentText>-{instruction}</DialogContentText>
                      ))}
                    </DialogContentText>
                  </DialogContent>
                </div>
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Grid>
  );
}
