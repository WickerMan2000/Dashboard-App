import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      backgroundColor: 'whitesmoke'
    },
    [theme.breakpoints.down(768)]: {
      maxHeight: 70,
      position: 'relative'
    }
  }));
  
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    [theme.breakpoints.down(768)]: {
      visibility: "hidden"
    }
  }));
  
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.down(768)]: {
      maxWidth: '45px',
      maxHeight: '45px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-25px 0 0 -25px'
    }
  }));
  