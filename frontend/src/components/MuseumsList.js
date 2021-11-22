/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import  { useState, useEffect } from "react"
import axios from "axios";
import { Box} from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import Popup from './Popup'
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MusuemForm from './MusuemForm';


// -------------------------------------------------------



export default function ArtshowsList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [museums, setMuseums] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [showIcon, setShowIcon] = useState(false)
  const [artcount, setArtcount] = useState([])
  const [exhibitCount, SetExhibitCount] = useState([])


  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getMuseums()
        getArtCount()
        getExhibitCount()

  },[]);


const getMuseums = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/museum/all')
          .then(response =>{ 
            setMuseums(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  


const getArtCount = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_in_museum_artCount')
        .then(response =>{
          response.data.map(item => {
                artcount[item.Musem] = item.ArtCount
          })
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  

const getExhibitCount = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_in_exhibition_count')
        .then(response =>{
          response.data.map(item => {
                exhibitCount[item.Museum] = item.ExhibitCount
          })
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  

const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setMuseums(filteredRows);
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



function deleteitem(record){

  axios.delete(process.env.REACT_APP_API_URL+'/museum/'+record.id_Museum)
  .then(response =>{ 
      console.log(response,"from api")
      setErrAlert("success")
      setMessage("Record Deleted")
      setCallFlag(true)
      // refreshPage()
      
  })
  .catch(error => {
      console.log(error)
      setErrAlert("error")
      setMessage("Error while deleting Record")
      setCallFlag(true)

  })
  

}



  return (
    <ThemeProvider theme={theme}>
      <Box style={styles.p1Box}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for Museums"
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
          {museums.length === 0 && <Typography> No Museums Available</Typography>}
            {museums.map(show => (
            
             <Box item 
                key={show.id_Museum}  
                sx={{   border:1,borderRadius:1,}} 
                style={styles.level2Box}
                onMouseEnter={() => setShowIcon(true)}
                onMouseLeave={() => setShowIcon(false)}
                >
               <Grid Container style={styles.level2GContainer}>
               <Grid item xs={7} >
                  <Typography variant="h5" >{show.Name}</Typography>
                  <Typography variant="body1">
                    <b>{strings.Museum.location}</b> : {show.Location}<br/>

                  </Typography>
               </Grid>
               <Grid item xs={3} >
                  <Typography variant="body1">
                  <b>{strings.Museum.found}</b> : {show.FoundedBy}<br/>
                  <b>{strings.Museum.artCount}</b> : {artcount[show.id_Museum]}<br/>
                  <b>{strings.Museum.exhibitcount}</b> : {exhibitCount[show.id_Museum]}<br/>
                  </Typography>
               </Grid>

               <Grid item xs={3} style={styles.level2ActionGrid}>
                 <Button variant="outlined" endIcon={<SendIcon />} >
                          Get into Museum
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
                title={isEdit?"Edit Museum":"Add Museum"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <MusuemForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


