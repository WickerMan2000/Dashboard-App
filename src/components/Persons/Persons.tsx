import { useContext, useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Person } from "../Person/Person";
import List from "@mui/material/List";
import InputContext from "../../store/InputContextProvider";
import { PersonInterface } from "../../types/types";

export const Persons = () => {
  const [persons, setPersons] = useState<PersonInterface[]>([]);
  const { updatedPerson } = useContext(InputContext);

  useEffect(() => {
    const fetchPersons = async () => {
      const result = await ApiService.getAllPersons();
      setPersons(result.data);
    };

    fetchPersons();
  }, []);

  useEffect(() => {
    const { updatedDetails } = updatedPerson as any;
    const updatedPersonsList = persons.map((person) =>
      updatedDetails.id === (person as PersonInterface).id
        ? { ...updatedDetails, photo: (person as PersonInterface).photo }
        : person
    );
    setPersons(updatedPersonsList as PersonInterface[]);
  }, [updatedPerson]);

  return (
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
        <Person key={index} {...(person as any)} />
      ))}
    </List>
  );
};
