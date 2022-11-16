import React, { useState, Component } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import HomeAppBar from "../Components/HomeAppBar";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { useCookies } from "react-cookie";

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

export default function AddRecipe() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const [base64Picture, setBase64Picture] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [pictureSuccess, setPictureSuccess] = useState("Default selected");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  let error = false;

  const [ingredientsError, setIngredientsError] = useState("");
  const [instructionsError, setInstructionsError] = useState("");
  const [titleHelper, setTitleHelper] = useState("");
  const [descriptionHelper, setDescriptionHelper] = useState("");

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

  const app_name = "recipefy-g1";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  const inputArr = [
    {
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          value: "",
        },
      ];
    });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleRemoveIngredient = (index) => {
    const list = [...arr];
    list.splice(index, 1);
    setArr(list);
  };

  const inputArrInstruction = [
    {
      value: "",
    },
  ];

  const [arrInstruction, setArrInstruction] = useState(inputArrInstruction);

  const addInputInstruction = () => {
    setArrInstruction((s) => {
      return [
        ...s,
        {
          value: "",
        },
      ];
    });
  };

  const handleAddInstruction = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArrInstruction((s) => {
      const newArrInstruction = s.slice();
      newArrInstruction[index].value = e.target.value;

      return newArrInstruction;
    });
  };

  const handleRemoveInstruction = (index) => {
    const list = [...arrInstruction];
    list.splice(index, 1);
    setArrInstruction(list);
  };

  const handlePublishRecipe = (event) => {
    event.preventDefault();
    console.log(arr);
    console.log(arrInstruction);

    setTitleError(false);
    setDescriptionError(false);
    setIngredientsError("");
    setInstructionsError("");
    setTitleHelper("");
    setDescriptionHelper("");

    if (document.getElementById("title").value == "") {
      setTitleError(true);
      setTitleHelper("Enter a title");
      error = true;
    }
    if (document.getElementById("description").value == "") {
      setDescriptionError(true);
      setDescriptionHelper("Enter a description");
      error = true;
    }
    if (arrInstruction[0].value == "") {
      setInstructionsError("Enter an instruction");
      error = true;
    }
    for (let s = 0; s < arr.length; s++) {
      if (arr[s].value == "") {
        setIngredientsError(
          "You must enter at least one ingredient. Fields cannot be empty."
        );
        error = true;
        break;
      }
    }
    for (let r = 0; r < arrInstruction.length; r++) {
      if (arrInstruction[r].value == "") {
        setInstructionsError(
          "You must enter at least one instruction. Fields cannot be empty."
        );
        error = true;
        break;
      }
    }
    let title = document.getElementById("title").value;
    let calories = document.getElementById("calories").value;
    let sodium = document.getElementById("sodium").value;
    let description = document.getElementById("description").value;
    var ingredients = arr.map(function (item) {
      return item["value"];
    });
    var instructions = arrInstruction.map(function (item) {
      return item["value"];
    });
    console.log(ingredients);
    console.log(instructions);
    if (!error) {
      const config = {
        headers: {
          authorization: cookies.token,
        },
        data: {
          User_ID: cookies.id,
          Title: title,
          Ingredients: ingredients,
          Instructions: instructions,
          Calories: calories,
          Sodium: sodium,
          Description: description,
          Pic: base64Picture,
        },
      };
      console.log(cookies.token);
      console.log(cookies.id);
      console.log(config);
      Axios.post(
        buildPath("recipe/addrecipe"),
        {
          User_ID: cookies.id,
          Title: title,
          Ingredients: ingredients,
          Instructions: instructions,
          Calories: calories,
          Sodium: sodium,
          Description: description,
          Pic: base64Picture,
        },
        {
          headers: {
            authorization: cookies.token,
          },
        }
      )
        .then((response) => {
          console.log("Recipe created");
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HomeAppBar />
      <div style={{ marginTop: 70 }}>
        <Paper elevation={10}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            marginTop={11}
            marginBottom={3}
          >
            <Box
              sx={{
                width: 2000,
                display: "flex",
                alignItems: "center",
              }}
              marginLeft={2}
            >
              <Typography
                sx={{
                  display: "flex",
                }}
                variant="h5"
                component="h2"
              >
                Share a Recipe
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                width: 140,
                height: 45,
                backgroundColor: "white",
                marginRight: 2,
                marginTop: 1,
              }}
              onMouseDown={(event) => event.stopPropagation()}
              onClick={handlePublishRecipe}
              endIcon={
                <PublishIcon
                  sx={{
                    height: 29,
                    width: 29,
                  }}
                />
              }
            >
              Share
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
                width: 1500,
              }}
              marginBottom={2}
              marginLeft={2}
            >
              <Grid marginRight={9} flexDirection="column">
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                    error={titleError}
                    helperText={titleHelper}
                  />
                </Grid>
                <Grid item xs={12} sm={6} marginTop={2}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    error={descriptionError}
                    helperText={descriptionHelper}
                    rows={6}
                    multiline
                  />
                </Grid>
                <Grid item xs={12} sm={6} marginTop={2}>
                  <TextField
                    margin="normal"
                    id="calories"
                    label="Calories"
                    name="calories"
                  />
                  <TextField
                    margin="normal"
                    id="sodium"
                    label="Sodium"
                    name="sodium"
                  />
                </Grid>
              </Grid>
              <Box marginBottom={2} marginTop={3}>
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
                width: 1500,
              }}
              marginBottom={4}
              marginLeft={10}
            >
              <Grid container spacing={3} flexDirection="column">
                <Grid item xs={12} sm={6}>
                  <Box display="flex">
                    <Typography
                      component="h5"
                      variant="subtitle1"
                      marginRight={2}
                      alignSelf="center"
                      width={100}
                    >
                      Ingredients *
                    </Typography>
                    <Button
                      variant="outlined"
                      hidden
                      sx={{
                        height: 30,
                        alignItems: "center",
                      }}
                      onClick={addInput}
                    >
                      +
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      color="red"
                      component="h1"
                      variant="subtitle2"
                      width={400}
                    >
                      {ingredientsError}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                marginTop={1}
                marginBottom={15}
                display="flex"
                flexDirection="column"
                marginRight={12}
                flexShrink={1}
              >
                {arr.map((item, i) => {
                  return (
                    <div>
                      <input
                        onChange={handleAddIngredient}
                        value={item.value}
                        id={i}
                        type={item.type}
                        size="80"
                      />
                      {arr.length > 1 && (
                        <Button
                          variant="outlined"
                          hidden
                          sx={{
                            height: 20,
                            marginLeft: 2,
                            marginBottom: 0.5,
                            borderColor: "red",
                            alignItems: "center",
                          }}
                          onClick={() => handleRemoveIngredient(i)}
                        >
                          -
                        </Button>
                      )}
                    </div>
                  );
                })}
              </Box>

              <Grid container spacing={3} flexDirection="column">
                <Grid item xs={12} sm={6}>
                  <Box display="flex">
                    <Typography
                      component="h5"
                      variant="subtitle1"
                      marginRight={2}
                      alignSelf="center"
                      width={100}
                    >
                      Instructions *
                    </Typography>
                    <Button
                      variant="outlined"
                      hidden
                      sx={{
                        height: 30,
                        alignItems: "center",
                      }}
                      onClick={addInputInstruction}
                    >
                      +
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      color="red"
                      component="h1"
                      variant="subtitle2"
                      width={420}
                    >
                      {instructionsError}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                marginTop={1}
                marginBottom={15}
                display="flex"
                flexDirection="column"
                marginRight={12}
                flexShrink={1}
              >
                {arrInstruction.map((field, j) => {
                  return (
                    <div>
                      <input
                        onChange={handleAddInstruction}
                        value={field.value}
                        id={j}
                        type={field.type}
                        size="80"
                      />
                      {arrInstruction.length > 1 && (
                        <Button
                          variant="outlined"
                          hidden
                          sx={{
                            height: 20,
                            marginLeft: 2,
                            marginBottom: 0.5,
                            borderColor: "red",
                            alignItems: "center",
                          }}
                          onClick={() => handleRemoveInstruction(j)}
                        >
                          -
                        </Button>
                      )}
                    </div>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
