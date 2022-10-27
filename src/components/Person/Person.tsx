import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useContext } from "react";
import InputContext from "../../store/InputContextProvider";

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const Person = (props: any) => {
  const { id, name, email, phone, address, company, photo } = props;
  const { setPerson } = useContext(InputContext);

  const sendPersonDetails = () =>
    setPerson({ id, name, email, phone, address, company });

  return (
    <StyledListItem onClick={sendPersonDetails}>
      <ListItemAvatar>
        <Avatar src={photo} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
    </StyledListItem>
  );
};
