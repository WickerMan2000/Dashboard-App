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
  updatedPerson: defaultPerson,
  setPerson: (value: any) => {},
  setUpdatedPerson: (value: any) => {},
});

export default InputContext;
