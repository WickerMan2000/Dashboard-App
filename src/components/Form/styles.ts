import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { styled as styledMUi } from "@mui/material/styles";

export const StyledButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 15px;
  `;
  
export const FeedBack = styled.p`
    margin: 1px;
    margin-bottom: 6px;
    color: red;
    display: inline-block;
    font-size: 12px;
  `;
  
export const StyledTextField = styled(TextField)`
    fieldset {
      border-radius: 2px;
    }
  `;