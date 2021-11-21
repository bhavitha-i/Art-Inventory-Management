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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------


const Ccontainer = styled(Container)(({ theme }) => ({
    marginTop: "20px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)"
    }
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


const CTableCell = styled(TableCell)(() => ({
  borderBottom : 0,
  // variant:"body1"
  fontSize: "small"
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
  const [bidInfo,setBidInfo] = useState([])
  const [bids, setBids]= useState([])



  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArtDetails()
        getHighBid()
        getBidvalues()
        

  },[]);

 
  const getBidvalues = async () => {
    const options ={
      "Art" :artId
    }
     
    // options.Art = props.art.Art
    // options.AtArtShow = props.art.AtArtShow
    axios.get(process.env.REACT_APP_API_URL+`/art_bids_artbids/${options.Art}`)
          .then(response =>{ 
            setBids(response.data)
            // setHighbid(response.data[0])
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
  };

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

const getHighBid = async () => {
  axios.get(process.env.REACT_APP_API_URL+`/art_bids_high/${artId}`)
  .then(response =>{ 
      setBidInfo(response.data)
      console.log(response, "--bidinfo")
  })
  .catch(error => {console.log(error)})
}



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

            <Grid item xs={4} >
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

            <Grid item xs={12} >
              <Box style={styles.AVInfoHeader}>
              <Typography variant="h5">{artType}</Typography>
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


            {artInfo.Status == 2 && artInfo.Art_in_Auctions.length >0 &&
            <Grid item xs={12}>
              <Box style={styles.AVInfoHeader}>
              <Typography variant="h5">Art Show : {artInfo.Art_in_Auctions[0].AtArtShow_Art_Show.Title}</Typography>
              <Cdivider/>
                  <CSubtitle
                  variant={"body1"}
                  >
                    <Grid Container style={styles.disaplyFlex}>
                      <Grid item xs ={12} sm={6}>
                        <b>{strings.ArtShow.price}</b> : ${artInfo.Art_in_Auctions[0].Price}<br/>
                        <b>{strings.ArtShow.startbid}</b> : ${artInfo.Art_in_Auctions[0].StartBid}<br/>
                        <b>{strings.ArtShow.higgestedbid}</b> : ${bidInfo.BidValue}<br/>
                       {bidInfo.Customer && <span><b>{strings.ArtShow.highbidby}</b> : ${bidInfo.Customer_Customer.FirstName} {bidInfo.Customer_Customer.LastName}</span>}<br/>
                      </Grid>
                      <Grid item xs ={12} sm={6}>
                        {bidInfo.ArtShow_Art_Show && <Box>
                        <b>{strings.ArtShow.host}</b> : {bidInfo.ArtShow_Art_Show.Host}<br/>
                        <b>{strings.ArtShow.phone}</b> : {bidInfo.ArtShow_Art_Show.Phone}<br/>
                        <b>{strings.ArtShow.url}</b> : {bidInfo.ArtShow_Art_Show.ShowURL}<br/>
                        </Box>
                        }
                      
                      </Grid> 
                    </Grid> 
                </CSubtitle>
              
                </Box>
            </Grid>
            }


        {artInfo.Status == 2 && artInfo.Art_in_Auctions.length >0 &&

          <Grid item xs ={12} style={styles.AVbidlist}>
          {bids.length >0  ?
            <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    View all bids for this art
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="Bids table">
                    <TableHead>
                      <TableRow>
                        <TableCell size="small">{strings.ArtShow.customer}</TableCell>
                        <TableCell size="small">{strings.ArtShow.bid}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bids.map((bid) => (
                        <TableRow 
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                          {bid.Customer && <CTableCell >{bid.Customer_Customer.FirstName} {bid.Customer_Customer.LastName}</CTableCell>}
                          {<CTableCell >${bid.BidValue}</CTableCell>}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </AccordionDetails>
              </Accordion>
              
          : 
          <Typography>No bids Available</Typography>}
          </Grid>
        }
                   
          </Grid>
        </Ccontainer>
    </ThemeProvider>

  );
}


