import Paper from "@mui/material/Paper";
import { Formik, Form } from "formik";
import { FormGroup, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface QuestionProps {
    fetchQuestion?: () => void
}

function Question({fetchQuestion}: QuestionProps) {
  return (
    <Paper variant="outlined" sx={{ py: 1, px: 4, maxWidth: '100%', width: 500 }}>
      <h2>This is sample title</h2>
      <Formik
        initialValues={{
          answers: [],
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {JSON.stringify(values)}
            <FormGroup>
              {["1", "2", "3"].map((item) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label="Label"
                  name="answers"
                  value={item}
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
