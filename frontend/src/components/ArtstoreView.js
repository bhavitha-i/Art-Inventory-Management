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
import { Box, padding, typography } from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import { Link } from '@mui/material';
import PopupAction from './PopupAction';
import { useParams } from "react-router-dom";
import RentBuyForm from './RentBuyForm';


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


export default function ArtistsList(props) {

  const [storeId,setStoreId] =useState(props.id)
  const [artStores, setArtStores] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [openActionPopup, setOpenActionPopup] = useState(false);
  const [selectedArt, setSelectedArt] = useState("")
  const [customers, setCustomers] = useState([])



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
            console.log(data,"----  in cusitmer get")
            const options = data.map(s => ({
              "value" : s.id_Customer,
              "label" : s.FirstName + ' ' + s.LastName,
              "isprem": s.isPremium
        
            }))
            setCustomers(options)
            console.log(options,"customer from api")})
          .catch(error => {console.log(error)})
          
  }; 

  const getArts = async () => {
    axios.get(process.env.REACT_APP_API_URL+`/art_in_store_arts/${storeId}`)
          .then(response =>{ 
              console.log(response.data,"ashadam sasle")
            setArtStores(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  

const requestSearch = (searchedVal) => {
  const filteredRows = rows.filter((row) => {
    return row.Art_Art.Title.toLowerCase().includes(searchedVal.toLowerCase());
  });
  setArtStores(filteredRows);
};

const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
};

const openActionPop = item => {
  setOpenActionPopup(true)
  setSelectedArt(item)
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
          {artStores.length === 0 && <Typography> No Arts Available</Typography>}
          <Grid container spacing={4} >
            {artStores.map(art => (
            
             <Grid item key={art.Art_Art.id_Art} xs={3} >
                    <Ccard >
                        <Cmedia
                        image={ art.Art_Art.Image}
                        />
                        <Ccontent style={styles.ArtCardContent}>
                        <Link
                          underline="none"
                          href={'/artview/'+art.Art_Art.id_Art}
                          color="inherit"
                        >
                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            {art.Art_Art.Title}
                        </CHeading>
                        </Link>
                        <CSubtitle
                            variant={"caption"}
                        >
                         {art.Art_Art.Style && <span> <b>{strings.Art.style}</b> : {art.Art_Art.Style_Art_Style.StyleName}</span>}<br/>
                         {<span> <b>Price</b> : ${art.Price}</span>}  <br/>
                         {<span> <b>Rent</b> : ${art.RentPerDay}</span>}  <br/>

                        </CSubtitle>
                        <Cdivider light />
                          <Box style={styles.flexStart}>
                           { art.Art_Art.CreatedBy && <CAvatar src={art.Art_Art.CreatedBy_Artist.Image} /> }
                           {art.Art_Art.CreatedBy && <CSubtitle
                            variant={"body1"}
                            style={styles.leftM0}
                            >
                            {art.Art_Art.CreatedBy_Artist.Name}  
                        </CSubtitle> }
                        {console.log(art.Art_Art,"________________________")}
                        {art.Art_Art && art.Art_Art.Status  === 1  && <Button size="small"  variant="outlined" style={styles.level1ActionButton} onClick={() => openActionPop(art)}> Buy / Rent</Button> }
                        {art.Art_Art && art.Art_Art.Status !== 1 && <Typography variant="body1" color="primary" style={styles.MarginAuto}><b>{art.Art_Art.Status_ArtStatus.Status}</b></Typography>}
                        
                        </Box>
                        </Ccontent>
                    </Ccard>
              </Grid>
            ))}
          </Grid> 
        </Container>
        <PopupAction
                title="Rent/Buy"
                openActionPopup={openActionPopup}
                setOpenActionPopup={setOpenActionPopup}
             >
                 {console.log(selectedArt,"sel arts")}
                <RentBuyForm 
                    customers = {customers}
                    openActionPopup={openActionPopup}
                    art={selectedArt}
                />
                
        </PopupAction>

    </ThemeProvider>

  );
}


