import { Fragment, useContext, useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Person } from "../Person/Person";
import InputContext from "../../store/InputContextProvider";
import { InputContextInterface, LoadingContextInterface, PersonInterface, UpdatedDetails } from "../../types/types";
import Spinner from "../../UI/Spinner";
import LoadingContext from "../../store/LoadingContextProvider";
import { StyledList } from "./styles";

export const Persons = () => {
  const [persons, setPersons] = useState<Array<PersonInterface>>([]);
  const { updatedPerson } = useContext<InputContextInterface>(InputContext);
  const { isLoading, setIsLoading } = useContext<LoadingContextInterface>(LoadingContext);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setIsLoading(true);
        const result = await ApiService.getAllPersons();
        setPersons(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log((error as Error).message);
      }
    };
    
    fetchPersons();
  }, []);

  useEffect(() => {
    const { updatedDetails } = updatedPerson;
    const updatedPersonsList = persons.map((person) =>
      updatedDetails.id === person.id
        ? { ...updatedDetails, photo: person.photo }
        : person
    );
    setPersons(updatedPersonsList as Array<PersonInterface>);
  }, [updatedPerson]);

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <StyledList
        sx={{
          maxWidth: "50%",
          flex: "50%",
          height: "35rem",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          padding: 0,
        }}
      >
        {persons.map((person, index) => (
          <Person key={index} {...person} />
        ))}
      </StyledList>
    </Fragment>
  );
};
