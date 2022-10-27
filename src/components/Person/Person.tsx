import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const Person = (props: any) => {
  const { id, name, email, phone, address, company, photo } = props;

  return (
    <StyledListItem>
      <ListItemAvatar>
        <Avatar src={photo} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
    </StyledListItem>
  );
};
