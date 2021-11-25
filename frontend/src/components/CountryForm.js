import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';








function CountryForm(props)  {
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
        }, []
      )

    


    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
          const CountryData=inputs;
            console.log(CountryData,"  --Data")
        
        if(isEdit){

            axios.put(process.env.REACT_APP_API_URL+'/country/'+inputs.id_Country,inputs)
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
                setMessage("Record Edited")
                window.location.href = "/#/settings/1";
              }
            })
            .catch(error => {
                console.log(error)
                setCallFlag(true)
                setErrAlert("error")
                setMessage("Error while editing Record")
            })
        }

        else{

            axios.post(process.env.REACT_APP_API_URL+'/country/add',inputs)
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
                setMessage("Record Added")
                window.location.href = "/#/settings/1";
                }
            })
            .catch(error => {
                console.log(error)
                setCallFlag(true)
                setErrAlert("error")
                setMessage("Error while adding Record")
            })

          }
        }
    }
    

      const handleInputChange = (event) => {
        event.persist();
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
            label={strings.Country.name}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Name}
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

export default withRoot(CountryForm);