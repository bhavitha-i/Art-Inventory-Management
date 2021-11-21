/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, getNativeSelectUtilityClasses, Stack } from '@mui/material';
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
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


// ----------------------------------------------------------------------


const Ccontainer = styled(Container)(({ theme }) => ({
    marginTop: "20px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)"
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


export default function ArtView() {

  const [artId,setArtId] =useState(useParams().artId)
  const [artInfo, setArtInfo] = useState([])
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [artType,setArtType]=useState("")
  const [typeDetails,setTypeDetails]=useState([])



  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArtDetails()

  },[]);

 

  const getArtDetails = async () => {
    console.log(artId, "--id")
    axios.get(process.env.REACT_APP_API_URL+`/art/${artId}`)
          .then(response =>{ 
              setArtInfo(response.data.data)
              if(response.data.data.Painting_Arts.length >0){
                setArtType("Painting")
                setTypeDetails(response.data.data.Painting_Arts[0])
              }else{
                setArtType("Sculpture")
                setTypeDetails(response.data.data.Sculpture_Arts[0])
              }
              console.log(response.data,"from api",artInfo)
          })
          .catch(error => {console.log(error)})
};  



  return (
    <ThemeProvider theme={theme}>
{console.log("Artinfo -- ",artInfo)}
      <Ccontainer sx={{ py: 5 }} >
          <Grid container >
            
            <Grid item xs={4} >
             <Avatar variant="square" style={styles.AVImage}
                src={artInfo.Image} 
              />
            </Grid>
            <Grid item xs={4} >
              <Box style={styles.AVInfo}>
                    <CHeading
                        variant={"h4"}
                        gutterBottom
                    >
                        {artInfo.Title}
                    </CHeading>
                    <CSubtitle
                        variant={"body1"}
                    >
                    {artInfo.CountryOfOrigin && <span> <b>{strings.Art.country}</b> : {artInfo.CountryOfOrigin_Country.Name}<br/></span>}
                    {artInfo.Style && <span> <b>{strings.Art.style}</b> : {artInfo.Style_Art_Style.StyleName}<br/></span>}
                    <b>{strings.Art.year}</b> : {artInfo.Year}<br/>
                    {artInfo.Status!=null && <span> <b>{strings.Art.status}</b> : {artInfo.Status_ArtStatus.Status}<br/></span>}
                    <b>{strings.Art.type}</b> : {artType}<br/>
                    </CSubtitle>
                  </Box>
            </Grid>

            <Grid item xs={3} >
              {artInfo.CreatedBy && 
              <Avatar large style={styles.AVArtistImage}
                src={artInfo.CreatedBy_Artist.Image} 
              />}

              {artInfo.CreatedBy && 
              <Box>
              <Typography><b>Created By:</b></Typography>
              <Typography>{artInfo.CreatedBy_Artist.Name}</Typography>
              </Box>
              }
            </Grid>
            <Grid item xs={1}>
            <Box>
                  <EditIcon onClick={() => console.log("edit") }/>
                 
                  </Box>
          </Grid>

            <Grid item xs={12} >
              <Box style={styles.AVInfoHeader}>
                <Box style={styles.spaceBetween}>
                  <Typography variant="h5">{artType}</Typography>
                  <EditIcon/>
                </Box>
              <Cdivider/>

              
              {artType == "Painting" && 
                  <CSubtitle
                  variant={"body1"}
                  >
                      <b>{strings.Art.plength}</b> : {typeDetails.Length}<br/>
                      <b>{strings.Art.pwidth}</b> : {typeDetails.Width}<br/>
                      <b>{strings.Art.pStyle}</b> : {typeDetails.Style}<br/>
                      <b>{strings.Art.pdrawnOn}</b> : {typeDetails.Drawn_on}<br/>
                </CSubtitle>
              }

            {artType == "Sculpture" && 
                  <CSubtitle
                  variant={"body1"}
                  >
                      <b>{strings.Art.sheight}</b> : {typeDetails.Height}<br/>
                      <b>{strings.Art.sweight}</b> : {typeDetails.Weight}<br/>
                      <b>{strings.Art.smaterial}</b> : {typeDetails.Material}<br/>
                      <b>{strings.Art.stexture}</b> : {typeDetails.Texture}<br/>
                </CSubtitle>
              }   
              

              </Box>
            </Grid>
           
                   
          </Grid>
        </Ccontainer>
    </ThemeProvider>

  );
}


