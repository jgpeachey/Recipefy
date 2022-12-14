import React, {useState, useEffect} from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import { Avatar, Button, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCounter, useDeepCompareEffect } from "react-use";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from '@mui/system';
import Container from '@mui/system/Container';
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import RecipeCard from './RecipeCard';

import Axios from "axios";
import { cookies, useCookies } from "react-cookie";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const ImageCarousel = ({slides, info, handlefollowchange, likeChangeImageCarousel}) => {
  const[current, setCurrent] = useState(0)
  const length = slides.length
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const [userCards, setUserCards] = useState([]);
  const [clickedUser, setClickedUser] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [idToFollow, setIdToFollow] = useState("");
  const [followlistchange, setFollowingListChange] = useState(false);
  const [followingIds, setFollowingIds] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const [followChange, setFollowChange] = useState(false);

  const [liked2, setLiked2] = useState(false); // if recipe is liked or not
  const [likedId, setLikedId] = useState([]); // all liked recipe ids

  const app_name = "recipefy-g1";
  const [cookies, setCookie] = useCookies(["user"]);

  const handleCloseProfile = () => {
      setOpenProfile(false);
  };

  function buildPath(route) {
      if (process.env.NODE_ENV === "production") {
        return "https://" + app_name + ".herokuapp.com/" + route;
      } else {
        return "http://localhost:3001/" + route;
      }
    }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const followChanger = () => {
    setFollowChange(!followChange);
  };

  const handleClose2 = () => {
    setOpenProfile(false);
  };

  useDeepCompareEffect(() => {
    getFollowStatus();
    getLikedStatus();
  }, [followingIds, likedId]);

  if(!Array.isArray(slides) || slides.length <= 0){
    return
  }

  function getUserRecipes(name) {
    var userToGet;
    if (info[current].Clicked > 1) return;

    setUsername(name);
    var res = [];
    setUserCards(res);

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
        console.log(response.data.results[0]._id)

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
            
            setUserCards(res);
            
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

  function getFollowingList() {
    Axios.post(buildPath("user/getFollowing"), null, {
      headers: {
        authorization: cookies.token,
      },
    })
      .then((response) => {
        var res = [];
        for(let i = 0; i < response.data.results.length; i++){
          res.push(response.data.results[i]._id)
        }

        setFollowingIds(res);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      });
  }

  function getFollowStatus(){
    for(let i = 0; i < followingIds.length; i++){
      if(followingIds[i] === idToFollow){
        setFollowStatus(true);
        console.log("pee")
        return;
      }
    }

    console.log("poo");
    setFollowStatus(false);
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

  function likeRecipe() {
    Axios.post(
      buildPath("recipe/likerecipe"),
      {
        recipeId: info[current]._id,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setLiked2(true);
        // likeChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function unlikeRecipe() {
    Axios.post(
      buildPath("recipe/unlikerecipe"),
      {
        recipeId: info[current]._id,
      },
      {
        headers: {
          authorization: cookies.token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setLiked2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

    for (let i = 0; i < likedId.length; i++) {
      if (likedId[i] === info[current]._id) {
        setLiked2(true);
        console.log("true");
        return;
      }
    }
    setLiked2(false);
    console.log("false");
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
        
        {slides.map((slide, index) => {
          return(
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (<img src={slide} alt='food' className='image' onClick={() => {
                handleClickOpen(); 
                info[current].Clicked=0;
                getLikedRecipes2();
                getLikedStatus();
                }}/>)}
            </div>
          )
        })}
      </section>

      <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          maxWidth={maxWidth}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="modalContainerTop">
            <DialogTitle sx={{ color: "white" }}>{info[current].Title}</DialogTitle>
            <DialogContentText sx={{ color: "white" }}>
              <Button
                sx={{ color: "white", fontSize: 20 }}
                onClick={(event) => {
                  info[current].Clicked = info[current].Clicked + 1;
                  console.log(info[current].Clicked);
                  getUserRecipes(event.target.innerText);
                  setOpenProfile(true);
                  getFollowingList();
                  getFollowStatus();
                }}
              >
                {info[current].Username}
              </Button>
            </DialogContentText>
            <Avatar
              src={info[current].profilePic}
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
              onClick={() => {unlikeRecipe(); setLiked2(false)}}
              disabled={!liked2}
            >
              Unlike
            </Button>
            {/* lemme know how you feel about this button, I was thinking we could change the color and all that nonsense.
            We can put the follow when you click on that persons username instead cause idk where else we would put the like
          unless we put it all the way at the end of the modal screen area.  @ ALEX */}
            {/* THESE ARE TEMPORARY LIKE AND UNLIKE BUTTONS,IN THE FUTURE MAKE IT ONE BUTTON @ALEX */}

            {/* <Button sx={{ color: "white", pl: 2 }}>Favorite+</Button> */}
          </div>
          <DialogContent>
          <DialogTitle sx={{mb:0, fontSize: 15}}>Recipe Description:</DialogTitle>
          <DialogContentText sx={{mb:2}} className="recipeDescription">{info[current].Description}</DialogContentText>
            <Container>
              <Grid container spacing={1}>
                <div className="modalContainer">
                  <img className="modalImg" src={info[current].Pic} />
                  <DialogContent>
                    <DialogTitle className="ingredientHeader">
                      Ingredients:
                    </DialogTitle>
                    <DialogContentText className="recipeText">
                      {info[current].Ingredients.map((ingredient) => (
                        <DialogContentText>-{ingredient}</DialogContentText>
                      ))}
                    </DialogContentText>
                    <DialogTitle>Instructions:</DialogTitle>
                    <DialogContentText className="recipeText">
                      {info[current].Instructions.map((instruction) => (
                        <DialogContentText>-{instruction}</DialogContentText>
                      ))}
                    </DialogContentText>
                    <DialogTitle sx={{pb:0, fontSize:15}}>{info[current].Calories} Calories</DialogTitle>
                    <DialogTitle sx={{pt:0, fontSize:15}}>{info[current].Sodium} mg Sodium</DialogTitle>
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
              setFollowStatus(true);
              handlefollowchange();
            }}
            endIcon={<AddIcon />}
            variant="contained"
            disabled={followStatus}
          >
            Follow
          </Button>
          <Button
            sx={{ color: "blue", backgroundColor: "white", pl: 2, ml: 2 }}
            onClick={() => {
              unfollowPerson();
              setFollowStatus(false);
              handlefollowchange();
            }}
            endIcon={<RemoveIcon />}
            variant="contained"
            disabled={!followStatus}
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
  )
}

export default ImageCarousel