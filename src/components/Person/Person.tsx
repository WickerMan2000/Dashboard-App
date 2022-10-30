import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import InputContext from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import { InputContextInterface, LoadingContextInterface, PersonInterface } from "../../types/types";
import LoadingContext from "../../store/LoadingContextProvider";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'whitesmoke'
  },
  [theme.breakpoints.down(768)]: {
    maxHeight: 70,
    position: 'relative'
  }
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  [theme.breakpoints.down(768)]: {
    visibility: "hidden"
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down(768)]: {
    maxWidth: '45px',
    maxHeight: '45px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-25px 0 0 -25px'
  }
}));

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
        <StyledAvatar 
          src={photo} 
          alt="person" 
          data-testid="avatar" 
          style={{ height: '50px', width: '50px', marginRight: '14px' }} 
        />
      </ListItemAvatar>
      <StyledListItemText
          primary={name} 
          secondary={email} 
          data-testid="name_&_email" 
          sx={{ fontWeight: "bolder" }} 
          secondaryTypographyProps={{ sx: { fontWeight: "lighter" } }} 
        />
    </StyledListItem>
  );
};
