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
import { Box, padding, typography } from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import { Link } from '@mui/material';
import { useParams } from "react-router-dom";
import PlaceBidForm from './PlaceBidForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, MenuItem, Menu } from '@mui/material';
import CloseBidConfirm from './CloseBidConfirm';
import ArtShowViewArt from './ArtShowViewArt';


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


export default function ArtShowView() {

  const [showId,setShowId] =useState(useParams().showId)
  const [artshows, setArtshows] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
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
        getArts()
        getValues()

  },[]);


  const getValues = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/customer/all')
          .then(response =>{ 
            const data = response.data
            console.log(data,"axios----------custs")
            const options = data.map(s => ({
              "value" : s.id_Customer,
              "label" : s.FirstName + ' ' + s.LastName,
              "isPremium":s.isPremium
             
        
            }))
            setCustomers(options)
            console.log(options,"customer from api")})
          .catch(error => {console.log(error)})
          
  }; 

  const getArts = async () => {
    axios.get(process.env.REACT_APP_API_URL+`/art_in_auction_arts/${showId}`)
          .then(response =>{ 
            setArtshows(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  

const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Art_Art.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setArtshows(filteredRows);
};

const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
};


const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleCloseMenu = (event,item) => {
  setAnchorEl(null);
  console.log(event.currentTarget.value, "--")
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
      <Box style={styles.p1Box}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for Art"
        style={styles.SettingsSearch}
        />
      </Box>
      <Container sx={{ py: 1 }} >
          {artshows.length === 0 && <Typography> No Arts Available</Typography>}
          <Grid container spacing={4} >
            {artshows.map(art => (
            
             <Grid item key={art.Art_Art.id_Art} xs={3} >
                    <ArtShowViewArt art={art} customers ={customers}/>
              </Grid>
            ))}
          </Grid>
        </Container>

    </ThemeProvider>

  );
}


