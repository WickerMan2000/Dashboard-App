import React from "react";
import { PersonInterface, UpdatedDetails } from "../types/types";

export const defaultPerson = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
};

const InputContext = React.createContext({
  person: defaultPerson,
  updatedPerson: { updatedDetails: defaultPerson },
  setPerson: (args: PersonInterface) => {},
  setUpdatedPerson: (args: UpdatedDetails) => {},
});

export default InputContext;
