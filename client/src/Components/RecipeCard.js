import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import CardActionArea from '@mui/material/CardActionArea';
import Rating from "@mui/material/Rating";
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    components:{
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: 11,
                    },
                },
                {
                    props: {
                        variant: "body3"
                    },
                    style: {
                        fontSize: 10,
                    },
                },
            ],
        },
    },
});

export default function RecipeCard()
{
    return(
        <Grid item xs={3}>
            <ThemeProvider theme={theme}>
                <Paper elevation={10}>
                    <Box padding={1}>
                        <CardActionArea>
                            <Box
                                sx={{
                                display: "flex",
                                alignItem: "center",
                                }}
                                marginTop={.5}
                                marginBottom={1}
                            >
                                <Button
                                onMouseDown={event => event.stopPropagation()}
                                onClick={event => {
                                event.stopPropagation();
                                event.preventDefault();
                                }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://www.melskitchencafe.com/wp-content/uploads/french-bread2.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                    
                                    </Avatar>
                                    <Typography
                                        variant="body2"
                                        component="h2"
                                        color="blue"
                                        marginTop={0.3}
                                        marginLeft={1}
                                    >
                                        Username
                                    </Typography>
                                </Button>                        
                            </Box>
                            <img 
                                src="https://www.acouplecooks.com/wp-content/uploads/2021/09/Tomato-Soup-002s.jpg"
                                alt=""
                                className="img"
                            />
                            <Box
                                sx={{
                                display: "flex",
                                alignItem: "center",
                                }}
                                marginTop={.5}
                                marginBottom={.5}
                            >
                                <RestaurantMenuOutlinedIcon 
                                    sx={{
                                        width: 18, m:'.45rem'
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    marginTop={.5}
                                    noWrap="false"
                                >
                                    Zoop
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                display: "flex",
                                alignItem: "center",
                                }}
                                marginTop={3}
                                marginBottom={.5}
                            >
                                <Rating
                                    name="read-only"
                                    value={4.5}
                                    precision={0.5}
                                    size="small"
                                    readOnly
                                />
                                <Typography variant="body2" component="p" marginTop={.2} marginLeft={0.5}>
                                    4.5
                                </Typography>
                                <Typography variant="body2" component="p" marginTop={.2} marginLeft={1.5}>
                                    (655 reviews)
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Box>
                </Paper>
            </ThemeProvider>
        </Grid>
    );
}