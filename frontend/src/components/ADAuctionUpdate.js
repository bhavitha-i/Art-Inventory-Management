import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';



//----------------------------------------------------------------------------------



function ADAuctionUpdate(props)  {
    const [inputs, setInputs] = useState({});
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

        if (props.recordForEdit != null){
            setInputs(props.recordForEdit)
            console.log(props,"--props")
          }

    }, [])



    async function handleSubmit(event){
      event.preventDefault()
      axios.put(process.env.REACT_APP_API_URL+'/art_in_auction/'+inputs.id_Art_Auction,inputs)
          .then(response =>{ 
              if(response.data == null){
                  setCallFlag(true)
                  setErrAlert("error")
                  setMessage(response.message)
              }
              else{
              console.log(response.data,"from api")
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Art Edited")
              refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while editing Art")
          })
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
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
      

      <Grid container spacing={3}>


          {console.log(inputs,"--")}

          <Grid item xs={12} sm={7}>
            <Typography variant="body1"><b>Art Show : </b>{inputs.AtArtShow_Art_Show && inputs.AtArtShow_Art_Show.Title} </Typography>
            <Typography variant="body1"><b>Host : </b>{inputs.AtArtShow_Art_Show && inputs.AtArtShow_Art_Show.Host} </Typography>
            <Typography variant="body1"><b>Number of bids on Art : </b>{props.bidsCount} </Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
              <TextField
                id="Price"
                name="Price"
                label={strings.ArtShow.price}
                variant="standard"
                onChange={handleInputChange}
                value={inputs.Price|| ''}
                fullWidth
                required
                
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <TextField
                id="StartBid"
                name="StartBid"
                label={strings.ArtShow.startbid}
                variant="standard"
                onChange={handleInputChange}
                value={inputs.StartBid|| ''}
                fullWidth
                required
              />
            </Grid>

          {props.bidsCount> 0 && 
          <Grid item xs ={12}>
          
          <Alert severity="error">Auction details can not be edited as bids are already placed.</Alert>

          </Grid>}    


        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {props.bidsCount>0}
            >
              Update
        </Button>
        </Grid>
      </Grid>
      </Box>
      </Container>
      </ThemeProvider>
  );
}

export default withRoot(ADAuctionUpdate);