import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container, InputLabel, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';


//----------------------------------------------------------------------------------



function ArtDeleteConfirm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");



    function toHomePage() {
      setTimeout(()=>{
        window.location.assign(`/#`);
      }, 700);
      console.log('page to reload')
    }


    useEffect(() => {
        setInputs(props.recordForEdit)
        console.log(props.recordForEdit)
    },[]);



    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")
      axios.delete(process.env.REACT_APP_API_URL+`/art/${inputs.id_Art}`)
      .then(response =>{ 
          if(response.data.status == true){
            setErrAlert("success")
            setMessage("Art Deleted Successfully!")
            setCallFlag(true)
            toHomePage()
          }
      })
      .catch(error => {console.log(error)})
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
          
        <Grid item xs={12} >
          <Typography variant="h5">Title : {inputs.Title}</Typography>
        </Grid>

        <Grid item xs={12} >
            <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Art will be deleted from Inventory. <strong>This Action can not be reverted!</strong>
            </Alert>
        </Grid>
       

        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete
        </Button>
        </Grid>
      </Grid>
      </Box>
      </Container>
      </ThemeProvider>
  );
}

export default withRoot(ArtDeleteConfirm);