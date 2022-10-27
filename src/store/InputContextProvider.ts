import React from "react";

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
  setPerson: (args: any) => {},
  setUpdatedPerson: (args: any) => {},
});

export default InputContext;
