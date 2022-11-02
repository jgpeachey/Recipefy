import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import NewAppBar from "../Components/NewAppBar";
import { Paper } from "@mui/material";
import Axios from "axios";

const theme = createTheme();

export default function SignUp() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Axios.post("http://localhost:3000/user/register", {
      Firstname: data.get("firstName"),
      Lastname: data.get("lastName"),
      Username: data.get("username"),
      Email: data.get("email"),
      Password: data.get("password")}
    ).then((response) => {
      console.log("User Created");
    })
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
            backgroundImage: "url(https://source.unsplash.com/random/?food)",
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 10 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
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
