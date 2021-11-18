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
import PopupLarge from './PopupLarge'
import ArtForm from './ArtForm';

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


export default function ArtistsList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [arts, setArts] = useState([])
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
        getArts()
        getValues()

  },[]);

  const getValues = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/artStyle/all')
          .then(response =>{ 
            const data = response.data
            const options = data.map(s => ({
              "value" : s.id_Art_Styles,
              "label" : s.StyleName
        
            }))
            setArtstyles(options)
            console.log(options," art sytles from api")})
          .catch(error => {console.log(error)})
  
    axios.get(process.env.REACT_APP_API_URL+'/country/all')
          .then(response =>{ 
            const data = response.data
            const options = data.map(s => ({
              "value" : s.id_Country,
              "label" : s.Name
        
            }))
            setCountries(options)
            console.log(options," countries from api")})
          .catch(error => {console.log(error)})

    axios.get(process.env.REACT_APP_API_URL+'/art_status/all')
          .then(response =>{ 
            const data = response.data
            const options = data.map(s => ({
              "value" : s.id_Art_Status,
              "label" : s.Status
        
            }))
            setStatus(options)
            console.log(options," art status from api")})
          .catch(error => {console.log(error)})

    axios.get(process.env.REACT_APP_API_URL+'/artist/all')
          .then(response =>{ 
            const data = response.data
            const options = data.map(s => ({
              "value" : s.id_Artist,
              "label" : s.Name
        
            }))
            setArtists(options)
            console.log(options," artist from api")})
          .catch(error => {console.log(error)})
          
}; 

  const getArts = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/art/all')
          .then(response =>{ 
            setArts(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};  

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
        placeholder="Search for Art"
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
          {arts.length === 0 && <Typography> No Arts Available</Typography>}
          <Grid container spacing={4} >
            {arts.map(art => (
            
             <Grid item key={art} xs={3} >
                    <Ccard >
                        <Cmedia
                        image={ art.Image}
                        />
                        <Ccontent style={styles.ArtCardContent}>
                        <Link
                          underline="none"
                          href={'/artview/'+art.id_Art}
                          color="inherit"
                        >
                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            {art.Title}
                        </CHeading>
                        </Link>
                        <CSubtitle
                            variant={"caption"}
                        >
                          <b>{strings.Art.country}</b> : {art.CountryOfOrigin_Country.Name}<br/>
                         {art.Style && <span> <b>{strings.Art.style}</b> : {art.Style_Art_Style.StyleName}</span>}
                        </CSubtitle>
                        <Cdivider light />
                          <Box style={styles.flexStart}>
                            <CAvatar  src={art.CreatedBy_Artist.Image} />
                            <CSubtitle
                            variant={"caption"}
                            style={styles.leftM0}
                            >
                            {art.CreatedBy_Artist.Name}
                        </CSubtitle>
                        </Box>
                        </Ccontent>
                    </Ccard>
              </Grid>
            ))}
          </Grid>
        </Container>
        <PopupLarge
                title={isEdit?"Edit Art":"Add Art"}
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
                
            </PopupLarge>
    </ThemeProvider>

  );
}


