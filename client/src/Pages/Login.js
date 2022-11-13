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
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";

const theme = createTheme({});

const forgotTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [open, setOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setforgotEmail] = useState("");

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleForgotOpen = () => {
    setForgotOpen(true);
  };

  const handleForgotClose = () => {
    setForgotOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const [captcha, setCaptcha] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");

  const verify = () => {
    setCaptcha(true);
  };

  const handleSubmit = (e) => {
    // const token = captchaRef.current.getValue();
    // console.log(token);
    // captchaRef.current.reset();
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

    if (data.get("email") === "") {
      setEmailError(true);
    }

    if (data.get("password") === "") {
      setPasswordError(true);
    }
    Axios.post(buildPath("user/login"), {
      Email: data.get("email").toLowerCase(),
      Password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
        setCookie("token", response.data.auth.accessToken, { path: "/" });
        setCookie("id", response.data.user.id, { path: "/" });
        setCookie("first", response.data.user.firstName, { path: "/" });
        setCookie("last", response.data.user.lastName, { path: "/" });
        setCookie("picture", response.data.user.pic, { path: "/" });
        setCookie("email", response.data.user.email, { path: "/" });
        setCookie("username", response.data.user.userName, { path: "/" });
        navigate("/home");
      })
      .catch((error) => {
        setEmailHelper("");
        setPasswordHelper("");
        setEmailError(false);
        setPasswordError(false);
        console.log(error.response.data.error);
        if (error.response.data.error === "Invalid Email")
          setEmailHelper(error.response.data.error);
        setEmailError(true);
        if (error.response.data.error === "Invalid Password")
          setPasswordHelper(error.response.data.error);
        setPasswordError(true);
        if (error.response.data.error === "Please verify your email first")
          setOpen(true);
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

                {/* <Reaptcha
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  explicit
                  onVerify={verify}
                /> */}
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
              <Link to="/forgotpassword" variant="body2">
                cheesepizza
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!captcha}
              >
                Sign In
              </Button>
              <Grid container>
                <Dialog
                  open={forgotOpen}
                  TransitionComponent={forgotTransition}
                  keepMounted
                  onClose={handleForgotClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Forgot Password"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Please type your email in to reset your password. If there
                      is an account associated with that email you will receive
                      an email soon.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={(newValue) =>
                        setforgotEmail(newValue.target.value)
                      }
                      // error={modalError}
                      // helperText={modalHelper}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleForgotClose}>Cancel</Button>
                    <Button onClick={confirmSubmit}>Confirm</Button>
                  </DialogActions>
                </Dialog>
                <Grid item xs>
                  <Link onClick={handleForgotOpen}>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
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
