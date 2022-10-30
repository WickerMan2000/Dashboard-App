import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

export const StyledList = styled(List)(({ theme }) => ({
    [theme.breakpoints.down(768)]: {
      height: "576px",
      maxWidth: "80px",
      overflow: "scroll",
    }
  }));
  