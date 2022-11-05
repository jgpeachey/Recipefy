import React from "react";
import ReactDOM from "react-dom/client";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import HomeAppBar from "../Components/HomeAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontFamily } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import RecipeCard from "../Components/RecipeCard";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const theme = createTheme({});

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar/>
      
      <Carousel className="Carousel"
      sx={{ mt:0, mb: 0 , ml: 40, mr: 50}}
      navButtonsAlwaysVisible={true}
      animation="slide"
      autoPlay={false}
      >  
        <div>
          <Card sx={{ maxWidth: 500 }} className="Card">
            <CardMedia
              component="img"
              height="150"
              image="https://www.starfrit.com/media/contentmanager/content/cache/1070x1070/recipes/e1_r1_spaghetti.jpg"
              alt="spag"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Spaghet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Spaghetti is fire. Lemme show you how.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Recipe</Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 500 }} className="Card">
            <CardMedia
              component="img"
              height="150"
              image="https://www.melskitchencafe.com/wp-content/uploads/french-bread2.jpg"
              alt="brad"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Bred
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bread tastes yummy and carbs
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Recipe</Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 500 }} className="Card">
            <CardMedia
              component="img"
              height="150"
              image="https://www.acouplecooks.com/wp-content/uploads/2021/09/Tomato-Soup-002s.jpg"
              alt="soup"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Zoop
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Slurp
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Recipe</Button>
            </CardActions>
          </Card>
        </div>
        </Carousel>
        <Container>
          <Grid container spacing={3}>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
          </Grid>
        </Container>
    </ThemeProvider>
    
  );

}
