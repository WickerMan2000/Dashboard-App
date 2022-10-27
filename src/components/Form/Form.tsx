import { FormEvent, useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputContext, { defaultPerson } from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import LoadingContext from "../../store/LoadingContextProvider";
import { FeedBackInterface, PersonInterface } from "../../types/types";
import { validateEmail } from "../../helpers/helpers";

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
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [input, setInput] = useState<PersonInterface>(defaultPerson);
  const [feedback, setFeedback] = useState<FeedBackInterface>({
    nameMessage: "",
    emailMessage: "",
    phoneMessage: "",
    ready: false,
  });

  useEffect(() => {
    setInput(person);
  }, [person]);

  useEffect(() => {
    validator(input);
  }, [input]);

  const handleChange = (e: any) => {
    setIsEnabled(true);
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setInput(person);
    setIsEnabled(false);
  };

  const validator = (value: PersonInterface) => {
    switch (true) {
      case value.name === "":
        setFeedback({
          ...feedback,
          nameMessage: "Name is required",
          ready: false,
        });
        break;
      case !validateEmail(value.email):
        setFeedback({
          ...feedback,
          emailMessage: "Email has an invalid format",
          ready: false,
        });
        break;
      case value.phone === "":
        setFeedback({
          ...feedback,
          phoneMessage: "Phone is required",
          ready: false,
        });
        break;
      default:
        setFeedback({
          nameMessage: "",
          emailMessage: "",
          phoneMessage: "",
          ready: true,
        });
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { data } = await ApiService.modifyPerson(person.id, input);
    setUpdatedPerson({ updatedDetails: data.data });
    setIsLoading(false);
    setIsEnabled(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
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
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack>{feedback.nameMessage}</FeedBack>
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
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack>{feedback.emailMessage}</FeedBack>
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
            style: {
              height: "2px",
              border: "0px solid #ececec",
            },
          }}
        />
      </StyledFormControl>
      <FeedBack>{feedback.phoneMessage}</FeedBack>
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
            sx={{ textTransform: "none", backgroundColor: "#f7f7f7" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
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
