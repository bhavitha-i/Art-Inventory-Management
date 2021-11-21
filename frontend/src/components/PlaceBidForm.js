import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Divider, InputLabel, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';
import styles from '../assets/styles';
import Avatar from "@material-ui/core/Avatar";
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
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


//----------------------------------------------------------------------------------


const Cdivider = styled(Divider)(() => ({
  margin: '3px 0 3px 0'
  
}));

const CTableCell = styled(TableCell)(() => ({
  borderBottom : 0
  
}));


//-----------------------------------------------------------------------------------


function PlaceBidForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [bids, setBids]= useState([])
    const [expanded, setExpanded] = useState(false);
    const [highbid, setHighbid] = useState("");



    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {
        getBidvalues()
    },[]);


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      console.log(isExpanded);
    };


    const getBidvalues = async () => {
      const options ={
        "Art" :props.art.Art, "AtArtShow":props.art.AtArtShow
      }
       
      // options.Art = props.art.Art
      // options.AtArtShow = props.art.AtArtShow
      axios.get(process.env.REACT_APP_API_URL+`/art_bids_artbids/${options.Art}/${options.AtArtShow}`)
            .then(response =>{ 
              setBids(response.data)
              setHighbid(response.data[0])
              console.log(response.data,"from api")})
            .catch(error => {console.log(error)})
    };



    function checkBidValue(){
        if(inputs.BidValue <= highbid.BidValue){
            return true
        }else{
          return false
        }
    }


    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")
      inputs.ArtShow = props.art.AtArtShow
      inputs.Art = props.art.Art

      if(checkBidValue){
      axios.post(process.env.REACT_APP_API_URL+'/art_bids/add',inputs)
      .then(response =>{ 
        if(response.status == 200){
            console.log("INto thos")
            setMessage("Bid added on the art!")
            setErrAlert("success")
            setCallFlag(true)
            refreshPage()
        }
        console.log(response.data,"from api")})
      .catch(error => {console.log(error)})
      }else{
        setMessage("Bid value must be greater than the Highest bid")
        setErrAlert("erroe")
        setCallFlag(true)
      }
        
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        // console.log(event,"---", inputs)
      }


  return (
    <ThemeProvider theme={theme}>
          { callFlag && <SnackBar errAlert={errAlert} message={message}  /> }
    <Container component="main" maxWidth="90%" >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component="form"  onSubmit={handleSubmit}
        >
      

      <Grid container spacing={1}>
          {console.log(props)}
          
        <Grid item xs={2} >
            <Avatar variant="square" style={styles.ASVImage}
                src={props.art.Art_Art.Image} 
              />
        </Grid>
        <Grid item xs={8} >
          <Typography variant="h5">{props.art.Art_Art.Title}</Typography>
          {props.art.Art_Art.CreatedBy && 
              <Typography>Created By : {props.art.Art_Art.CreatedBy_Artist.Name}</Typography>
              }
        </Grid>
        <Grid item xs={12} >
        <Cdivider light/>
        </Grid>

        <Grid item xs={12} >
          <Typography> <b>Price : </b>${props.art.Price}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography> <b>Starting Bid : </b>${props.art.StartBid}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography> <b>Highest Bid : </b>${highbid.BidValue}</Typography>
        </Grid>

        <Cdivider light/>

        <Grid item xs ={12}>
        {bids.length >0  ?
          <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
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
                      <TableCell >{strings.ArtShow.customer}</TableCell>
                      <TableCell >{strings.ArtShow.bid}</TableCell>
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

        <Grid item xs={12} sm={7}>
            <InputLabel required htmlFor="select-label">{strings.ArtShow.customer}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.Customer || ''}
              onChange={handleInputChange}
              id="Customer" 
              name="Customer"
              fullWidth
              label={strings.ArtShow.customer}
            >
                              
             {props.customers.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>
        
        <Grid item xs={12} sm={7}>
          <TextField
              required
              id="BidValue"
              name="BidValue"
              label={strings.ArtShow.bidValue}
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              value={inputs.BidValue|| ''}
            />
        </Grid>


        <Grid item xs={12} >
            {props.art.Status != null && 
              <Typography>Status : {props.art.Status_ArtStatus.Status}</Typography>
              }
        </Grid>
            
        
      


        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
        </Button>
        </Grid>
      </Grid>
      </Box>
      </Container>
      </ThemeProvider>
  );
}

export default withRoot(PlaceBidForm);