import { Fragment, useContext, useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Person } from "../Person/Person";
import List from "@mui/material/List";
import InputContext from "../../store/InputContextProvider";
import { InputContextInterface, LoadingContextInterface, PersonInterface, UpdatedDetails } from "../../types/types";
import Spinner from "../../UI/Spinner";
import LoadingContext from "../../store/LoadingContextProvider";

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
    const { updatedDetails } = updatedPerson as UpdatedDetails;
    const updatedPersonsList = persons.map((person) =>
      updatedDetails.id === (person as PersonInterface).id
        ? { ...updatedDetails, photo: (person as PersonInterface).photo }
        : person
    );
    setPersons(updatedPersonsList as Array<PersonInterface>);
  }, [updatedPerson]);

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <List
        component="nav"
        sx={{
          width: "100%",
          height: "460px",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          padding: 0,
        }}
      >
        {persons.map((person, index) => (
          <Person key={index} {...(person as PersonInterface)} />
        ))}
      </List>
    </Fragment>
  );
};
