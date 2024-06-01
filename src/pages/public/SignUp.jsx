import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegexConfig } from "../../config/RegexConfig";
import { decodeToken, errorHandler } from "../../helpers";
import { addUserCredential } from "../../redux/actions";
import { IconButton, InputAdornment, LinearProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "../../http/http-calls";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const _togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const _validateFormFields = ({ newFormFields, newIsDirty }) => {
    return new Promise((resolve) => {
      const newErrors = { ...errors };
      let isFormValid = true;

      Object.keys(newFormFields).forEach((key) => {
        if (newIsDirty[key]) {
          switch (key) {
            case "email": {
              if (newFormFields[key]?.trim().length) {
                if (
                  RegexConfig.email.test(
                    String(newFormFields[key]).toLowerCase()
                  )
                ) {
                  delete newErrors[key];
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] = "*Invalid email";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;
            }
            case "password": {
              if (newFormFields[key]?.length) {
                delete newErrors[key];
                newIsDirty[key] = false;
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;
            }
            default:
          }
        }
      });

      setErrors(newErrors);
      setIsDirty(newIsDirty);

      resolve(isFormValid);
    });
  };

  const _onChangeFormFields = (key, value) => {
    const newFormFields = { ...formFields };
    newFormFields[key] = value;
    setFormFields(newFormFields);

    const newErrors = { ...errors };
    if (newErrors[key]) {
      newErrors[key] = false;
      setErrors(newErrors);
    }
  };

  const _onBlurFormFields = (key) => {
    const newFormFields = { ...formFields };
    const newIsDirty = { ...isDirty };
    newIsDirty[key] = true;

    _validateFormFields({ newFormFields, newIsDirty });
  };

  // eslint-disable-next-line no-unused-vars
  const _completedAuthorization = (res = {}) => {
    try {
      let userData;
      if (!res.user) {
        userData = decodeToken(res.token);
        res.user = userData;
      }

      dispatch(addUserCredential({ token: res.token, user: res.user }));

      navigate("/dashboard");
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const _onSubmit = async (e) => {
    try {
      if (e) e.preventDefault();

      const newFormFields = { ...formFields };
      const newIsDirty = { ...isDirty };
      Object.keys(newFormFields).forEach((key) => {
        newIsDirty[key] = true;
      });

      const isFormValid = await _validateFormFields({
        newFormFields,
        newIsDirty,
      });

      if (!isFormValid) {
        return;
      }

      setLoading(true);

      const payload = {
        ...formFields,
      };

      const res = await signup(payload);

      _completedAuthorization(res);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>

          <Box component="form" onSubmit={_onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id={"email"}
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
              onChange={(e) => _onChangeFormFields("email", e.target.value)}
              onBlur={() => _onBlurFormFields("email")}
              value={formFields.email}
              error={errors?.email ? true : false}
              helperText={errors?.email ? errors.email : ""}
              disabled={loading}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id={"password"}
              autoComplete="current-password"
              onChange={(e) => _onChangeFormFields("password", e.target.value)}
              onBlur={() => _onBlurFormFields("password")}
              value={formFields.password}
              error={errors?.password ? true : false}
              helperText={errors?.password ? errors.password : ""}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={_togglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {loading ? (
              <Box variant="contained" sx={{ mt: 3, mb: 2 }}>
                <LinearProgress />
              </Box>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid item>
                    <Link to={"/signin"} variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
