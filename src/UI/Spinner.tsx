import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: '999',
        overflow: 'show',
        margin: 'auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '50px',
        height: '50px',
      }}
    >
      <CircularProgress data-testid="circular-spinner" />
    </Box>
  );
};

export default Spinner;
