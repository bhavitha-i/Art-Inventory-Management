/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, getNativeSelectUtilityClasses } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { styled } from '@mui/material/styles';
import  { useState, useEffect } from "react"
import axios from "axios";
import { Box, padding } from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import { Link } from '@mui/material';
import Popup from './Popup'
import ArtForm from './ArtForm';


// -------------------------------------------------------



export default function ArtshowsList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [artshows, setArtshows] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [countries,setCountries] = useState([]);
  const [status,setStatus] = useState([]);
  const [artists,setArtists] = useState([]);
  const [artstyles,setArtstyles] = useState([]);


  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArtShows()

  },[]);


  const getArtShows = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/art_show/all')
          .then(response =>{ 
            setArtshows(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  

const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setArtshows(filteredRows);
};

const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
};


const openEditPopup = item => {
  setRecordForEdit(item)
  setOpenPopup(true)
  setIsEdit(true)
}


const openAddPopup = item => {
  setOpenPopup(true)
  setIsEdit(false)
}




  return (
    <ThemeProvider theme={theme}>
      <Box style={styles.p1Box}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for Artshows"
        style={styles.SettingsSearch}
        />
         <Button
              type="submit"
              variant="contained"
              // style={styles.ArtStylesAddButton}
              onClick={() => openAddPopup(true)}
          >
            Add
          </Button>
      </Box>
      <Container sx={{ py: 1 }} >
          {artshows.length === 0 && <Typography> No Artshows Available</Typography>}
            {artshows.map(art => (
            
             <Box item key={art.id_Art_Show} xs={12} sx={{   border:1,borderRadius:1,}} style={styles.level2Box}>
               <Typography variant="h5" >{art.Title}</Typography>

              </Box>
            ))}
        </Container>
        <Popup
                title={isEdit?"Edit Art Show":"Add Art Show"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ArtForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    artists={artists}
                    artstyles={artstyles}
                    countries={countries}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


