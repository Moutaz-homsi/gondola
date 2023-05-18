import React from "react"

import "./App.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import Login from "./components/Login"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const defaultTheme = createTheme()

function App() {
  const isLoggedIn = false

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!isLoggedIn && <Login />}{" "}
      </Container>
    </ThemeProvider>
  )
}

export default App
