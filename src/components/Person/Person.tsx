import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useContext } from "react";
import InputContext from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import { InputContextInterface, LoadingContextInterface, PersonInterface } from "../../types/types";
import LoadingContext from "../../store/LoadingContextProvider";

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const Person = (props: PersonInterface) => {
  const { id, name, email, photo } = props;
  const { setPerson } = useContext<InputContextInterface>(InputContext);
  const { setIsLoading } = useContext<LoadingContextInterface>(LoadingContext);

  const sendPersonDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await ApiService.getPerson(id);
      setPerson({ ...data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log((error as Error).message);
    }
  };

  return (
    <StyledListItem onClick={sendPersonDetails} data-testid={`person_${id}`}>
      <ListItemAvatar>
        <Avatar 
          src={photo} 
          alt="person" 
          data-testid="avatar" 
          style={{ height: '50px', width: '50px', marginRight: '14px'}} 
        />
      </ListItemAvatar>
      <ListItemText 
          primary={name} 
          secondary={email} 
          data-testid="name_&_email" 
          sx={{ fontWeight: "bolder" }} 
          secondaryTypographyProps={{ sx: { fontWeight: "lighter" } }} 
        />
    </StyledListItem>
  );
};
