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
import SnackBar from './SnackBar';
import Select from '@mui/material/Select';
import { MenuItem, Input, InputLabel } from '@mui/material';







function ArtStoreForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false); 
    const [addObj,setAddObj] = useState("")



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
            if(props.recordForEdit.ZipCode)
            {
              setAddObj(props.recordForEdit.Location_Address.ZipCode_ZipCode_in_State)
            }
          }
          else{
            setInputs([])
          }
          console.log(props,addObj,'----check inpu')
        }, []
      )

    
    const editStore = async() =>{
      axios.put(process.env.REACT_APP_API_URL+'/store/'+inputs.id_Store,inputs)
      .then(response =>{ 
          console.log(response.data,"from api")
          setErrAlert("success")
          setMessage("Art store Edited")
          setCallFlag(true)
          refreshPage()
          
      })
      .catch(error => {
          console.log(error)
          setErrAlert("error")
          setMessage("Error while editing Art show")
          setCallFlag(true)
      })
    }


    const addStore = async() =>{
      axios.post(process.env.REACT_APP_API_URL+'/store/add',inputs)
      .then(response =>{ 
          console.log(response.data,"from api")
          setErrAlert("success")
          setMessage("Art store Added")
          setCallFlag(true)
          refreshPage()
          
          
      })
      .catch(error => {
          console.log(error)
          setErrAlert("error")
          setMessage("Error while adding Art store")
          setCallFlag(true)

      })
    }

    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
          const artshow=inputs;
            console.log(artshow,"  --artshow")
            
        if(isEdit){
          if((inputs.Street1 != null || inputs.Street2 != null ) && inputs.ZipCode == null){
            setErrAlert("error")
            setMessage("Please choose a Zipcode")
            setCallFlag(true)
          }else if(inputs.Location == null && inputs.ZipCode){
            axios.post(process.env.REACT_APP_API_URL+'/address/add',inputs)
            .then(response =>{ 
                console.log(response.data.data,"from api")
                inputs.Location = response.data.data.id_Address
                editStore()
            })
            .catch(error => {
                console.log(error) })
          }else if(inputs.Location && inputs.ZipCode){
            console.log(inputs,'----')
            axios.put(process.env.REACT_APP_API_URL+`/address/${inputs.Location}`,inputs)
            .then(response =>{ 
                console.log(response.data.data,"from api")
                editStore()
            })
            .catch(error => {
                console.log(error) })
          }
          else{
            editStore()
          }
        }
        else{
          if((inputs.Street1 != null || inputs.Street2 != null )&& inputs.ZipCode == null){
            setErrAlert("error")
            setMessage("Please choose a Zipcode")
            setCallFlag(true)
          }else if(inputs.ZipCode){
            axios.post(process.env.REACT_APP_API_URL+'/address/add',inputs)
            .then(response =>{ 
                console.log(response.data.data,"from api")
                inputs.Location = response.data.data.id_Address
                addStore()
            })
            .catch(error => {
                console.log(error) })
          }else{
            addStore()
          }
          
          }
        }
    }
    
    const handleClick = (event,zip) => {
        setAddObj(zip) 
    }

      const handleInputChange = (event) => {
        // event.persist();
        // console.log(event)
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
            value={inputs.Name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="Phone"
            name="Phone"
            label="Phone"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Phone}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="Manager"
            name="Manager"
            label="Manager"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Manager}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="Street1"
            name="Street1"
            label="Street 1"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Street1}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="Street2"
            name="Street2"
            label="Street 2"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Street2}
          />
        </Grid>

        <Grid item xs={12}>
            <InputLabel htmlFor="select-label">Choose ZipCode</InputLabel>
            <Select
              
              input={<Input id="select-label" />}
              value={inputs.ZipCode || ''}
              onChange={handleInputChange}
              
              id="ZipCode" 
              name="ZipCode"
              fullWidth
              label="Choose ZipCode"
            >
                              
             {props.zips.map((st) => (
                <MenuItem value={st.ZipCode} onClick={(e)=>handleClick(e,st)}>{st.ZipCode}</MenuItem>
            ))} 

            </Select>
        </Grid> 
            
       
        { addObj &&  
        <Grid item xs={12}>
            <Typography variant="subtitle2">
              City: {addObj.CityName} <br/>
              State: {addObj.State && addObj.State.Name} <br/>
              Country: {addObj.State && addObj.State.Country.Name} <br/>
            </Typography>

          </Grid>
          }
        

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

export default withRoot(ArtStoreForm);