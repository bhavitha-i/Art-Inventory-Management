/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { styled } from '@mui/material/styles';
import  { useState, useEffect } from "react"
import axios from "axios";
import { Box} from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import { Link } from '@mui/material';
import PopupAction from './PopupAction';
import { useParams } from "react-router-dom";
import PlaceBidForm from './PlaceBidForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, MenuItem, Menu } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


// ----------------------------------------------------------------------

const P1TableCell = styled(TableCell)(() => ({
  textAlign: "center"

}));


// -------------------------------------------------------


export default function ArtSupplyTableRow(props) {


  const [openActionPopup, setOpenActionPopup] = useState(false);
  const [selectedArt, setSelectedArt] = useState("")
  const [customers, setCustomers] = useState([])
  const [popopen, setPopopen] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);




  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        // getArts()
        // getValues()

  },[]);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleCloseMenu = (event,item) => {
    setAnchorEl(null);
    // console.log(item, "--")
    // console.log(event.currentTarget.value,"***")
    if(event.currentTarget.value == 1){
      props.openEditPopup(item)
    }else if(event.currentTarget.value == 2){
      props.deleteitem(item)
    }else if(event.currentTarget.value == 3){
      props.openSalePop(item)
    }

}



  return (
    <ThemeProvider theme={theme}>
          <TableRow
              key={props.item.id_Art_Supplies}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <P1TableCell>{props.item.Name}</P1TableCell>
              <P1TableCell >{props.item.Quantity}</P1TableCell>
              <P1TableCell >{props.item.Price}</P1TableCell>
              <P1TableCell >{props.item.AtStore && props.item.AtStore_Store.Name}</P1TableCell>

              <P1TableCell>
                          <IconButton
                                  aria-label="more"
                                  id="long-button"
                                  aria-controls="long-menu"
                                  aria-expanded={open ? 'true' : undefined}
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="long-menu"
                                  MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleCloseMenu}
                                  PaperProps={{
                                    style: {
                                      width: '20ch',
                                    },
                                  }}
                                >
                                    <MenuItem key={1} value={1} onClick={(e) => handleCloseMenu(e,props.item)}>
                                      Edit
                                    </MenuItem>
                                    <MenuItem key={2} value={2} onClick={(e) => handleCloseMenu(e,props.item)}>
                                      Delete
                                    </MenuItem>
                                    <MenuItem key={3} value={3} onClick={(e) => handleCloseMenu(e,props.item)}>
                                      Sell to Artist
                                    </MenuItem>
                                </Menu>
              </P1TableCell>
              
            </TableRow>
    </ThemeProvider>

  );
}


