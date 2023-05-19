import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import Questions from "./Questions";

function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gondolaJwt");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" sx={{ textTransform: "capitalize", flexGrow: 1 }}>
            Hello {user?.username}
          </Typography>
          {user && (
            <Button onClick={handleLogout} sx={{ color: "#fff" }}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box mt={8} p={2}>
        {!user && (
          <>
            <p>To see random question please login</p>
            <Button onClick={() => navigate("/login", { replace: true })} variant="outlined">
              Login
            </Button>
          </>
        )}
        {user &&
            <Questions />
        }
      </Box>
    </>
  );
}

export default Home;
