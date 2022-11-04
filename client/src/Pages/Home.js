import React from "react";
import ReactDOM from "react-dom/client";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontFamily } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const theme = createTheme({});

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar/>
      
      <Carousel
      sx={{ mt: 18, mb: 0 , ml: 45, mr: 45}}
      >  
        <div>  
            <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/milk-dairy/2-1-3-1dairyfoods_cheese_detailfeature_thumb.jpg?sfvrsn=aba8c621_4"/>  
            <p className="legend">Cheese</p>  
        </div>  
        <div>  
            <img src="https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/5:4/w_2815,h_2252,c_limit/milk-bread.jpg" />  
            <p className="legend">Food</p>  
        </div>  
        <div>  
            <img src="https://i1.rgstatic.net/ii/profile.image/730557839319044-1551189970680_Q512/Rick-Leinecker.jpg" />  
            <p className="legend">Richard</p>  
        </div>  
        </Carousel>  
    </ThemeProvider>
    
  );

}
