import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Loading from "../Utils/Loading";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { SIGNUP_LINK } from "../../helper";
import { useHistory } from "react-router";

const SignUp: React.FC = () => {
  const history = useHistory();
  const [isLoadding, setIsLoadding] = useState(false);


  const [usernameInput, setUsernameInput] = useState(false);
  const [usernameBlur, setUsernameBlur] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordBlur, setConfirmPasswordBlur] = useState(false);

  const PASSWORD_LENGTH = 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsLoadding(true);
    fetch(
      SIGNUP_LINK,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "username existed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setIsLoadding(false);
        toast.success("Register success!");
        history.push("/login");
        
      })
      .catch((err) => {
        setIsLoadding(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
      </Helmet>
      {isLoadding && <Loading />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1 }}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"

                  />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="age"
                  fullWidth
                  id="age"
                  label="Age"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   if (e.target.value == "") setAgeBlur(false);

                  //   else if (isNaN(parseInt(e.target.value))) {
                  //     setAgeInput(false);
                  //   } else {
                  //     setAgeInput(true);
                  //   }
                  // }}
                  // onBlur={() => setAgeBlur(true)}
                  // error={!ageInput && ageBlur}
                  // helperText={
                  //   !ageInput && ageBlur ? "Tuổi không chính xác" : ""
                  // }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="email"
                  label="email"
                  name="mail"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) setUsernameInput(false);
                    else setUsernameInput(true);
                  }}
                  onBlur={() => setUsernameBlur(true)}
                  error={!usernameInput && usernameBlur}
                  helperText={
                    !usernameInput && usernameBlur ? "Username cant be empty" : ""
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordInput(e.target.value.trim());
                  }}
                  onBlur={() => setPasswordBlur(true)}
                  error={passwordInput.length < PASSWORD_LENGTH && passwordBlur}
                  helperText={
                    passwordInput.length < PASSWORD_LENGTH && passwordBlur
                      ? "Password must be at least " + PASSWORD_LENGTH +" characters"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPasswordInput(e.target.value.trim());
                  }}
                  onBlur={() => setConfirmPasswordBlur(true)}
                  error={
                    (confirmPasswordInput !== passwordInput) &&
                    confirmPasswordBlur
                  }
                  helperText={
                    (confirmPasswordInput !== passwordInput) &&
                    confirmPasswordBlur
                      ? "Password and confirm do not match"
                      : ""
                  }
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Have an account? Login!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;