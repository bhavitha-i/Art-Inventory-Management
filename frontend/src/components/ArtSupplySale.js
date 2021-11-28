import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import Avatar from '@mui/material/Avatar';
import styles from '../assets/styles';



//----------------------------------------------------------------------------------



function ArtSupplySale(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);






    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {

    }, [])



    async function handleSubmit(event){
      event.preventDefault()
      inputs.ArtSupplies = props.item.id_Art_Supplies
      console.log(parseInt(inputs.Quantity) > parseInt(props.item.Quantity),"--- ")
      inputs.Quantity = parseInt(inputs.Quantity)

        if(parseInt(inputs.Quantity) > parseInt(props.item.Quantity)){
          setErrAlert("error")
          setMessage("Quanity more than available!")
          setCallFlag(true)
        }else{
          inputs.ASQuntityUpdate = parseInt(props.item.Quantity) - parseInt(inputs.Quantity)
          inputs.Price = props.item.Price * inputs.Quantity
          axios.post(process.env.REACT_APP_API_URL+'/artist_purchaces/add',inputs)
          .then(response =>{ 

              console.log(response.data,"from api")
              setErrAlert("success")
              setMessage("Artist Purchase completed. ")
              setCallFlag(true)
              refreshPage()
              
          })
          .catch(error => {
              console.log(error)
              setErrAlert("error")
              setMessage("Error while adding Art show")
              setCallFlag(true)

          })
        }
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }

  return (
    <ThemeProvider theme={theme}>
          { callFlag && <SnackBar errAlert={errAlert} message={message}  /> }
    <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component="form"  onSubmit={handleSubmit}
        >
      

      <Grid container spacing={3}>

      <Grid item xs={12}>
        <Typography><b>Art Supply : </b>{props.item.Name}</Typography>
      </Grid>

        <Grid item xs={12}>
            <InputLabel required htmlFor="select-label">To Artist</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.Artist || ''}
              onChange={handleInputChange}
              id="Artist" 
              name="Artist"
              fullWidth
              label="To Artist"
            >
                              
             {props.artists.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid> 


        <Grid item xs={12}>
          <TextField
            required
            id="Quantity"
            name="Quantity"
            label="Quantity"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Quantity|| ''}
          />
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

export default withRoot(ArtSupplySale);
