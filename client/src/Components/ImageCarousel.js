import React, {useState} from 'react'
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const ImageCarousel = ({slides}) => {
  const[current, setCurrent] = useState(0)
  const length = slides.length
  const navigate = useNavigate();
  const[openModal, setOpenModal] = useState(false);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  const navigateToRecipe = () =>{
    
  }

  if(!Array.isArray(slides) || slides.length <= 0){
    return
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
      {SliderData.map((slide, index) => {
        return(
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (<img src={slide.image} alt='food' className='image' onClick={() => {setOpenModal(true)}}/>)}
            {openModal && <Modal closeModal={setOpenModal}/>}
          </div>
        )

      })}
    </section>   
  )
}

export default ImageCarousel