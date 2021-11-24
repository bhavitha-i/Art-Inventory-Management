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




//----------------------------------------------------------------------------------



function ADSculptureUpdate(props)  {
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
          }

    }, [])



    async function handleSubmit(event){
      event.preventDefault()
      axios.put(process.env.REACT_APP_API_URL+'/sculpture_art/'+inputs.id_Sculpture_Art,inputs)
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

        <Grid item xs={12} sm={6}>
          <TextField
            id="Height"
            name="Height"
            label={strings.Art.sheight}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Height|| ''}
          />
        </Grid>
         


        <Grid item xs={12} sm={6}>
          <TextField
            id="Weight"
            name="Weight"
            label={strings.Art.sweight}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Weight|| ''}
          />
        </Grid>
         

        <Grid item xs={12} sm={6}>
          <TextField
            id="Material"
            name="Material"
            label={strings.Art.smaterial}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Material|| ''}
          />
        </Grid>
             
          

        <Grid item xs={12} sm={6}>
          <TextField
            id="Texture"
            name="Texture"
            label={strings.Art.stexture}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Texture|| ''}
          />
        </Grid>
         

        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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

export default withRoot(ADSculptureUpdate);