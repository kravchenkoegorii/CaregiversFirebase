import LockIcon from "@mui/icons-material/Lock";

import { Avatar, Button, Card, CardActions, CircularProgress, Link, Stack, Typography } from "@mui/material";

import Box from "@mui/material/Box";

import { grey } from "@mui/material/colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useState } from "react";
import { Form, required, TextInput, useLogin, useNotify, useStore, useTranslate } from "react-admin";
import { useLocation } from "react-router-dom";
import { AuthType, UserRole } from "../../abstracts/enums";
import { firebaseAuth, writeNewUserRole } from "../../middleware/firebase";

interface FormValues {
  username?: string;
  password?: string;
}

const AuthPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useStore<FormValues>("auth.values", {});

  const [authType, setAuthType] = useStore<AuthType>("auth.type", AuthType.SignIn);

  const translate = useTranslate();

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();


  const handleNotifyError = (error: Error) => {
    notify(
      typeof error === "string"
        ? error
        : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
      {
        type: "error",
        messageArgs: {
          _:
            typeof error === "string"
              ? error
              : error && error.message
                ? error.message
                : undefined
        }
      }
    );
  };

  const signIn = (auth: FormValues) => {
    setLoading(true);
    login(
      auth,
      location.state ? (location.state as any).nextPathname : "/"
    ).then(
      (data) => localStorage.setItem("userId", data.user.uid)
    ).catch((error: Error) => {
      setLoading(false);
      handleNotifyError(error);
    });
  };

  const signUp = (auth: FormValues) => {
    setLoading(true);
    const { username: email, password } = auth;

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (user) =>
        writeNewUserRole(user.user.uid, UserRole.Elderly))
      .then(() => signIn(auth))
      .catch((error: Error) => {
        setLoading(false);
        handleNotifyError(error);
      });
  };

  const handleSignUpSubmit = (auth: FormValues) => {
    signUp(auth);
  };

  const handleSignInSubmit = (auth: FormValues) => {
    signIn(auth);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (authType === AuthType.SignUp) {
    return (
      <Form onSubmit={handleSignUpSubmit} noValidate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundImage:
              "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%);",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <Card sx={{ minWidth: 300, marginTop: "6em" }}>
            <Box
              sx={{
                margin: "1em",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Avatar sx={{ backgroundColor: grey[500] }}>
                <LockIcon />
              </Avatar>
            </Box>
            <Box
              sx={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "center",
                color: theme => theme.palette.grey[500]
              }}
            >Signup as Elderly</Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  defaultValue={formData.username}
                  onChange={onChange}
                  source="username"
                  label="Email"
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  defaultValue={formData.password}
                  onChange={onChange}
                  source="password"
                  label={translate("ra.auth.password")}
                  type="password"
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
            </Box>
            <CardActions sx={{ padding: "0 1em 1em 1em" }}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading && (
                  <CircularProgress size={25} thickness={2} />
                )}
                Sign Up
              </Button>
            </CardActions>
            <Stack
              color={grey[500]}
              direction="row"
              justifyContent="center"
              sx={{
                color: theme => theme.palette.grey[500],
                cursor: "pointer",
                padding: "0 0 0.4em 0"
              }}
              spacing={0.5}
            >

              <Typography>Already have an account?</Typography>
              <Link underline="none" onClick={() => setAuthType(AuthType.SignIn)}>Sign In</Link>
            </Stack>
          </Card>
        </Box>
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSignInSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundImage:
            "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%);",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Avatar sx={{ backgroundColor: grey[500] }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: theme => theme.palette.grey[500]
            }}
          ></Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                defaultValue={formData.username}
                onChange={onChange}
                source="username"
                label="Email"
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                defaultValue={formData.password}
                onChange={onChange}
                source="password"
                label={translate("ra.auth.password")}
                type="password"
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && (
                <CircularProgress size={25} thickness={2} />
              )}
              {translate("ra.auth.sign_in")}
            </Button>
          </CardActions>
          <Stack
            color={grey[500]}
            direction="row"
            justifyContent="center"
            sx={{
              color: theme => theme.palette.grey[500],
              cursor: "pointer",
              padding: "0 0 0.4em 0"
            }}
            spacing={0.5}
          >

            <Typography>Not a member?</Typography>
            <Link underline="none" onClick={() => setAuthType(AuthType.SignUp)}>Sign Up</Link>
          </Stack>
        </Card>
      </Box>
    </Form>
  );
};

export default AuthPage;
