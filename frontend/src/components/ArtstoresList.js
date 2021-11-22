/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, getNativeSelectUtilityClasses } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
import ArtStoreFrom from './ArtStoreFrom';


// -------------------------------------------------------



export default function ArtstoresList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [artstores, setArtstores] = useState([])
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
        getArtStores()
        getArtCount()
  },[]);


const getArtStores = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/store/all')
          .then(response =>{ 
            setArtstores(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  


const getArtCount = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_in_store_artCount')
        .then(response =>{ 
          setArtcount(response.data)
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  

const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setArtstores(filteredRows);
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

const openStoreArts = item => {
  console.log(item)
    window.location.assign(`/artstore/${item.id_Store}`)
}


function deleteitem(record){

  axios.delete(process.env.REACT_APP_API_URL+'/store/'+record.id_Store)
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
        placeholder="Search for Artstores"
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
          {artstores.length === 0 && <Typography> No Artstores Available</Typography>}
            {artstores.map(store => (
            
             <Box item 
                key={store.id_Store}  
                sx={{   border:1,borderRadius:1,}} 
                style={styles.level2Box}
                onMouseEnter={() => setShowIcon(true)}
                onMouseLeave={() => setShowIcon(false)}
                >
               <Grid Container style={styles.level2GContainer}>
               <Grid item xs={7} >
                  <Typography variant="h5" >{store.Name}</Typography>
                  <Typography variant="body">
                     <b>Location</b> : {store.Location}<br/>
                  </Typography>
               </Grid>
               <Grid item xs={3} >
                  <Typography variant="body1">
                      <b>Manager</b> : {store.Manager}<br/>
                      <b>Phone</b> : {store.Phone}<br/>
                     
                      <b>Number of Art in Store</b> : {store.ArtCount}<br/>
                  </Typography>
               </Grid>
               <Grid item xs={2} style={styles.level2ActionGrid}>
                 <Button variant="outlined" endIcon={<SendIcon />} onClick={() => openStoreArts(store)}>
                          Get into Art Store
                  </Button>
                  {showIcon &&
                    <Box style={styles.level2ActionIcons}>
                      <EditIcon  onClick={() => openEditPopup(store)}/>
                      <DeleteIcon  onClick={() => deleteitem(store)}/>
                    </Box>
                  }
               </Grid>
               </Grid>
              </Box>
              
            ))}
        </Container>
        <Popup
                title={isEdit?"Edit Art Store":"Add Art Store"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ArtStoreFrom
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


