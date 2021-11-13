/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@mui/material';
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


const Cmedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: "56.25%"

  }));

const Ccontent = styled(CardContent)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing.unit * 3    
  }));


  const Cdivider = styled(Divider)(({ theme }) => ({
    margin: `${theme.spacing.unit * 3}px 0`
    
  }));
  
  const CHeading = styled(Typography)(({ theme }) => ({
    fontWeight: "bold"
    
  }));

  const CSubtitle = styled(Typography)(({ theme }) => ({
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
  const [artists, setArtists] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {

    const getArtists = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/artist/all')
            .then(response =>{ 
              setArtists(response.data)
              setRows(response.data)
              console.log(response.data,"from api")})
            .catch(error => {console.log(error)})
  };    
  getArtists()
  },[]);











  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 6 }} >
          {this.state.noProducts && <Typography> No Products Available</Typography>}
          <Grid container spacing={4} >
            {this.state.products.filter(product => product.quantity > 0).map(currentproduct => (
            
             <Grid item key={currentproduct} xs={3} >
                    <Ccard >
                        <Cmedia
                        image={
                            "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                        }
                        />
                        <Ccontent>
                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            Nature Around Us
                        </CHeading>
                        <CSubtitle
                            variant={"caption"}
                        >
                            We are going to learn different kinds of species in nature that live
                            together to form amazing environment.
                        </CSubtitle>
                        <Cdivider light />
                            <CAvatar  src={""} />
                        </Ccontent>
                    </Ccard>
              </Grid>
            ))}
          </Grid>
        </Container>
    </ThemeProvider>

  );
}


