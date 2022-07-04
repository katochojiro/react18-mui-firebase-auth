import * as React from "react";
import {
  Avatar,
  Button,
  Divider,
  TextField,
  Grid,
  Box,
  FormControlLabel,
  Link,
  Typography,
  Container,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import { useSelector, useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../libs/firebase";
import { useNavigate } from "react-router-dom";

import { setLoggedIn } from "../../store/auth/authSlice";
import toastify from "../../libs/toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2 }}> Or Sign With </Divider>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ marginTop: 2 }}
            startIcon={<GoogleIcon></GoogleIcon>}
            onClick={(e) => {
              e.preventDefault();
              const googleAuthProvider = new GoogleAuthProvider();
              signInWithPopup(auth, googleAuthProvider)
                .then((result) => {
                  dispatch(
                    setLoggedIn({
                      displayName: result.user.displayName,
                      email: result.user.email,
                      photoURL: result.user.photoURL,
                    })
                  );
                  toastify.success("Successfully Logged In");
                  navigate("/home");
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            Sign In with Google
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
