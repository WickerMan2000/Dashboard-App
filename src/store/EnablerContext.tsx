import { useState } from "react";
import { EnablerContextInterface } from "../types/types";
import EnablerContext from "./EnablerContextProvider";

const { Provider } = EnablerContext;

const EnablerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [formEnabled, setFormEnabled] = useState<boolean>(false);

  const EnablerContext = {
    formEnabled,
    setFormEnabled,
  };

  return (
    <Provider value={EnablerContext as EnablerContextInterface}>
      {children}
    </Provider>
  );
};

export default EnablerContextProvider;