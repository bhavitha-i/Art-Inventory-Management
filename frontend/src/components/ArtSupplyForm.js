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



function ArtistForm(props)  {
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

        if (props.recordForEdit != null){
            setInputs(props.recordForEdit)
            setIsEdit(true)
          }
          else{
            setInputs([])
          }

    }, [])



    async function addArtsit(event){
      axios.post(process.env.REACT_APP_API_URL+'/art_supplies/add',inputs)
          .then(response =>{ 
              if(response.data == null){
                  setCallFlag(true)
                  setErrAlert("error")
                  setMessage(response.message)
              }
              else{
              console.log(response.data,"from api")
              setErrAlert("success")
              setMessage("Art Supply Added")
              setCallFlag(true)
              // refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setErrAlert("error")
              setMessage("Error while adding Artist Style")
              setCallFlag(true)

          })
    }

    async function editArtist(event){
      axios.put(process.env.REACT_APP_API_URL+'/art_supplies/'+inputs.id_Art_Supplies,inputs)
          .then(response =>{ 
              if(response.data == null){
                  setCallFlag(true)
                  setErrAlert("error")
                  setMessage(response.message)
              }
              else{
              console.log(response.data,"from api")
              setErrAlert("success")
              setMessage("Art Supply Edited")
              setCallFlag(true)
              // refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while editing Artist")
          })
    }


    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")

                    if(isEdit){
                        editArtist(event)
                    }else{
                        addArtsit(event)
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
          <TextField
            required
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Name|| ''}
          />
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
          <TextField
            required
            id="Price"
            name="Price"
            label="Price"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Price|| ''}
          />
        </Grid>



        <Grid item xs={12}>
            <InputLabel required htmlFor="select-label">Art Store</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.AtStore || ''}
              onChange={handleInputChange}
              id="AtStore" 
              name="AtStore"
              fullWidth
              label="Art Store"
            >
                              
             {props.stores.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
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

export default withRoot(ArtistForm);
