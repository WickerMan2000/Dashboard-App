import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

export const StyledList = styled(List)(({ theme }) => ({
    [theme.breakpoints.down(768)]: {
      height: "100vh",
      maxWidth: "25%",
      overflow: "scroll",
      paddingRight: 5
    }
  }));
  