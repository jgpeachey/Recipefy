import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeAppBar from "../Components/HomeAppBar";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { Avatar, DialogActions } from "@mui/material";

const theme = createTheme();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const updateTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Profile() {
  const [cookies, setCookie] = useCookies(["user"]);
  const app_name = "recipefy-g1";
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  const [base64Picture, setBase64Picture] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [pictureSuccess, setPictureSuccess] = useState("");

  const handlePicture = (event) => {
    setPictureError("");
    // setPictureSuccess("Default selected");
    setBase64Picture("");
    const fileInput = document.getElementById("profilePic");
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

  const navigate = useNavigate();

  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [updatePasswordError, setupdatePasswordError] = useState(false);
  const [updatePasswordModalError, setupdatePasswordModalError] =
    useState(false);

  const [firstHelper, setFirstHelper] = useState("");
  const [lastHelper, setLastHelper] = useState("");
  const [usernameHelper, setUsernameHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordConfirmHelper, setPasswordConfirmHelper] = useState("");
  const [modalHelper, setModalHelper] = useState("");
  const [updatePasswordHelper, setupdatePasswordHelper] = useState("");
  const [updatePasswordModalHelper, setupdatePasswordModalHelper] =
    useState("");

  const updatePassword = (event) => {
    if (!(newpassword === confirmPassword)) {
      setupdatePasswordModalError(true);
      setupdatePasswordModalHelper("Passwords do not match");
    } else {
      Axios.put(
        buildPath("user/updateuser"),
        {
          Email: cookies.email,
          Password: password,
          Info: {
            Password: newpassword,
          },
        },
        {
          headers: {
            authorization: cookies.token,
          },
        }
      )
        .then((response) => {
          console.log(response);
          handleUpdateClose();
        })
        .catch((error) => {
          console.log(error);
          setupdatePasswordError(true);
          setupdatePasswordHelper("Invalid Password");
        });
    }
  };

  const deleteSubmit = (event) => {
    Axios.delete(buildPath("user/deleteuser"), {
      headers: {
        authorization: cookies.token,
      },
      data: {
        Email: cookies.email,
        Password: password,
      },
    })
      .then((response) => {
        console.log("User Deleted");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.data.error === "Invalid password") {
          setModalError(true);
          setModalHelper(error.response.data.error);
        }
        if (error.response.data.error === "Email Exists") {
          setEmailHelper(error.response.data.error);
        }
        console.log(error.response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstError(false);
    setLastError(false);
    setUserError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);

    setFirstHelper("");
    setLastHelper("");
    setUsernameHelper("");
    setEmailHelper("");
    setPasswordHelper("");
    setPasswordConfirmHelper("");
    const data = new FormData(event.currentTarget);

    // function isValidEmail(email) {
    //   return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email);
    // }

    // if (!isValidEmail(data.get("email"))) {
    //   setEmailError(true);
    //   setEmailHelper("Invalid email");
    // }

    if (data.get("firstName") === "") {
      setFirstError(true);
      setFirstHelper("Enter a first name");
    }

    if (data.get("lastName") === "") {
      setLastError(true);
      setLastHelper("Enter a last name");
    }

    // if (data.get("username") === "") {
    //   setUserError(true);
    //   setUsernameHelper("Enter an username");
    // }

    // if (data.get("email") === "") {
    //   setEmailError(true);
    //   setEmailHelper("Enter an email");
    // }

    if (data.get("password") === "") {
      setPasswordError(true);
      setPasswordHelper("Enter a password");
    }

    if (data.get("passwordConfirm") === "") {
      setPasswordConfirmError(true);
    }

    if (!(data.get("password") === data.get("passwordConfirm"))) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      setPasswordConfirmHelper("Passwords do not match");
    } else {
      Axios.put(
        buildPath("user/updateuser"),
        {
          Email: cookies.email,
          Password: data.get("password"),
          Info: {
            Firstname: data.get("firstName"),
            Lastname: data.get("lastName"),
          },
        },
        {
          headers: {
            authorization: cookies.token,
          },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeAppBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              marginTop={5}
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {cookies.username}
            </Typography>
            <Box
              marginBottom={1}
              textAlign="center"
              align="center"
              justifyContent="center"
              display="flex"
            >
              <Avatar
                src={cookies.picture}
                sx={{
                  width: 72,
                  height: 72,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome, {cookies.first} {cookies.last}
            </Typography>

            {/* <Box marginTop={2} textAlign="center">
              <Button variant="outlined" component="label">
                Change Profile Picture
                <input
                  id="profilePic"
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
            </Box> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={firstError}
                    helperText={firstHelper}
                    defaultValue={cookies.first}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={lastError}
                    helperText={lastHelper}
                    defaultValue={cookies.last}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    name="username"
                    autoComplete="username"
                    error={userError}
                    helperText={usernameHelper}
                    defaultValue={cookies.username}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailHelper}
                    defaultValue={cookies.email}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                    helperText={passwordHelper}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Re-enter Password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    error={passwordConfirmError}
                    helperText={passwordConfirmHelper}
                  />
                </Grid> */}
              </Grid>
              <div
                style={{
                  marginTop: 1,
                  display: "flex",
                  placeContent: "center",
                }}
              >
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Delete Account"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure you want to delete your account?
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={(newValue) =>
                        setPassword(newValue.target.value)
                      }
                      error={modalError}
                      helperText={modalHelper}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteSubmit}>Yes</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={updateOpen}
                  TransitionComponent={updateTransition}
                  keepMounted
                  onClose={handleUpdateClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Update Password"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Please type in the fields to change your password.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Current Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={(newValue) =>
                        setPassword(newValue.target.value)
                      }
                      error={updatePasswordError}
                      helperText={updatePasswordHelper}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="New Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={(newValue) =>
                        setNewPassword(newValue.target.value)
                      }
                      error={updatePasswordModalError}
                      helperText={updatePasswordModalHelper}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={(newValue) =>
                        setConfirmPassword(newValue.target.value)
                      }
                      error={updatePasswordModalError}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                    <Button onClick={updatePassword}>Yes</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={handleUpdateOpen}
                  >
                    Update Password?
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={handleClickOpen}
                  >
                    Delete Account?
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}></Grid>
            ))}
          </Grid> */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
