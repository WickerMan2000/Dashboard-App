import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Person } from "../Person/Person";
import List from "@mui/material/List";

export const Persons = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const result = await ApiService.getAllPersons();
      setPersons(result.data);
    };

    fetchPersons();
  }, []);

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
