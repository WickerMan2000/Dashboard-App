import { FormEvent } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  padding-bottom: 10px;
`;

const StyledForm = styled.form`
  margin: 20px;
  max-width: 45%;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 15px;
`;

const FeedBack = styled.p`
  margin: 1px;
  color: red;
  display: inline-block;
  font-size: 12px;
`;

export const Form = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormControl variant="standard">
        <InputLabel shrink htmlFor="name">
          Name
        </InputLabel>
        <TextField
          name="name"
          id="name"
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Name"
          inputProps={{
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack>Feedback</FeedBack>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="email">
          Email address
        </InputLabel>
        <TextField
          name="email"
          id="email"
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Email address"
          inputProps={{
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="phone">
          Phone
        </InputLabel>
        <TextField
          name="phone"
          id="phone"
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Phone"
          inputProps={{
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="address">
          Address
        </InputLabel>
        <TextField
          name="address"
          id="address"
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Address"
          inputProps={{
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="company">
          Company
        </InputLabel>
        <TextField
          name="company"
          id="company"
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Company"
          inputProps={{
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <StyledButtons>
        <Button variant="outlined" sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ textTransform: "none" }}>
          Save
        </Button>
      </StyledButtons>
    </StyledForm>
  );
};
