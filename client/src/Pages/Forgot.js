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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import { useCookies } from "react-cookie";

const theme = createTheme({});

const forgotTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Forgot() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordConfirmHelper, setPasswordConfirmHelper] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setforgotEmail] = useState("");

  const app_name = "recipefy-g1";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  // const[email, setEmail] = useState('');
  // const[password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);

  const handleForgotOpen = () => {
    setForgotOpen(true);
  };

  const handleForgotClose = () => {
    setForgotOpen(false);
  };

  const verify = () => {
    setCaptcha(true);
  };

  const confirmSubmit = (event) => {
    Axios.post(buildPath("user/resetPasswordRequest"), {
      Email: forgotEmail,
    })
      .then((response) => {
        console.log("Email Sent");
        handleForgotClose();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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
          if (response) console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log("cheese");
          handleForgotOpen();
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
            <Dialog
              open={forgotOpen}
              TransitionComponent={forgotTransition}
              keepMounted
              onClose={handleForgotClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Expired Token"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Your token is expired please reenter your email for a new
                  token. If there is an account associated with that email you
                  will receive an email soon.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(newValue) => setforgotEmail(newValue.target.value)}
                  // error={modalError}
                  // helperText={modalHelper}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleForgotClose}>Cancel</Button>
                <Button onClick={confirmSubmit}>Confirm</Button>
              </DialogActions>
            </Dialog>
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
