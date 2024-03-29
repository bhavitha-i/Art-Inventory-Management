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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Popup from './Popup'
import ExhibitArtForm from './ExhibitArtForm';
import TicketData from './TicketData';


// ----------------------------------------------------------------------


// -------------------------------------------------------


export default function ExhibitViewArts(props) {

  const [exhibitId,setExhibitId] =useState(props.id)
  const [arts, setArts] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [openActionPopup, setOpenActionPopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [museumId,setMusumId] = useState("")
  const [museumarts, setMuseumarts] = useState([])
  const [openPopupTix, setOpenPopupTix] = useState(false);
  const [tickets,setTickets] = useState("");
  var exhibitids=[]
  const [exhibitbools,setBools]=useState([])
  var museumIds=[]

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArts()
        getMuseum()
        getValues()

  },[]);

    const getValues = async() =>{
    axios.get(process.env.REACT_APP_API_URL+`/exhibition_tickets/exhibit/${exhibitId}`)
    .then(response =>{ 
        setTickets(response.data)

        console.log(response.data,"tickets from api")})
      .catch(error => {console.log(error)})

  }

  const getArts = async () => {
    axios.get(process.env.REACT_APP_API_URL+`/art_in_exhibit/${exhibitId}`)
          .then(response =>{ 
            var options=[]
            var ids=[]
            response.data.map(item => {
              item.Art_Art.id_exhibit= item.id_Art_in_Exhibition
              exhibitids.push(item.Art)
              options.push(item.Art_Art)
            })
            setArts(options)
            setRows(options)
            console.log(response.data,options,"from api")})
          .catch(error => {console.log(error)})
};  


const getMuseum = async () => {
  axios.get(process.env.REACT_APP_API_URL+`/art_exhibition/${exhibitId}`)
        .then(response =>{ 
          setMusumId(response.data.data.Museum)
          getMuseumArts(response.data.data.Museum)
          console.log(response.data,response.data.data.Museum," Musum deatils from api")})
        .catch(error => {console.log(error)})
};  


const getMuseumArts = async (id) => {
  axios.get(process.env.REACT_APP_API_URL+`/artlist_in_museum/${id}`)
        .then(response =>{ 
          var options=[]
          var bools=[]
          response.data.map(item => {
            var includeBool = exhibitids.includes(item.Art )
            bools={...bools, [item.Art] :includeBool }
            item.Art_Art.inExhibit = includeBool
            museumIds.push(item.Art)
            options.push(item.Art_Art)
          })
          setBools(bools)
          setMuseumarts(options)
          console.log(options, bools," artlist from api")})
        .catch(error => {console.log(error)})
}; 

const openArt = item => {
  console.log(item)
    window.location.assign(`/#/artview/${item.id_Art}`)
}


const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setArts(filteredRows);
};

const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
};

const openAddPopup = item => {
  setOpenPopup(true)
}
const openAddPopupTix = item => {
  setOpenPopupTix(true)
  
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
            <Box style={styles.p2Box}>
      
      <Button
           type="submit"
           variant="outlined"
           // style={styles.ArtStylesAddButton}
           onClick={() => openAddPopupTix(true)}
       >
        Tickets
       </Button>
   </Box>
          <Button
              sx={{   width: "150px"}}
              type="submit"
              variant="outlined"
              // style={styles.ArtStylesAddButton}
              onClick={() => openAddPopup(true)}
          >
            Manage Art
          </Button>
      </Box>
      <Container sx={{ py: 1 }} >
          {arts.length === 0 && <Typography> No Arts Available</Typography>}

          <Box sx={{ overflowY: 'scroll' }}>
          <ImageList 
          // sx={{ width: 500, height: 400 }} 
          cols={4} gap={6}
          // variant="masonry"
          >

              {arts.map((item) => (
                <ImageListItem key={item.id_Art}>
                  <img
                    src={`${item.Image}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    
                  />
                  <ImageListItemBar
                    title={item.Title}
                    subtitle={item.CreatedBy != null && '@'+item.CreatedBy_Artist.Name}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.id_Art}`}
                        onClick={() => openArt(item)}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
              </ImageListItem>
                ))}
            </ImageList>
            </Box>
        </Container>
        <Popup
                title="Manage Art in this Exhibition"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ExhibitArtForm 
                    // museumIds={museumIds}
                    exhibitbools={exhibitbools}
                    exhibitId ={exhibitId}
                    museumarts={museumarts}
                    setOpenPopup={setOpenPopup}
                    />
                
        </Popup>
        
        <Popup
                title="Tickets"
                openPopup={openPopupTix}
                setOpenPopup={setOpenPopupTix}
             >
                <TicketData 
                    tickets={tickets}
               
                    setOpenPopup={setOpenPopupTix}
                    />
                
            </Popup>

    </ThemeProvider>

  );
}


