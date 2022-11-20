import React, {useState, useEffect} from 'react'
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import { Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from '@mui/system';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from '@mui/system/Container';

import Axios from "axios";
import { cookies, useCookies } from "react-cookie";

const theme = createTheme({});

const ImageCarousel = ({slides}) => {
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
              {index === current && (<img src={slide} alt='food' className='image' onClick={() => setOpen(true)}/>)}
            </div>
          )

        })}
      </section>

      

    </ThemeProvider>
  )
}

export default ImageCarousel