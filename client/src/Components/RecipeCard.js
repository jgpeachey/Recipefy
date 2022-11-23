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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

const deleterecipetransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeCard({
  recipe,
  getLikedRecipes,
  onFavoritePage,
  handlefollowchange,
  deleteProfileRecipe,
}) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const [userCards, setUserCards] = useState([]);
  const [clickedUser, setClickedUser] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [liked, setLiked] = useState(recipe.Likes);
  const [deleterecipeopen, setDeleteRecipeOpen] = useState(false);

  const [id, setId] = useState([]); // all recipe ids
  const [likedId, setLikedId] = useState([]); // all liked recipe ids
  const [liked2, setLiked2] = useState(false); // if recipe is liked or not

  const [followingId, setFollowingId] = useState([]);
  const [following, setFollowing] = useState(false);

  const [idToFollow, setIdToFollow] = useState("");
  const [followChange, setFollowChange] = useState(false);

  var likedornot = false;

  // console.log(recipe);
  const app_name = "recipefy-g1";
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (onFavoritePage) getLikedRecipes();
    setOpen(false);
  };

  const handledeleterecipeopen = () => {
    console.log("what");
    setDeleteRecipeOpen(true);
  };

  const handledeleterecipeclose = () => {
    setDeleteRecipeOpen(false);
  };

  const handleClose2 = () => {
    setOpenProfile(false);
  };

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

  const deleteRecipe = (event) => {
    Axios.delete(buildPath("recipe/removerecipe"), {
      headers: {
        authorization: cookies.token,
      },
      data: {
        _id: recipe._id,
      },
    })
      .then((response) => {
        console.log("Recipe Deleted");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        if (response.data.error !== "Already Liked") setLiked(liked + 1);
        setLiked2(true);
        // likeChange();
      })
      .catch((error) => {
        console.log(error);
      });
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
        setIdToFollow(response.data.results[0]._id);

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
        if (response.data.error !== "Recipe never liked") setLiked(liked - 1);
        setLiked2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function getRecipesId() {
  //   Axios.post(buildPath(`recipe/findAllRecipe?search&page&count`), null, {
  //     headers: {
  //       authorization: cookies.token,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       var res = [];

  //       for (let i = 0; i < response.data.results.length; i++) {
  //         res.push(response.data.results[i]._id);
  //       }

  //       setId(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(error.response.data.error);
  //     });
  // }

  function getLikedRecipes2() {
    Axios.post(buildPath(`recipe/getLikedRecipes`), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        console.log(response);
        var res = [];

        for (let i = 0; i < response.data.results.length; i++) {
          res.push(response.data.results[i]._id);
        }

        setLikedId(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getLikedStatus() {
    // console.log(id);
    // console.log(likedId);
    // for (let i = 0; i < likedId.length; i++) {
    //   for (let j = 0; j < id.length; j++) {
    //     if (likedId[i] == id[j]) {
    //       likedornot = true;
    //       // setLiked2(true);
    //       console.log(likedornot);
    //       return;
    //     }
    //   }
    //   setLiked2(false);
    //   likedornot = false;
    //   console.log(likedornot);
    // }

    for (let i = 0; i < likedId.length; i++) {
      if (likedId[i] === recipe._id) {
        setLiked2(true);
        console.log("true");
        return;
      }
    }
    setLiked2(false);
    console.log("false");
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

  function getFollowerCount() {
    Axios.post(buildPath(`user/getFollowers`), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
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
        for(let i = 0; i < response.data.results.length; i++){
          res.push(response.data.results[i]._id)
        }

        console.log(res)
        setFollowingId(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getFollowingStatus(){
    for(let i = 0; i < followingId.length; i++){
      if(followingId[i] === idToFollow){
        setFollowing(true);
        return;
      }
    }

    setFollowing(false);
    console.log("poo");
  }

  useEffect(() => {
    getLikedStatus();
    getFollowingStatus();
  }, [likedId, followingId]);

  return (
    <Grid item xs={4}>
      <ThemeProvider theme={theme}>
        <Paper elevation={10}>
          <Box padding={1}>
            <CardActionArea
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                getLikedRecipes2();
                // getRecipesId();
                getLikedStatus();
                getFollowingList();

                console.log(recipe);
                setOpen(true);
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                }}
                marginTop={0.5}
                marginBottom={1}
              >
                <Button
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setClickedUser(clickedUser + 1);
                    getUserRecipes(event.target.innerText);
                    getFollowerCount();
                    getFollowingList();
                    getFollowingStatus();
                    setOpenProfile(true);
                  }}
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
                </Button>
              </Box>
              <img src={recipe.Pic} alt="" className="img" />
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                }}
                marginTop={0.5}
              >
                {/* <Button
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setOpen(true);
                    console.log(recipe);
                  }}
                > */}
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
                {/* </Button> */}
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
                  {liked} likes
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
          open={deleterecipeopen}
          TransitionComponent={deleterecipetransition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this recipe?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteRecipe}>Yes</Button>
            <Button onClick={handledeleterecipeclose}>Cancel</Button>

            {/* <Button onClick={deleteSubmit}>Yes</Button> */}
          </DialogActions>
        </Dialog>

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
              <Button
                sx={{ color: "white" }}
                onClick={(event) => {
                  setOpenProfile(true);
                  setClickedUser(clickedUser + 1);
                  getUserRecipes(event.target.innerText);
                  getFollowerCount();
                }}
              >
                {recipe.Username}
              </Button>
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
              onClick={() => {likeRecipe(); setLiked2(true)}}
              disabled={liked2}
            >
              Like
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white", ml: 2, backgroundColor: "red" }}
              endIcon={<FavoriteIcon />}
              onClick={unlikeRecipe}
              disabled={!liked2}
            >
              Unlike
            </Button>
            {deleteProfileRecipe && (
              <Button
                variant="contained"
                color="error"
                sx={{
                  ml: 2,
                }}
                onClick={() => {
                  handledeleterecipeopen();
                  handleClose();
                  handleClose2();
                }}
              >
                Delete Recipe?
              </Button>
            )}

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

        <Dialog
          open={openProfile}
          keepMounted
          onClose={handleClose2}
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
              sx={{ color: "white", backgroundColor:"blue", pl: 2, ml: 2 }} 
              onClick={() => {followPerson(); setFollowing(true)}} 
              endIcon={<AddIcon/>}
              variant="contained" 
              disabled={following}
            >
              Follow
            </Button>
            <Button 
              sx={{ color: "blue", backgroundColor:"white", pl: 2, ml: 2 }} 
              onClick={() => {unfollowPerson(); setFollowing(false)}}
              endIcon={<RemoveIcon/>}
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
                <RecipeCard recipe={recipe} />
              ))}
            </Grid>
          </Container>
        </Dialog>
      </ThemeProvider>
    </Grid>
  );
}
