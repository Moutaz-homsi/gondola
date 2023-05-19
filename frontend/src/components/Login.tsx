import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from '@mui/lab/LoadingButton';

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required"),
});

// interface LoginProps {
// setIsLoggedIn: (isLoggedIn: boolean) => void
// }

export default function Login() {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 440,
        margin: "auto",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            try {
              const value = {
                identifier: values.email,
                password: values.password,
              };
              const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/local`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
              });

              const data = await response.json();
              if (data?.error) {
                throw data?.error;
              } else {
                localStorage.setItem("gondolaJwt", data.jwt);
                setUser(data.user);
                navigate('/')
                // TODO : Show success message from snack provider
              }
            } catch (error: any) {
              console.error(error);
              setError(error?.message ?? "Something went wrong!");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {/* {JSON.stringify(values)}
              {JSON.stringify(errors)} */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton loading={isLoading} disabled={!isValid} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </LoadingButton>
              {error && <Alert severity="error">{error}</Alert>}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
