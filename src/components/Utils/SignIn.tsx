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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { getUserWhenReload, LOGIN_LINK } from "../../helper";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoadding, setIsLoadding] = useState(false);
  const [showPassword, setShowPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsLoadding(true);
    fetch(
      LOGIN_LINK,
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
            let errorMessage = "Tài khoản hoặc mật khẩu không chính xác!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        toast("Đăng nhập thành công!");
        return getUserWhenReload(data.token);
      })
      .then((user) => {
        if (!user) toast("err!");
        dispatch({ type: ActionType.LOAD_USER, payload: user });
        setIsLoadding(false);

        history.go(0);
        history.push("/");

  
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
        <title>Login</title>
      </Helmet>
      {isLoadding && <Loading />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 16,
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
            Login To BRS
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              }}
            />
            <span style={{ position: "relative" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword === "show" ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!showPassword) {
                    setShowPassword("hide");
                  }
                  if (!e.target.value) {
                    setShowPassword("");
                  }
                }}
              />
              {showPassword && (
                <FontAwesomeIcon
                  icon={showPassword === "hide" ? faEyeSlash : faEye}
                  style={{
                    position: "absolute",
                    color: "var(--primary-color)",
                    fontSize: "1.2rem",
                    top: 32,
                    right: 13,
                  }}
                  onClick={() =>
                    setShowPassword((state) =>
                      state === "hide" ? "show" : "hide"
                    )
                  }
                />
              )}
            </span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container direction="column" alignItems="center">
              {/* <Grid item xs>
                <Link href="/forget-password" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register now!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
