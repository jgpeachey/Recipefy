import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewAppBar from "../Components/NewAppBar";
import { Paper } from "@mui/material";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { ClassNames } from "@emotion/react";
import ReCaptchaV2 from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const theme = createTheme();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Register() {
  var SliderData = [
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      image:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg",
    },
    {
      image:
        "https://eadn-wc02-3894996.nxedge.io/wp-content/uploads/2018/01/pistachio-turmeric-rice-bowl6-scaled.jpg",
    },
    {
      image:
        "https://www.justonecookbook.com/wp-content/uploads/2020/03/Okonomiyaki-Recipe-5674-I-500x500.jpg",
    },
    {
      image:
        "http://del.h-cdn.co/assets/17/39/2048x1536/sd-aspect-1506456157-delish-honey-garlic-glazed-salmon-1.jpg",
    },
  ];
  const [cookies, setCookie] = useCookies(["user"]);
  const [captcha, setCaptcha] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const app_name = "recipefy-g1";
  const [open, setOpen] = useState(false);

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
  const verifyCheckBox = () => {
    setCheckBox(true);
  };

  const verifyCaptcha = () => {
    setCaptcha(true);
  };

  const [base64Picture, setBase64Picture] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [pictureSuccess, setPictureSuccess] = useState("Default selected");

  const handlePicture = (event) => {
    setPictureError("");
    setPictureSuccess("Default selected");
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
  const [passwordStrengthValid, setPasswordStrengthValid] = useState(false);

  const [firstHelper, setFirstHelper] = useState("");
  const [lastHelper, setLastHelper] = useState("");
  const [usernameHelper, setUsernameHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordConfirmHelper, setPasswordConfirmHelper] = useState("");
  const [passwordStrengthHelper, setPasswordStrengthHelper] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Very Weak");

  var pass;
  var strengthbar = document.getElementById("meter");
  useEffect(() => {
    pass = document.getElementById("password");
    if (pass) {
      pass.addEventListener("keyup", function (e) {
        strengthbar = document.getElementById("meter");
        checkPasswordStrength(pass.value);
      });
    }
  }, [document.getElementById("password")]);

  function checkPasswordStrength(password) {
    setPasswordStrengthValid(false);
    setPasswordStrengthHelper(
      "Your password must contain a minimum of 8 characters, a lowercase letter, an uppercase letter, a number, and a symbol"
    );
    var strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    if (password.length >= 8) {
      strength += 1;
    }

    switch (strength) {
      case 0:
        strengthbar.value = 0;
        setPasswordStrength("Very weak");
        setPasswordStrengthValid(false);
        break;

      case 1:
        strengthbar.value = 25;
        setPasswordStrength("Weak");
        setPasswordStrengthValid(false);
        break;

      case 2:
        strengthbar.value = 50;
        setPasswordStrength("Medium");
        setPasswordStrengthValid(false);
        break;

      case 3:
        strengthbar.value = 75;
        setPasswordStrength("Strong");
        setPasswordStrengthValid(false);
        break;

      case 4:
        strengthbar.value = 75;
        setPasswordStrength("Strong");
        setPasswordStrengthValid(false);
        break;

      case 5:
        strengthbar.value = 100;
        setPasswordStrength("Very strong");
        setPasswordStrengthValid(true);
        setPasswordStrengthHelper("");
        break;
    }
  }

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

    function isValidEmail(email) {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email);
    }

    if (!isValidEmail(data.get("email"))) {
      setEmailError(true);
      setEmailHelper("Invalid email");
    }

    if (data.get("firstName") == "") {
      setFirstError(true);
      setFirstHelper("Enter a first name");
    }

    if (data.get("lastName") == "") {
      setLastError(true);
      setLastHelper("Enter a last name");
    }

    if (data.get("username") == "") {
      setUserError(true);
      setUsernameHelper("Enter an username");
    }

    if (data.get("email") == "") {
      setEmailError(true);
      setEmailHelper("Enter an email");
    }

    if (data.get("password") == "") {
      setPasswordError(true);
      setPasswordHelper("Enter a password");
    }

    if (data.get("passwordConfirm") == "") {
      setPasswordConfirmError(true);
    }

    if (passwordStrengthValid == false) {
      return;
    } else if (!(data.get("password") == data.get("passwordConfirm"))) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      setPasswordConfirmHelper("Passwords do not match");
    } else if (isValidEmail(data.get("email"))) {
      console.log(base64Picture);
      Axios.post(buildPath("user/register"), {
        Firstname: data.get("firstName"),
        Lastname: data.get("lastName"),
        Username: data.get("username"),
        Email: data.get("email").toLowerCase(),
        Pic: base64Picture,
        Password: data.get("password"),
      })
        .then((response) => {
          handleClickOpen();

          console.log("User Created");
        })
        .catch((error) => {
          /*setUsernameHelper("");
          setEmailHelper("");*/
          if (error.response.data.error === "Username Exists") {
            setUsernameHelper(error.response.data.error);
          }
          if (error.response.data.error === "Email Exists") {
            setEmailHelper(error.response.data.error);
          }
          console.log(error.response.data);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NewAppBar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${
              SliderData[Math.floor(Math.random() * (7 - 0 + 1)) + 0].image
            })`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 10 }}> */}
            {/* <LockOutlinedIcon /> */}
            {/* </Avatar> */}
            <Typography
              variant="h3"
              marginTop={10}
              marginBottom={2}
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
              className="Login-Header"
            >
              Recipefy
            </Typography>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box marginTop={2} alignItems="left" textAlign="center">
              <Button variant="outlined" component="label">
                Upload Profile Picture
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
            </Box>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    name="username"
                    autoComplete="username"
                    error={userError}
                    helperText={usernameHelper}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailHelper}
                  />
                </Grid>
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
                <Grid item xs={12} marginTop={-1}>
                  <Typography variant="body2">
                    Strength: {passwordStrength}
                  </Typography>
                  <progress max="100" value="0" id="meter"></progress>
                  <Typography variant="body2" color="red">
                    {passwordStrengthHelper}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    required
                    control={<Checkbox value="allowEmails" color="primary" />}
                    label="You consent to receiving emails from us for verification."
                    onChange={verifyCheckBox}
                    sx={{ mt: 1, mb: 1 }}
                  />
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: 1,
                  display: "flex",
                  placeContent: "center",
                }}
              >
                <ReCaptchaV2
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  onChange={verifyCaptcha}
                />
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Email Verification"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Please check your email to finish registration. You can
                      safely close this window now.
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!captcha || !checkbox}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

// import React from 'react';
// import "./index.css"

// import { useState } from 'react';

// export default function Register()
// {
//     //States for registration
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     //States for checking the errors
//     const [submitted, setSubmitted] = useState(false);
//     const [error, setError] = useState(false);

//     //Handle event for name
//     const handleUsername = (e) => {
//         setUsername(e.target.value);
//         setSubmitted(false);
//     };

//     //Handle event for email
//     const handleEmail = (e) => {
//         setEmail(e.target.value);
//         setSubmitted(false);
//     };

//     //Handle event for password
//     const handlePassword = (e) => {
//         setPassword(e.target.value);
//         setSubmitted(false);
//     };

//     //Handle submission of the form
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (username === '' || email === '' || password === '') {
//          setError(true);
//         }
//         else {
//             setSubmitted(true);
//             setError(false);
//         }
//     };

//     //Show success message
//     const successMessage = () => {
//         return (
//         <div
//             className="success"
//             style={{
//             display: submitted ? '' : 'none',
//             }}>
//             <h1>User {username} successfully registered!!</h1>
//         </div>
//         );
//     };

//     //Show error message if error is true
//     const errorMessage = () => {
//         return (
//         <div
//             className="error"
//             style={{
//             display: error ? '' : 'none',
//             }}>
//             <h1>Please enter all the fields</h1>
//         </div>
//         );
//     };

//     return (
//         <div className="Register-Form">
//           <div className="Title">
//             <h1>Register</h1>
//           </div>

//           {/* Calling to the methods */}
//           <div className="Messages">
//             {errorMessage()}
//             {successMessage()}
//           </div>

//           <form method="post">
//             {/* Labels and inputs for form data */}
//             <input placeholder ="Username" onChange={handleUsername} className="Register-Input"
//               value={username} type="text" />

//             <input placeholder ="Email" onChange={handleEmail} className="Register-Input"
//               value={email} type="email" />

//             <input placeholder="Password" onChange={handlePassword} className="Register-Input"
//               value={password} type="password" />

//             <button onClick={handleSubmit} className="btn" type="submit">
//               Submit
//             </button>
//           </form>
//         </div>
//     );
// }
