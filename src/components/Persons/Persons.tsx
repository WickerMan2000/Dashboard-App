import { Fragment, useContext, useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Person } from "../Person/Person";
import List from "@mui/material/List";
import InputContext from "../../store/InputContextProvider";
import { PersonInterface, UpdatedDetails } from "../../types/types";
import Spinner from "../../UI/Spinner";
import LoadingContext from "../../store/LoadingContextProvider";

export const Persons = () => {
  const [persons, setPersons] = useState<Array<PersonInterface>>([]);
  const { updatedPerson } = useContext(InputContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

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
          maxWidth: "50%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 450,
          "& ul": { padding: 0 },
        }}
      >
        {persons.map((person, index) => (
          <Person key={index} {...(person as PersonInterface)} />
        ))}
      </List>
    </Fragment>
  );
};
