import { Box } from "@mui/material";
import Question from "./Question";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

function Questions() {
  const authToken = localStorage.getItem("gondolaJwt");

  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState("");

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/random-question`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const respo = await response.json();

      if (!respo.error) {
        if (respo.stat === "Ok!") {
          setData(respo.randomQuestion);
        } else {
          setMessage(respo.stat);
        }
      } else {
        console.error(respo.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ minHeight: "calc(100vh - 96px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {!message ? <Question key={data?.id} question={data} fetchQuestion={fetchQuestion} /> : <Alert severity="success">{message}</Alert>}      
    </Box>
  );
}

export default Questions;
