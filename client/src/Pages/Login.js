import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewAppBar from "../Components/NewAppBar";
import { Paper } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({});

export default function Login() {
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
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    const data = new FormData(e.currentTarget);

    function isValidEmail(email) {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email);
    }

    if (!isValidEmail(data.get("email"))) {
      setEmailError(true);
    }

    if (data.get("email") == "") {
      setEmailError(true);
    }

    if (data.get("password") == "") {
      setPasswordError(true);
    }

    Axios.post(buildPath("user/login"), {
      Email: data.get("email"),
      Password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        setEmailHelper("");
        setPasswordHelper("");
        console.log(error.response.data.error);
        if (error.response.data.error === "Invalid Email")
          setEmailHelper(error.response.data.error);
        if (error.response.data.error === "Invalid Password")
          setPasswordHelper(error.response.data.error);
      });

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={emailHelper}
                error={emailError}
              />
              <TextField
                // onChange={() => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordHelper}
                error={passwordError}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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
