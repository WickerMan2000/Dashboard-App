import React from "react";

const LoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: (args: boolean) => {},
});

export default LoadingContext;
