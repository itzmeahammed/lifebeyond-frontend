import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";
import "../styles/components/login.scss";
import axios from "axios";
import { SIGN_IN_URL, SIGN_UP_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(SIGN_IN_URL, {
        email: loginEmail,
        password: loginPassword,
      });
      Cookies.set("token", response?.data?.token);
      Cookies.set("role", response?.data?.role);
      setisSubmitted(true);
    } catch (error) {
      console.log(error);
    }
    setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SIGN_UP_URL, {
        username: signUpUsername,
        number: mobile,
        email: signUpEmail,
        role: role,
        password: signUpPassword,
        avatar: "",
        bio: "",
      });
      Cookies.set("token", response?.data?.token);
      Cookies.set("role", response?.data?.role);
      setisSubmitted(true);
    } catch (error) {
      console.log(error);
    }
    setError("");
  };

  const isLoginButtonDisabled = !loginEmail || !loginPassword;
  const isSignUpButtonDisabled =
    !signUpUsername || !signUpEmail || !signUpPassword || !mobile || !role;

  useEffect(() => {
    const token = Cookies.get("token");
    const roleofLogin = Cookies.get("role");

    if (token && roleofLogin) {
      roleofLogin == "user" && navigate("/dashboard");
      roleofLogin == "admin" && navigate("/admin");
      roleofLogin == "doctor" && navigate("/doctor");
      roleofLogin == "lawyer" && navigate("/lawyer");
    }
  }, [isSubmitted]);

  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <div className='login-form'>
          <div className='login-page-form-div'>
            {!showSignup ? (
              <>
                <h1 className='header-login'>Login</h1>
                <div className='login-page-container'>
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant='contained'
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoginButtonDisabled}
                    sx={{
                      padding: "12px",
                      fontWeight: "bold",
                      backgroundColor: isLoginButtonDisabled
                        ? "#ccc"
                        : "#080808",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 2 }}>
                    Don't have an account?
                  </Typography>
                  <Button
                    variant='outlined'
                    fullWidth
                    onClick={() => setShowSignup(true)}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      borderColor: "#080808",
                      color: "#fff",
                      backgroundColor: "#000",
                      "&:hover": {
                        borderColor: "#000000",
                        color: "#000",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className='header-login'>Sign Up</h1>
                <div className='login-page-container'>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label='Role'
                    >
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='user'>User</MenuItem>
                      <MenuItem value='doctor'>Doctor</MenuItem>
                      <MenuItem value='lawyer'>Lawyer</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label='Username'
                    variant='outlined'
                    fullWidth
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Mobile Number'
                    variant='outlined'
                    fullWidth
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant='contained'
                    fullWidth
                    onClick={handleSignUp}
                    disabled={isSignUpButtonDisabled}
                    sx={{
                      padding: "12px",
                      fontWeight: "bold",
                      backgroundColor: isSignUpButtonDisabled ? "#000" : "#000",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 2 }}>
                    Already have an account?
                  </Typography>
                  <Button
                    variant='outlined'
                    fullWidth
                    onClick={() => setShowSignup(false)}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      borderColor: "#080808",
                      color: "#fff",
                      backgroundColor: "#000",
                      "&:hover": {
                        borderColor: "#000000",
                        color: "#000",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
