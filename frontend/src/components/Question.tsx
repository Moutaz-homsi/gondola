import Paper from "@mui/material/Paper";
import { Formik, Form } from "formik";
import { FormGroup, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface QuestionProps {
    fetchQuestion?: () => void;
    question: any
}

function Question({fetchQuestion, question}: QuestionProps) {

    const authToken = localStorage.getItem("gondolaJwt");

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
            try {                
                const response = await fetch(`${process.env.REACT_APP_API_URL}/add-answer`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authToken}`
                    },
                    body: JSON.stringify({...values, questionId: question.id}),
                  });
                  console.log(response)
            } catch (error) {
                console.error(error)
            }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {JSON.stringify(values)}
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
            <Button disabled={values.answers.length === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
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
