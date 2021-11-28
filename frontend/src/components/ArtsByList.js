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
import { Box, padding, typography } from '@mui/system';
import styles from '../assets/styles';
import SearchBar from "material-ui-search-bar";
import { Link } from '@mui/material';
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import brushAndPencil from '@iconify/icons-si-glyph/brush-and-pencil';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import CssBaseline from '@mui/material/CssBaseline';
import PopupAction from './PopupAction';
import ArtDetailsUpdate from './ADartdetailsUpdate'
import PaintingUpdate from './ADPaintingUpdate'
import SculptureUpdate from './ADSculptureUpdate'
import AuctionUpdate from './ADAuctionUpdate'
import ArtStoreUpdate from './ADSaleStoreUpdate';
import TicketData from './TicketData';
import Popup from './Popup'
import Tooltip from '@mui/material/Tooltip';
import ArtistPurchs from './ArtistPurchs';


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

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;

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





// -------------------------------------------------------


export default function ArtsByList(props) {

  const [artistId,setArtistId] =useState(props.id)
  const [artistInfo, setArtistInfo] = useState([])
  const [openPopupTix, setOpenPopupTix] = useState(false);
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [artType,setArtType]=useState("")
  const [typeDetails,setTypeDetails]=useState([])
  const [bidInfo,setBidInfo] = useState([])
  const [bids, setBids]= useState([])
  const [showIcon, setShowIcon] = useState(false)
  const [poptitle, setPoptitle]= useState("")
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [poptype, setPoptype]= useState("")


  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {     
        getArtistDetails()
        console.log(props,'-props')
  },[]);

 


  const getArtistDetails = async () => {
    console.log(artistId, "--id")
    axios.get(process.env.REACT_APP_API_URL+`/artist/${artistId}`)
          .then(response =>{ 
              setArtistInfo(response.data.data)
            
           
              console.log(response.data,"from api",artistInfo)
          })
          .catch(error => {console.log(error)})
};  
const openAddPopupTix = item => {
  setOpenPopupTix(true)
  
}





  return (
    <ThemeProvider theme={theme}>
      {console.log("artistInfo -- ",artistInfo)}
      <Ccontainer sx={{ py: 5 }} >
          <Grid container >
            <Grid item xs={12}>
              <Box 
           
                >
              <Grid container >
                  <Grid item xs={4} >
                        <Avatar variant="square" style={styles.AVImage}
                      src={artistInfo.Image} 
                      />
                  </Grid>
                  <Grid item xs={4} >
                  <Box style={styles.AVInfo}>
                          <CHeading
                              variant={"h4"}
                              gutterBottom
                          >
                              {artistInfo.Name}
                          </CHeading>
                          <CSubtitle
                              variant={"body1"}
                          >
                          {artistInfo.Phone && <span> <b>Phone</b> : {artistInfo.Phone}<br/></span>}
                          {artistInfo.FamousStyle_Art_Style && <span> <b>Famous Style</b> : {artistInfo.FamousStyle_Art_Style.StyleName}<br/></span>}
                          <b>Date of Birth</b> : {artistInfo.DateOfBirth}<br/>
                          {artistInfo.WebsiteURL!=null && <span> <b>Website</b> : {artistInfo.WebsiteURL}<br/></span>}
                          <b>Country</b> : {artistInfo.BirthPlace_Country && artistInfo.BirthPlace_Country.Name}<br/>
                          <Tooltip title="Artist Purchases">
                          <Icon style={{cursor:"pointer", fontSize: '30px',color:"#196F3D"}} size="large" icon={brushAndPencil} onClick={() => openAddPopupTix(true)}/>
                          </Tooltip>  
                          </CSubtitle>
                        </Box>
                  </Grid>

                 
           
              </Grid>
              </Box>
            </Grid>
            

            <Grid item xs={12}>
              <Box style={styles.AVInfoHeader}
              >
                <Box style={styles.spaceBetweenFlexEnd}>
                  <Typography variant="h5" sx={{paddingTop:"11px"}}>Arts</Typography>

                </Box>
              <Cdivider/>
              <Container sx={{ py: 1 }} >
          {artistInfo.Arts && artistInfo.Arts.length === 0 && <Typography> No Arts Available</Typography>}
          <Grid container spacing={4} >
            {artistInfo.Arts && artistInfo.Arts.map(art => (
            
             <Grid item key={art} xs={3} >
                    <Ccard >
                      
                   
                         <Cmedia
                        image={ art.Image}
                        /> 
                        
                        <Ccontent style={styles.ArtCardContent}>
                        <Link
                          underline="none"
                          href={'/#/artview/'+art.id_Art}
                          color="inherit"Created
                        >
                        <CHeading
                            variant={"h6"}
                            gutterBottom
                        >
                            {art.Title}
                        </CHeading>
                        
                        </Link>
                    
                        <Cdivider light />

                        </Ccontent>
                    </Ccard>
              </Grid>
            ))}
          </Grid>

          
        </Container>


              </Box> 
              
            </Grid>

            


            

      
                   
          </Grid>
        </Ccontainer>
              {console.log(artistInfo.Artist_Purchases,"at the end")}
        <Popup
                title="Artist Purchases"
                openPopup={openPopupTix}
                setOpenPopup={setOpenPopupTix}
             >
                <ArtistPurchs
                     purchases={artistInfo.Artist_Purchases} 
                   
               
                    setOpenPopup={setOpenPopupTix}
                    />
                
            </Popup>

        
    </ThemeProvider>

  );
}


