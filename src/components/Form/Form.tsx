import { FormEvent, useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputContext, { defaultPerson } from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import LoadingContext from "../../store/LoadingContextProvider";

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
  const { person, setUpdatedPerson } = useContext(InputContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [input, setInput] = useState(defaultPerson);

  useEffect(() => {
    setInput(person);
  }, [person]);

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
          value={input?.name}
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
      <FeedBack>Feedback</FeedBack>
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="email">
          Email address
        </InputLabel>
        <TextField
          name="email"
          id="email"
          value={input?.email}
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
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="phone">
          Phone
        </InputLabel>
        <TextField
          name="phone"
          id="phone"
          value={input?.phone}
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
      <StyledFormControl variant="standard" style={{ marginBottom: "15px" }}>
        <InputLabel shrink htmlFor="address">
          Address
        </InputLabel>
        <TextField
          name="address"
          id="address"
          value={input?.address}
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
          value={input?.company}
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
            sx={{ textTransform: "none" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "none" }}
          disabled={!isEnabled}
        >
          Save
        </Button>
      </StyledButtons>
    </StyledForm>
  );
};
