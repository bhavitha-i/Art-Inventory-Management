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
import ExhibitionForm from './ExhibitionForm';
import moment from 'moment'
import TickerForm from './TicketForm';



// -------------------------------------------------------



export default function MuseumExhibits(props) {

  const [museumId,setMuseumId] =useState(props.id)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [artcount, setArtcount] = useState([])
  const [exhibits, setExhibits] = useState([])
  const [customers,setCustomers] = useState("")
  const [openPopupTix, setOpenPopupTix] = useState(false);


  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getMuseumExhibits()
        getArtCount()
        getValues()

  },[]);

  const getValues = async() =>{
    axios.get(process.env.REACT_APP_API_URL+`/customer/all`)
    .then(response =>{ 
        setCustomers(response.data)

        console.log(response.data,"from api")})
      .catch(error => {console.log(error)})

  }

const getMuseumExhibits = async () => {
  axios.get(process.env.REACT_APP_API_URL+`/art_exhibition_museum/${museumId}`)
        .then(response =>{ 
            setExhibits(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  


const getArtCount = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_in_exhibition_artcount')
        .then(response =>{
          var options=[]
          response.data.map(item => {
            options[item.Exhibition] = item.ArtCount
          })
          setArtcount(options)
          console.log(response.data,options,"from api")})
        .catch(error => {console.log(error)})
};  


const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setExhibits(filteredRows);
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
const openAddPopupTix = item => {
  setOpenPopupTix(true)
  
}


const openAddPopup = item => {
  setOpenPopup(true)
  setIsEdit(false)
}

const openExhibit = item => {
  console.log(item)
    window.location.assign(`/#/exhibit/${item.id_Art_Exhibition}`)
}






function deleteitem(record){

  axios.delete(process.env.REACT_APP_API_URL+'/art_exhibition/'+record.id_Art_Exhibition)
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
        placeholder="Search for Exhibtions"
        style={styles.SettingsSearch}
        />
            <Box style={styles.p2Box}>
      
      <Button
           type="submit"
           variant="outlined"
           // style={styles.ArtStylesAddButton}
           onClick={() => openAddPopupTix(true)}
       >
         Sell Tickets
       </Button>
   </Box>
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
        <Grid Container style={styles.flexwrap}>
          {exhibits.length === 0 && <Typography> No Exhibits Available</Typography>}
            {exhibits.map(show => (
            <Grid item xs={12} sm={6}>
             <Box item 
                boxShadow={3}
                key={show.id_Art_Exhibition}  
                sx={{   border:1,borderRadius:1,}} 
                style={styles.level2Box}
                >
               <Container style={styles.flexp10spacebetween}>
               <Box>
                  <Typography variant="h5" >{show.Title}</Typography>
                  <Typography variant="body1">
                    <b>Description</b> : {show.Description}<br/>
                    <b>Ticket Price</b> : ${show.TicketPrice}<br/>
                    <b>Start Time</b> : {show.StartTime && moment(show.StartTime).format('DD/MM/YYYY h:mm:ss a')}<br/>
                  <b>Last Time</b> : {show.EndTime && moment(show.EndTime).format('DD/MM/YYYY h:mm:ss a')}<br/>
                  <b>Art Count</b> : {(artcount[show.id_Art_Exhibition] >0) ? artcount[show.id_Art_Exhibition] : 0}<br/>
                  </Typography>
               </Box>
               <Box item style={styles.level2ActionGrid}>
                 <Button variant="outlined" endIcon={<SendIcon />} onClick={() => openExhibit(show)}>
                          Get into Exhibit
                  </Button>
                  
                    <Box style={styles.level2ActionIcons}>
                      <EditIcon fontSize="small"  onClick={() => openEditPopup(show)}/>
                      <DeleteIcon fontSize="small" onClick={() => deleteitem(show)}/>
                    </Box>
                  
               </Box>
               </Container>
              </Box>
              </Grid>
            ))}
            </Grid>
        </Container>
        <Popup
                title={isEdit?"Edit Exhibtion":"Add Exhibtion"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ExhibitionForm 
                    museumId={museumId}
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>

            <Popup
                title="Just Tickets"
                openPopup={openPopupTix}
                setOpenPopup={setOpenPopupTix}
             >
                <TickerForm 
                customers = {customers}
                exhibits ={exhibits}

                museumId = {museumId}
               
                    setOpenPopup={setOpenPopupTix}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


