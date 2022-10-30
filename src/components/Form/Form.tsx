import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputContext, { defaultPerson } from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import LoadingContext from "../../store/LoadingContextProvider";
import { InputContextInterface, LoadingContextInterface, PersonInterface } from "../../types/types";
import { defaultFeedback, useFeedback } from "../../customHooks/useFeedback";
import { hasInput } from "../../helpers/helpers";
import { FeedBack, StyledButtons, StyledForm, StyledTextField } from "./styles";

export const Form = () => {
  const { setIsLoading } = useContext<LoadingContextInterface>(LoadingContext);
  const { person, setUpdatedPerson } = useContext<InputContextInterface>(InputContext);
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
    hasInput(input) && validator(input);
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
      <FormControl variant="standard" style={{ marginBottom: "-8px", width: "100%" }}>
        <InputLabel shrink htmlFor="name" >
          Name
        </InputLabel>
        <StyledTextField
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
              border: "1px solid #ececec",
              fontSize: "15px",
            },
          }}
        />
      </FormControl>
      <FeedBack data-testid="name-msg">{feedback.nameMessage}</FeedBack>
      <FormControl variant="standard" style={{ marginBottom: "-8px", width: "100%" }}>
        <InputLabel shrink htmlFor="email">
          Email address
        </InputLabel>
        <StyledTextField
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
              fontSize: "15px",
            },
          }}
        />
      </FormControl>
      <FeedBack data-testid="email-msg">{feedback.emailMessage}</FeedBack>
      <FormControl variant="standard" style={{ marginBottom: "-8px", width: "100%" }}>
        <InputLabel shrink htmlFor="phone">
          Phone
        </InputLabel>
        <StyledTextField
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
              fontSize: "15px",
            },
          }}
        />
      </FormControl>
      <FeedBack data-testid="phone-msg">{feedback.phoneMessage}</FeedBack>
      <FormControl variant="standard" style={{ marginBottom: "15px", width: "100%" }}>
        <InputLabel shrink htmlFor="address">
          Address
        </InputLabel>
        <StyledTextField
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
              fontSize: "15px",
            },
          }}
        />
      </FormControl>
      <FormControl variant="standard" style={{ marginBottom: "15px", width: "100%" }}>
        <InputLabel shrink htmlFor="company">
          Company
        </InputLabel>
        <StyledTextField
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
              fontSize: "15px",
            },
          }}
        />
      </FormControl>
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
