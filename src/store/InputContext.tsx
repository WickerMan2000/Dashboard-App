import { useState } from "react";
import {
  InputContextInterface,
  PersonInterface,
  UpdatedDetails,
} from "../types/types";
import InputContext, { defaultPerson } from "./InputContextProvider";

const { Provider } = InputContext;

const InputContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <Provider value={InputContext as InputContextInterface}>
      {children}
    </Provider>
  );
};

export default InputContextProvider;
