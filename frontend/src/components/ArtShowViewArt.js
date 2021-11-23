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
import CloseBidConfirm from './CloseBidConfirm';


// ----------------------------------------------------------------------


const Ccard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  }));


const Cmedia = styled(CardMedia)(() => ({
    paddingTop: "56.25%"

  }));

const Ccontent = styled(CardContent)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing.unit * 3,
      
  }));


  const Cdivider = styled(Divider)(() => ({
    margin: '3px 0 3px 0'
    
  }));
  
  const CHeading = styled(Typography)(() => ({
    fontWeight: "bold",
    margin: "auto"
    
  }));

  const CSubtitle = styled(Typography)(() => ({
    lineHeight: 1.8
    
  }));

  const CAvatar = styled(Avatar)(({ theme }) => ({
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing.unit
    }
    
  }));

// -------------------------------------------------------


export default function ArtShowViewArt(props) {


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


  const getValues = async () => {
            console.log(props.customers,"--------------->in artshow art")
            const options = props.customers.map(s => ({
              "value" : s.id_Customer,
              "label" : s.FirstName + ' ' + s.LastName,
              "isPremium":s.isPremium
        
            }))
            setCustomers(options)
            console.log(options,"customer from api")
     
          
  }; 


const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleCloseMenu = (event,item) => {
  setAnchorEl(null);
  console.log(item, "--")
  if(event.currentTarget.value == 1){
    openCloseBidPop(item)
  }
 




  
};


const openPlaceBidPop = item => {
  setOpenActionPopup(true)
  setSelectedArt(item)
  setPopopen("PlaceBid")
}

const openCloseBidPop = item => {
  setOpenActionPopup(true)
  setSelectedArt(item)
  setPopopen("CloseBid")
}



  return (
    <ThemeProvider theme={theme}>
                    <Ccard >
                    <div style={{ position: "relative" }}>

                        <Cmedia
                        image={ props.art.Art_Art.Image}
                        />
                        <div > 
                              <IconButton
                                  aria-label="more"
                                  id="long-button"
                                  aria-controls="long-menu"
                                  aria-expanded={open ? 'true' : undefined}
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                  style={styles.MenuIcon}
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
                                    <MenuItem key={1} value={1} onClick={(e) => handleCloseMenu(e,props.art)}>
                                      Close Bid
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
  
                  
                        <Ccontent style={styles.ArtCardContent}>
                        <Link
                          underline="none"
                          href={'/artview/'+props.art.Art_Art.id_Art}
                          color="inherit"
                        >
                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            {props.art.Art_Art.Title}
                        </CHeading>
                        </Link>
                        <CSubtitle
                            variant={"caption"}
                        >
                         {props.art.Art_Art.Style && <span> <b>{strings.Art.style}</b> : {props.art.Art_Art.Style_Art_Style.StyleName}</span>}<br/>
                         {<span> <b>{strings.ArtShow.price}</b> : ${props.art.Price}</span>}  <br/>
                         {<span> <b>{strings.ArtShow.startbid}</b> : ${props.art.StartBid}</span>}  <br/>

                        </CSubtitle>
                        <Cdivider light />
                          <Box style={styles.flexStart}>
                           { props.art.Art_Art.CreatedBy && <CAvatar src={props.art.Art_Art.CreatedBy_Artist.Image} /> }
                           {props.art.Art_Art.CreatedBy && <CSubtitle
                            variant={"body1"}
                            style={styles.leftM0}
                            >
                            {props.art.Art_Art.CreatedBy_Artist.Name}  
                        </CSubtitle> }
                        {props.art.Art_Art.Status === 2  &&<Button size="small"  variant="outlined" style={styles.level1ActionButton} onClick={() => openPlaceBidPop(props.art)}> Place Bid</Button> }
                        {props.art.Art_Art.Status === 6 && <Typography variant="body1" color="primary" style={styles.MarginAuto}><b>Sold in Auction</b></Typography>}

                        </Box>
                        </Ccontent>
                    </Ccard>

        <PopupAction
                title= {popopen == "PlaceBid" ? "Place Bid" : "Close bid" }
                openActionPopup={openActionPopup}
                setOpenActionPopup={setOpenActionPopup}
             >
               {popopen == "PlaceBid" &&
                <PlaceBidForm 
                  customers = {props.customers}
                  openActionPopup={openActionPopup}
                  art={selectedArt}
                />
               }

              {popopen == "CloseBid" &&
                <CloseBidConfirm 

                  openActionPopup={openActionPopup}
                  art={selectedArt}
                />
               }
                
                
        </PopupAction>

    </ThemeProvider>

  );
}


