import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        zIndex: 999,
        margin: "auto",
        top: 150,
        left: 150,
        bottom: 150,
        right: 150,
        height: "50px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
