import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Avatar, Checkbox, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';
import { Alert } from '@mui/material';
import styles from '../assets/styles';







function ExhibitArtForm(props)  {
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
        // setInputs(props.exhibitbools)
        // console.log(props,"--**props")
        }, []
      )



    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
          var addarray=[]
          var deletearray=[]

          const artKeys = Object.keys(inputs)
          artKeys.forEach((key) => {
            if(inputs[key]== true && props.exhibitbools[key] == false){
                addarray.push(key)
            }else if(inputs[key] == false && props.exhibitbools[key] == true){
                deletearray.push(key)
            }
          })

          console.log(addarray,"--add")
          console.log(deletearray,"--del")


          axios.put(process.env.REACT_APP_API_URL+`/art_in_exhibition_manage/${props.exhibitId}`,{addarray,deletearray})
              .then(response =>{ 
                if(response.status== 200){
                  setErrAlert("success")
                  setMessage("Arts updated")
                  setCallFlag(true)
                }
                console.log(response.data," Response from api")})
                refreshPage()
              .catch(error => {console.log(error)
              })
          }
    }
    

      const handleInputChange = (event) => {
        console.log(event.target.id,event.target.checked,"-- change, event")
        event.persist()
        setInputs(inputs => ({...inputs, [event.target.id]: event.target.checked}));
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
    <Alert severity="info" fullWidth>Selected art will be part of exhibition!</Alert>

        </Grid>
          {props.museumarts.map(art => ( 
        <Grid item xs={12} key={art.id_Art}>
            <Box display="flex" style={styles.padding10}>
                <Checkbox defaultChecked={art.inExhibit} id={art.id_Art} onChange={handleInputChange}/>  
                <Avatar style={styles.HeiWid50} variant="square" src = {art.Image}/>
                <Box style={styles.ml20}>
                <Typography variant="h6"> {art.Title}</Typography>
                <Typography variant="body1"> @{art.CreatedBy_Artist.Name}</Typography>
                </Box>
            </Box>
        </Grid>

        ))}


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

export default withRoot(ExhibitArtForm);