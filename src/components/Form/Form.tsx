import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputContext, { defaultPerson } from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import LoadingContext from "../../store/LoadingContextProvider";
import { PersonInterface } from "../../types/types";
import { defaultFeedback, useFeedback } from "../../customHooks/useFeedback";

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
  margin-bottom: 6px;
  color: red;
  display: inline-block;
  font-size: 12px;
`;

export const Form = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { person, setUpdatedPerson } = useContext(InputContext);
  const { feedback, setFeedback, validator } = useFeedback();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [input, setInput] = useState<PersonInterface>(defaultPerson);

  useEffect(() => {
    setInput(person);

    return () => {
      setIsEnabled(false);
      setFeedback(defaultFeedback);
    }
  }, [person]);

  useEffect(() => {
    validator(input);
  }, [input]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(true);
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancel = () => {
    setInput(person);
    setIsEnabled(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await ApiService.modifyPerson(person.id, input);
      setUpdatedPerson({ updatedDetails: data.data });
      setIsLoading(false);
      setIsEnabled(false);
    } catch (error) {
      setIsLoading(false);
      setIsEnabled(false);
      console.log((error as Error).message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} data-testid="form">
      <StyledFormControl variant="standard" style={{ marginBottom: "-8px" }}>
        <InputLabel shrink htmlFor="name">
          Name
        </InputLabel>
        <TextField
          name="name"
          id="name"
          value={input.name}
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Name"
          onChange={handleChange}
          inputProps={{
            "data-testid": "name-field",
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack data-testid="name-msg">{feedback.nameMessage}</FeedBack>
      <StyledFormControl variant="standard" style={{ marginBottom: "-8px" }}>
        <InputLabel shrink htmlFor="email">
          Email address
        </InputLabel>
        <TextField
          name="email"
          id="email"
          value={input.email}
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Email address"
          onChange={handleChange}
          inputProps={{
            "data-testid": "email-field",
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack data-testid="email-msg">{feedback.emailMessage}</FeedBack>
      <StyledFormControl variant="standard" style={{ marginBottom: "-8px" }}>
        <InputLabel shrink htmlFor="phone">
          Phone
        </InputLabel>
        <TextField
          name="phone"
          id="phone"
          value={input.phone}
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Phone"
          onChange={handleChange}
          inputProps={{
            "data-testid": "phone-field",
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack data-testid="phone-msg">{feedback.phoneMessage}</FeedBack>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="address">
          Address
        </InputLabel>
        <TextField
          name="address"
          id="address"
          value={input.address}
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Address"
          onChange={handleChange}
          inputProps={{
            "data-testid": "address-field",
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
          value={input.company}
          margin="normal"
          type="text"
          variant="outlined"
          placeholder="Company"
          onChange={handleChange}
          inputProps={{
            "data-testid": "company-field",
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <StyledButtons>
        {isEnabled && (
          <Button
            variant="outlined"
            data-testid="cancel-btn"
            sx={{ textTransform: "none", backgroundColor: "#f7f7f7" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          data-testid="save-btn"
          variant="contained"
          sx={{ textTransform: "none" }}
          disabled={!isEnabled || !feedback.ready}
        >
          Save
        </Button>
      </StyledButtons>
    </StyledForm>
  );
};
