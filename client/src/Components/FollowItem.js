import { useState, useEffect } from "react";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import Container from "@mui/system/Container";
import { DialogActions } from "@mui/material";
import Axios from "axios";
import { cookies, useCookies } from "react-cookie";
import axios from "axios";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RecipeCard from "./RecipeCard";

const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
});

export default function FollowItem(person){
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [pfp, setPfp] = useState("");
    const [userCards, setUserCards] = useState([]);
    const [clickedUser, setClickedUser] = useState(0);
    const [openProfile, setOpenProfile] = useState(false);
    //const [liked, setLiked] = useState(recipe.Likes);
    const [deleterecipeopen, setDeleteRecipeOpen] = useState(false);
  
    const [id, setId] = useState([]); // all recipe ids
    const [likedId, setLikedId] = useState([]); // all liked recipe ids
    const [liked2, setLiked2] = useState(false); // if recipe is liked or not
  
    const [idToFollow, setIdToFollow] = useState("");
    const [followChange, setFollowChange] = useState(false);
    const [followlistchange, setFollowingListChange] = useState(false);

    const app_name = "recipefy-g1";
    const [cookies, setCookie] = useCookies(["user"]);

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
    
        setUsername(name);
    
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
            userToGet = response.data.results[0]._id;
            setPfp(response.data.results[0].Pic);
            setIdToFollow(response.data.results[0]._id);
    
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
                var res = [];
                for (let q = 0; q < response.data.results.length; q++) {
                  res.push(response.data.results[q]);
                }
                if (res.length != 0) {
                  setUserCards((current) => [...userCards, ...res]);
                }
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

    return(
        <ThemeProvider theme={theme}>
            <ListItemButton onClick={() =>{
                setOpenProfile(true);
                setClickedUser(clickedUser + 1);
                getUserRecipes(person.person.Username);
            }}>
                <Avatar
                    src={person.person.Pic}
                    sx={{
                        width: 24,
                        height: 24,
                        mr: 2,
                    }}
                />
                <ListItemText primary={person.person.Username} />
            </ListItemButton>

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
            <Button sx={{ color: "white", pl: 2 }}>Unfollow</Button>
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

        </ThemeProvider>
    )
}