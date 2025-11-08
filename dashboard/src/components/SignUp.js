import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";
//import { Signup } from "../../../backend/controllers/AuthController";
const defaultTheme = createTheme();

export default function Register() {
  let [alert, setAlert] = React.useState({ st: false, msg: "" });
  const navigate = useNavigate();
  const { login, user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      username: formData.get("Username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!data.username || !data.email || !data.password) {
      setAlert({ st: true, msg: "Enter Valid Details" });
    }

    axios
      .post("https://zerodha-backend-60pf.onrender.com/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        await login(res.data.token);
      })
      .catch((error) => {
        if (error.response) {
          setAlert({ st: true, msg: error.response.data.error });
        } else if (error.request) {
          setAlert({ st: true, msg: "Network Error" });
        } else {
          setAlert({ st: true, msg: "Something Went Wrong" });
        }
      });
  };

  return (
  <ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Signup Now
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {alert.st && <Alert severity="error">{alert.msg}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="Username"
          label="Username"
          name="Username"
          autoComplete="given-name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "primary.main" }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
</ThemeProvider>

  );
}