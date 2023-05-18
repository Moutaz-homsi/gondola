import React, { useState } from "react";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Login from "./components/Login";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./providers/AuthProvider";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

const defaultTheme = createTheme();

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
