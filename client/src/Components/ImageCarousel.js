import React, {useState, useEffect} from 'react'
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import { Avatar, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from '@mui/system';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from '@mui/system/Container';
import FavoriteIcon from "@mui/icons-material/Favorite";


import Axios from "axios";
import { cookies, useCookies } from "react-cookie";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const ImageCarousel = ({slides, info}) => {
  const[current, setCurrent] = useState(0)
  const length = slides.length
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // const [newRecipes, setNewRecipes] = useState([]);

  const app_name = "recipefy-g1";
  const [cookies, setCookie] = useCookies(["user"]);

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

  if(!Array.isArray(slides) || slides.length <= 0){
    return
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
        
        {slides.map((slide, index) => {
          return(
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (<img src={slide} alt='food' className='image' onClick={() => handleClickOpen()}/>)}
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
                sx={{ color: "white" }}
                onClick={(event) => {
                  // setOpenProfile(true);
                  // setClickedUser(clickedUser + 1);
                  // getUserRecipes(event.target.innerText);
                  // getFollowerCount();
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
              // onClick={likeRecipe}
            >
              Like
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white", ml: 2 }}
              endIcon={<FavoriteIcon />}
              // onClick={unlikeRecipe}
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
                  </DialogContent>
                </div>
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>

    </ThemeProvider>
  )
}

export default ImageCarousel