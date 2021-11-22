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
import ArtShowForm from './ArtShowForm';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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
  const [showIcon, setShowIcon] = useState(false)
  const [artcount, setArtcount] = useState([])



  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArtShows()
        getArtCount()
  },[]);


const getArtShows = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/art_show/all')
          .then(response =>{ 
            setArtshows(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  


const getArtCount = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_in_auction_artCount')
        .then(response =>{
          response.data.map(item => {
                artcount[item.AtArtShow] = item.ArtCount
          })
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

const openShowArts = item => {
  console.log(item)
    window.location.assign(`/artshow/${item.id_Art_Show}`)
}


function deleteitem(record){

  axios.delete(process.env.REACT_APP_API_URL+'/art_show/'+record.id_Art_Show)
  .then(response =>{ 
      console.log(response.data,"from api")
      setCallFlag(true)
      setErrAlert("success")
      setMessage("Record Deleted")
      refreshPage()
      
  })
  .catch(error => {
      console.log(error)
      setCallFlag(true)
      setErrAlert("error")
      setMessage("Error while deleting Record")
  })
  

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
            {artshows.map(show => (
            
             <Box item 
                key={show.id_Art_Show}  
                sx={{   border:1,borderRadius:1,}} 
                style={styles.level2Box}
                onMouseEnter={() => setShowIcon(true)}
                onMouseLeave={() => setShowIcon(false)}
                >
               <Grid Container style={styles.level2GContainer}>
               <Grid item xs={7} >
                  <Typography variant="h5" >{show.Title}</Typography>
                  <Typography variant="body">
                     <b>{strings.ArtShow.location}</b> : {show.Location}<br/>
                  </Typography>
               </Grid>
               <Grid item xs={3} >
                  <Typography variant="body1">
                      <b>{strings.ArtShow.host}</b> : {show.Host}<br/>
                      <b>{strings.ArtShow.phone}</b> : {show.Phone}<br/>
                      <b>{strings.ArtShow.url}</b> : {show.ShowURL}<br/>
                      {console.log(artcount,artcount[show.id_Art_Show],"----")}
                     {artcount.length>0 ? <span><b>{strings.ArtShow.artCount}</b> : {artcount[show.id_Art_Show]}</span> : 0}<br/>
                  </Typography>
               </Grid>
               <Grid item xs={2} style={styles.level2ActionGrid}>
                 <Button variant="outlined" endIcon={<SendIcon />} onClick={() => openShowArts(show)}>
                          Get into Art Show
                  </Button>
                  {showIcon &&
                    <Box style={styles.level2ActionIcons}>
                      <EditIcon  onClick={() => openEditPopup(show)}/>
                      <DeleteIcon  onClick={() => deleteitem(show)}/>
                    </Box>
                  }
               </Grid>
               </Grid>
              </Box>
              
            ))}
        </Container>
        <Popup
                title={isEdit?"Edit Art Show":"Add Art Show"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ArtShowForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


