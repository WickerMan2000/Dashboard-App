import { useState } from "react";
import { PersonInterface, UpdatedDetails } from "../types/types";
import InputContext, { defaultPerson } from "./InputContextProvider";

const { Provider } = InputContext;

const InputContextProvider = ({ children }: { children: any }) => {
  const [person, setPerson] = useState<PersonInterface>(defaultPerson);
  const [updatedPerson, setUpdatedPerson] = useState<UpdatedDetails>({
    updatedDetails: defaultPerson,
  });

  const InputContext = {
    person,
    updatedPerson,
    setPerson,
    setUpdatedPerson,
  };

  return <Provider value={InputContext as any}>{children}</Provider>;
};

export default InputContextProvider;
