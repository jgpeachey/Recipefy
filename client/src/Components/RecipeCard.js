import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Rating from "@mui/material/Rating";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const theme = createTheme({
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

export default function RecipeCard({ recipe }) {
  return (
    <Grid item xs={4}>
      <ThemeProvider theme={theme}>
        <Paper elevation={10}>
          <Box padding={1}>
            <CardActionArea>
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
                  {recipe.Likes} likes
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
      </ThemeProvider>
    </Grid>
  );
}
