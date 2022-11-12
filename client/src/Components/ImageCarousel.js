import React, {useState} from 'react'
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { maxWidth } from '@mui/system';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const theme = createTheme({});

const ImageCarousel = ({slides}) => {
  const[current, setCurrent] = useState(0)
  const length = slides.length
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          maxWidth={maxWidth}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className='modalContainerTop'>
            <DialogTitle sx={{ color: 'white' }}>{"Steak Stir Fry"}</DialogTitle>
            <DialogContentText sx={{ color: 'white' }}>
              by: Recipe_Creator
            </DialogContentText>
            <AccountCircleIcon sx={{ color: 'white' }} className="modalPFP"/>
            <Button sx={{ color:'white' , pl:2 }}>Follow+</Button>
          </div>
          <DialogContent>
            
            <div className='modalContainer'>
              <img className="modalImg" src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'/>
              <DialogContent>
                <DialogTitle className="ingredientHeader">
                  Ingredients:
                </DialogTitle>
                <DialogContentText className="recipeText">
                  cumin, water, pork, mushrooms, cashews, onions
                </DialogContentText>
                <DialogTitle>
                  Instructions:
                </DialogTitle>
                <DialogContentText className="recipeText">
                  This is my recipe! It is really yummy and I like to cook it and it is a really good snack to eat. It is also nutritious. Loren ipsum.<br/>
                  1.<br/>
                  2.<br/>
                  3.<br/>
                </DialogContentText>
              </DialogContent>
            </div>
    
          </DialogContent>
        </Dialog>
        {SliderData.map((slide, index) => {
          return(
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (<img src={slide.image} alt='food' className='image' onClick={() => setOpen(true)}/>)}
            </div>
          )

        })}
      </section>

    </ThemeProvider>
  )
}

export default ImageCarousel