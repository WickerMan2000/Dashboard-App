import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useContext, useEffect, useRef, useState } from "react";
import InputContext from "../../store/InputContextProvider";
import ApiService from "../../service/ApiService";
import { EnablerContextInterface, InputContextInterface, LoadingContextInterface, PersonInterface } from "../../types/types";
import LoadingContext from "../../store/LoadingContextProvider";
import { StyledAvatar, StyledListItem, StyledListItemText } from "./styles";
import EnablerContext from "../../store/EnablerContextProvider";

export const Person = (props: PersonInterface) => {
  const { id, name, email, photo } = props;
  const { setPerson } = useContext<InputContextInterface>(InputContext);
  const { setIsLoading } = useContext<LoadingContextInterface>(LoadingContext);
  const { setFormEnabled } = useContext<EnablerContextInterface>(EnablerContext);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const isClickedRef = useRef<boolean>(false);

  useEffect(() => {
    isClickedRef.current = isClicked;
  }, [isClicked])

  useEffect(() => {
    return () => setIsClicked(false);
  }, [isClicked])

  const sendPersonDetails = async () => {
    setFormEnabled(true);
    setIsClicked(true);

    try {
      setIsLoading(true);
      const { data } = await ApiService.getPerson(id as string);
      setPerson({ ...data });
      setIsLoading(false);
      setIsClicked(true);
    } catch (error) {
      setIsLoading(false);
      console.log((error as Error).message);
    }
  };

  return (
    <StyledListItem onClick={sendPersonDetails} data-testid={`person_${id}`} selected={isClicked !== isClickedRef.current}>
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
          primaryTypographyProps={{ fontWeight: 'bold', fontSize: '14px' }}
          secondaryTypographyProps={{ sx: { fontWeight: "lighter", color: '#9b9292' } }}
        />
    </StyledListItem>
  );
};
