import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useContext } from "react";
import InputContext from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import { PersonInterface } from "../../types/types";

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const Person = (props: PersonInterface) => {
  const { id, name, email, photo } = props;
  const { setPerson } = useContext(InputContext);

  const sendPersonDetails = async () => {
    const { data } = await ApiService.getPerson(id);
    setPerson({ ...data });
  };

  return (
    <StyledListItem onClick={sendPersonDetails}>
      <ListItemAvatar>
        <Avatar src={photo} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
    </StyledListItem>
  );
};
