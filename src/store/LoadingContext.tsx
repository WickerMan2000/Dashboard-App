import { useState } from "react";
import { LoadingContextInterface } from "../types/types";
import LoadingContext from "./LoadingContextProvider";

const { Provider } = LoadingContext;

const LoadingContextProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LoadingContext = {
    isLoading,
    setIsLoading,
  };

  return (
    <Provider value={LoadingContext as LoadingContextInterface}>
      {children}
    </Provider>
  );
};

export default LoadingContextProvider;
