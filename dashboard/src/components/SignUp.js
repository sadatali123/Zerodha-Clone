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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";
import { Signup } from "../../../backend/controllers/AuthController";
import "./signUp.css";
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
    <div className="form_container">
      <h2>Signup Now</h2>
      {alert.st && <Alert severity="error">{alert.msg}</Alert>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        <span>
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </span>
      </form>
    </div>
  );
}