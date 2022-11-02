import { styled } from "@mui/material/styles";

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: '70px auto',
  width: '65%',
  position: 'relative',
  boxShadow: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
  [theme.breakpoints.down(768)]: {
    width: "100%",
    height: "100%",
    margin: "0px",
  }
}));

export const FormContainer = styled('div')(({ theme }) => ({
  paddingTop: '20px',
  flex: '50%',
  paddingLeft: '0px', 
  backgroundColor: 'white',
  position: 'relative',
  [theme.breakpoints.down(768)]: {
    paddingLeft: "10px",
    paddingRight: "10px",
    maxWidth: "100%"
  }
}));