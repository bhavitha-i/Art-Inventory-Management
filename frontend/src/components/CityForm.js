import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings';
import SnackBar from './SnackBar';
import InputLabel from '@mui/material/InputLabel';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { Button, Input } from '@mui/material';
import Select from '@mui/material/Select';







function CityForm(props)  {
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
          const CityData=inputs;
            console.log(CityData,"  --Data")
        
        if(isEdit){

            axios.put(process.env.REACT_APP_API_URL+'/zipcode/'+inputs.ZipCode,inputs)
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
                window.location.href = "/#/settings/3";
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

            axios.post(process.env.REACT_APP_API_URL+'/zipcode/add',inputs)
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
                window.location.href = "/#/settings/3";

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
        // event.persist();
        // console.log(event.target.value)
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
            id="CityName"
            name="CityName"
            label={strings.City.name}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.CityName}
          />
        </Grid>


        <Grid item xs={12}>
          <TextField
            required
            id="ZipCode"
            name="ZipCode"
            label={strings.City.zipcode}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.ZipCode}
          />
        </Grid>



        <TrapFocus close disableAutoFocus>
        <Grid item xs={12}>
            <InputLabel required htmlFor="select-label">{strings.City.state}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.StateId || ''}
              onChange={handleInputChange}
              id="StateId" 
              name="StateId"
              fullWidth
              label={strings.City.state}
            >
                              
             {props.states.map(row => (
                <MenuItem key={row.value} value={row.value}>{row.label}</MenuItem>
            ))} 

            </Select>
        </Grid> 
        </TrapFocus> 

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

export default withRoot(CityForm);