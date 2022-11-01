import styled from "styled-components";
import { styled as styledMUi } from "@mui/material/styles";

export const Container = styled.div`
  display: flex;
  margin: 70px auto;
  width: 65%;
  position: relative;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
`;

export const FormContainer = styledMUi('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '50%',
  flex: '50%',
  backgroundColor: 'white',
  [theme.breakpoints.down(768)]: {
    paddingLeft: "10px",
    paddingRight: "10px",
    maxWidth: "100%"
  }
}));