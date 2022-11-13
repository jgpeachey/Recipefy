import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewAppBar from "../Components/NewAppBar";
import { Paper } from "@mui/material";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ReCaptchaV2 from "react-google-recaptcha";
import { useSearchParams } from "react-router-dom";

const theme = createTheme({});

export default function Forgot() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordConfirmHelper, setPasswordConfirmHelper] = useState("");

  const app_name = "recipefy-g1";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  const navigate = useNavigate();
  // const[email, setEmail] = useState('');
  // const[password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);

  const verify = () => {
    setCaptcha(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setPasswordError(false);
    setPasswordConfirmError(false);
    setPasswordHelper("");
    setPasswordConfirmHelper("");

    if (data.get("password") == "") {
      setPasswordError(true);
      setPasswordHelper("Enter a password");
    }

    if (data.get("confirmpassword") == "") {
      setPasswordConfirmError(true);
    }

    if (!(data.get("password") === data.get("confirmpassword"))) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      setPasswordConfirmHelper("Passwords do not match");
    } else {
      Axios.post(buildPath("user/resetPassword"), {
        userId: searchParams.get("id"),
        token: searchParams.get("token"),
        newPassword: data.get("password"),
      })
        .then((response) => {
          console.log(response);
          // navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data.error);
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
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                // onChange={() => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                type="password"
                autoFocus
                error={passwordError}
                helperText={passwordHelper}
              />
              <TextField
                // onChange={() => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="confirmpassword"
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                error={passwordConfirmError}
                helperText={passwordConfirmHelper}
              />
              <div
                style={{
                  marginTop: 1,
                  display: "flex",
                  placeContent: "center",
                }}
              >
                <ReCaptchaV2
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  onChange={verify}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!captcha}
              >
                Done
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
