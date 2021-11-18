/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from '../components/theme'
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
import { useParams } from "react-router-dom";

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
  

  // console.log(useParams(), "use param")
  // let { artId } = useParams();
  // console.log(artId, "   activeId")


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
            if(response.status == true){
              setArtInfo(response.data)
              console.log(response.data,"from api")
            }else{
              console.log("Error getting data",response)
            }
          })
          .catch(error => {console.log(error)})
};  



  return (
    <ThemeProvider theme={theme}>

      <Ccontainer sx={{ py: 5 }} >
          <Grid container >
            
             <Grid item xs={4} >
                    <Card >
                        <Cmedia
                        image={"art" }
                        />
                        <Ccontent style={styles.ArtCardContent}>

                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            Heading
                        </CHeading>
                        <CSubtitle
                            variant={"caption"}
                        >
                                Caption
                        </CSubtitle>
                        <Cdivider light />
                          <Box style={styles.flexStart}>
                            <CAvatar  src={""} />
                            <CSubtitle
                            variant={"caption"}
                            style={styles.leftM0}
                            >
                            name
                        </CSubtitle>
                        </Box>
                        </Ccontent>
                    </Card>
              </Grid>
          </Grid>
        </Ccontainer>
    </ThemeProvider>

  );
}


