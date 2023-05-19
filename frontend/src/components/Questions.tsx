import { Box } from "@mui/material";
import Question from "./Question";
import { useEffect, useState } from "react";

function Questions() {
  const authToken = localStorage.getItem("gondolaJwt");

  const [data, setData] = useState(null);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/random-question`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const respo = await response.json();
      console.log(respo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    /*
    Query logic
    */
    console.log("i fire once");
  }, []);

  return (
    <Box sx={{ minHeight: "calc(100vh - 96px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Question />
    </Box>
  );
}

export default Questions;
