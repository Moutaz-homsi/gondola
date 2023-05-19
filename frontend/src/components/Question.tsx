import Paper from "@mui/material/Paper";
import { Formik, Form } from "formik";
import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';

interface QuestionProps {
    fetchQuestion: () => void;
    question: any
}

function Question({fetchQuestion, question}: QuestionProps) {

    const authToken = localStorage.getItem("gondolaJwt");
    const [isLoading, setIsLoading] = useState(false);

    if ( !question ) {
        return(<p>Loading ....</p>)
    }

  return (
    <Paper variant="outlined" sx={{ py: 1, px: 4, maxWidth: '100%', width: 500 }}>
      <h2>{question.title}</h2>
      <Formik
        initialValues={{
          answers: [],
        }}
        onSubmit={async (values) => {
            setIsLoading(true)
            try {                
                const response = await fetch(`${process.env.REACT_APP_API_URL}/add-answer`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authToken}`
                    },
                    body: JSON.stringify({...values, questionId: question.id}),
                  });
                  const respo = await response.json();
                  if ( respo?.id ) {
                    fetchQuestion()
                  }
            } catch (error) {
                console.error(error)
            }
            setIsLoading(false)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* {JSON.stringify(values)} */}
            <FormGroup>
              {question.choices.map((choice: any) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={choice.choiceText}
                  name="answers"
                  value={choice.choiceText}
                  sx={choiceStyle}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>
            <LoadingButton loading={isLoading} disabled={values.answers.length === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default Question;

const choiceStyle = {
  width: "100%",
  background: "#f2f2f2",
  borderRadius: 1,
  my: 1,
  mx: 0
};
