import React from "react";

const EnablerContext = React.createContext({
  formEnabled: false,
  setFormEnabled: (args: boolean) => {},
});

export default EnablerContext;