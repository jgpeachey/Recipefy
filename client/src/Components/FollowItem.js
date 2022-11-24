import { useState, useEffect } from "react";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from "@mui/system";
import Container from "@mui/system/Container";
import Axios from "axios";
import { cookies, useCookies } from "react-cookie";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import RecipeCard from "./RecipeCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCounter, useDeepCompareEffect } from "react-use";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default function FollowItem({ person, handlefollowchange }) {
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

  const [followingId, setFollowingId] = useState([]);
  const [following, setFollowing] = useState(false);

  const app_name = "recipefy-g1";
  const [cookies, setCookie] = useCookies(["user"]);

  const handleClose = () => {
    setOpenProfile(false);
  };

  // const handlefollowchange = () => {
  //   setFollowingListChange(true);
  // };

  const followChanger = () => {
    setFollowChange(!followChange);
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

  function followPerson() {
    Axios.post(
      buildPath("user/followUser"),
      {
        userId: idToFollow,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        followChanger();
        handlefollowchange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function unfollowPerson() {
    Axios.post(
      buildPath("user/unfollowUser"),
      {
        userId: idToFollow,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        followChanger();
        handlefollowchange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFollowingList() {
    Axios.post(buildPath("user/getFollowing"), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        //console.log(response);
        var res = [];
        for (let i = 0; i < response.data.results.length; i++) {
          res.push(response.data.results[i]._id);
        }

        console.log(res);
        setFollowingId(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getFollowingStatus() {
    for (let i = 0; i < followingId.length; i++) {
      if (followingId[i] === idToFollow) {
        setFollowing(true);
        return;
      }
    }

    setFollowing(false);
  }

  useDeepCompareEffect(() => {
    getFollowingStatus();
  }, [followingId]);

  // useEffect(() => {
  //   getFollowingStatus();
  // }, [followingId]);

  return (
    <ThemeProvider theme={theme}>
      <ListItemButton
        onClick={() => {
          setOpenProfile(true);
          setClickedUser(clickedUser + 1);
          getUserRecipes(person.Username);
          getFollowingList();
          getFollowingStatus();
        }}
      >
        <Avatar
          src={person.Pic}
          sx={{
            width: 24,
            height: 24,
            mr: 2,
          }}
        />
        <ListItemText primary={person.Username} />
      </ListItemButton>

      <Dialog
        open={openProfile}
        keepMounted
        onClose={handleClose}
        PaperProps={{ sx: { width: "80%" } }}
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
          <Button
            sx={{ color: "white", backgroundColor: "blue", pl: 2, ml: 2 }}
            onClick={() => {
              followPerson();
              setFollowing(true);
              handlefollowchange();
            }}
            endIcon={<AddIcon />}
            variant="contained"
            disabled={following}
          >
            Follow
          </Button>
          <Button
            sx={{ color: "blue", backgroundColor: "white", pl: 2, ml: 2 }}
            onClick={() => {
              unfollowPerson();
              setFollowing(false);
              handlefollowchange();
            }}
            endIcon={<RemoveIcon />}
            variant="contained"
            disabled={!following}
          >
            Unfollow
          </Button>
        </div>

        <DialogContentText className="profileBio">
          List of posted recipes:
        </DialogContentText>

        <Container>
          <Grid container spacing={11} marginTop={-8.5} marginBottom={3}>
            {userCards.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                // handlefollowchange={handlefollowchange}
              />
            ))}
          </Grid>
        </Container>
      </Dialog>
    </ThemeProvider>
  );
}
