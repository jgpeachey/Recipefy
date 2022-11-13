import React, {useState, Component} from 'react'
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import PublishIcon from '@mui/icons-material/Publish';
import HomeAppBar from '../Components/HomeAppBar';
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

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

export default function AddRecipe(){

    const navigate = useNavigate();

    const [base64Picture, setBase64Picture] = useState("");
    const [pictureError, setPictureError] = useState("");
    const [pictureSuccess, setPictureSuccess] = useState("Default selected");

    const handlePicture = (event) => {
        setPictureError("");
        setPictureSuccess("Default selected");
        setBase64Picture("");
        const fileInput = document.getElementById("recipePic");
        if (fileInput.files[0]) {
          if (fileInput.files[0].size > 8388608) {
            console.log("File is too large");
            setPictureError("File is too large");
            return;
          }
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setBase64Picture(reader.result);
          });
          reader.readAsDataURL(file);
          setPictureSuccess("File uploaded");
          console.log("File uploaded");
        }
    };

    const inputArr = [
        {
          value: ""
        }
      ];
    
      const [arr, setArr] = useState(inputArr);
    
      const addInput = () => {
        setArr(s => {
          return [
            ...s,
            {
              value: ""
            }
          ];
        });
      };
    
      const handleAddIngredient = e => {
        e.preventDefault();
    
        const index = e.target.id;
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value = e.target.value;
    
          return newArr;
        });
      };

      const handleRemoveIngredient = (index) => {
        const list = [...arr]
        list.splice(index, 1)
        setArr(list)
      }


      const inputArrInstruction = [
        {
          value: ""
        }
      ];
    
      const [arrInstruction, setArrInstruction] = useState(inputArrInstruction);
    
      const addInputInstruction = () => {
        setArrInstruction(s => {
          return [
            ...s,
            {
              value: ""
            }
          ];
        });
      };
    
      const handleAddInstruction = e => {
        e.preventDefault();
    
        const index = e.target.id;
        setArrInstruction(s => {
          const newArrInstruction = s.slice();
          newArrInstruction[index].value = e.target.value;
    
          return newArrInstruction;
        });
      };

      const handleRemoveInstruction = (index) => {
        const list = [...arrInstruction]
        list.splice(index, 1)
        setArrInstruction(list)
      }


    const handlePublishRecipe = (e) => {
        e.preventDefault();
        console.log(arr);
        console.log(arrInstruction);

        //make sure all required fields are filled
        //if not, set errors

        //post request(if ok: navigate("/home");)

        navigate("/home");
    }

    return(
        <ThemeProvider theme={theme}>
            <HomeAppBar />
            <div style={{marginTop:70}}>
                <Paper elevation={10}>
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "space-between"
                        }}
                        marginTop={11}
                        marginBottom={3}
                    >
                        <Box
                            sx={{
                                width:2000,
                                display: "flex",
                                alignItems: "center"
                            }}
                            marginLeft={2}
                        >
                            <Typography
                                sx={{
                                display: "flex"
                                }} 
                                variant="h5"
                                component="h2"
                            >
                                Share a Recipe
                            </Typography>
                        </Box>
                        <Button 
                            sx={{
                                justifyContent: 'flex-end',
                                alignItems: "center",
                                width:125
                            }}
                            onMouseDown={event => event.stopPropagation()}
                            onClick={handlePublishRecipe}
                        >
                            Post
                        <PublishIcon 
                            sx={{
                                height: 30, width: 30, m:'.45rem'
                            }}
                            
                        >

                        </PublishIcon>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                        display: "flex",
                        alignItem: "center",
                        }}
                        marginTop={1}
                        marginBottom={1}
                    >
                        <Box 
                            sx={{
                                width:1500
                            }}
                            marginBottom={2}
                            marginLeft={2}
                        >
                            <Grid marginRight={9} flexDirection='column'>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="title"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        autoFocus
                                        //error={firstError}
                                        //helperText={firstHelper}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="comment"
                                        label="Description"
                                        name="comment"
                                        //error={lastError}
                                        //helperText={lastHelper}
                                        rows={6}
                                        multiline
                                    />
                                </Grid>
                                
                            </Grid>
                            <Box
                                marginBottom={2}
                                marginTop={3}
                            >
                                <Button variant="outlined" component="label">
                                    Upload Recipe Picture
                                    <input
                                    id="recipePic"
                                    type="file"
                                    hidden
                                    accept="image/png, image/jpeg"
                                    onChange={handlePicture}
                                />
                                </Button>
                                <Box>
                                    <Typography color="red" component="h1" variant="subtitle2">
                                        {pictureError}
                                    </Typography>
                                    <Typography color="green" component="h1" variant="subtitle2">
                                        {pictureSuccess}
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>
                        <Box 
                            sx={{
                                width:1500,
                                
                               
                            }}
                            marginBottom={4}
                            marginLeft={10}
 
                        >
                            <Grid container spacing={3} flexDirection='column'>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex">
                                        <Typography component="h5" variant="subtitle1" marginRight={2} alignSelf="center">
                                                Ingredients
                                        </Typography>
                                        <Button variant="outlined" hidden
                                            sx={{
                                                height:30,
                                                alignItems: "center",
                                            }}
                                            onClick={addInput}
                                        >
                                        +
                                        </Button>
                                    </Box>
                                                          
                                </Grid>
                            </Grid>
                            
                            <Box marginTop={1} marginBottom={15} display="flex" flexDirection='column' marginRight={12} flexShrink={1}>
                                {arr.map( (item, i) => {
                                    return(
                                        <div>
                                            <input 
                                            onChange={handleAddIngredient}
                                            value={item.value}
                                            id={i}
                                            type={item.type}
                                            size="80"
                                        />
                                        {arr.length>1 && (<Button variant="outlined" hidden
                                            sx={{
                                                height:20,
                                                marginLeft:2,
                                                marginBottom:.5,
                                                borderColor:"red",
                                                alignItems: "center"
                                            }}

                                            onClick={()=>handleRemoveIngredient(i)}
                                        >
                                        -
                                        </Button>)}
                                        </div>
                                        
                                    );
                                })}
                            </Box>


                            <Grid container spacing={3} flexDirection='column'>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex">
                                        <Typography component="h5" variant="subtitle1" marginRight={2} alignSelf="center">
                                                Instructions
                                        </Typography>
                                        <Button variant="outlined" hidden
                                            sx={{
                                                height:30,
                                                alignItems: "center",
                                            }}
                                            onClick={addInputInstruction}
                                        >
                                        +
                                        </Button>
                                    </Box>
                                                          
                                </Grid>
                            </Grid>
                            
                            <Box marginTop={1} marginBottom={15} display="flex" flexDirection='column' marginRight={12} flexShrink={1}>
                                {arrInstruction.map( (field, j) => {
                                    return(
                                        <div>
                                            <input 
                                            onChange={handleAddInstruction}
                                            value={field.value}
                                            id={j}
                                            type={field.type}
                                            size="80"
                                        />
                                        {arrInstruction.length>1 && (<Button variant="outlined" hidden
                                            sx={{
                                                height:20,
                                                marginLeft:2,
                                                marginBottom:.5,
                                                borderColor:"red",
                                                alignItems: "center"
                                            }}

                                            onClick={()=>handleRemoveInstruction(j)}
                                        >
                                        -
                                        </Button>)}
                                        </div>
                                    );
                                })}
                            </Box>




                            
                        </Box>
                    </Box>
                </Paper>
            </div>
        </ThemeProvider>
    )
}