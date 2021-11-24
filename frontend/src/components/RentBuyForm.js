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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router';





//----------------------------------------------------------------------------------


const Cdivider = styled(Divider)(() => ({
  margin: '3px 0 3px 0'
  
}));


//-----------------------------------------------------------------------------------


function RentBuyForm(props)  {
    const [storeId,setStoreId] =useState(useParams().storeId)
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [custs,setCusts] = useState(props.customers);
    const [isRent,setIsRent] = useState(false)



    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {

    },[]);




    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")
      inputs.price = props.art.Price
      inputs.rent = props.art.RentPerDay
      inputs.store = storeId
      inputs.Art = props.art.Art
      var days = ((new Date(inputs.RentFrom).getTime() - new Date(inputs.RentTo).getTime())/(1000*3600*24),"+++++++++++++")
      
      inputs.TotalRentValue = days * inputs.rent
    

      console.log(inputs,"inside submit")


      if(isRent){
        axios.put(process.env.REACT_APP_API_URL+`/customer_purchases_art_store/rent/${inputs.Art}`,inputs)
        .then(response =>{ 
          console.log(response.data,"rent from api")})
        .catch(error => {console.log(error)})

      }

      axios.put(process.env.REACT_APP_API_URL+`/customer_purchases_art_store/${inputs.Art}`,inputs)
      .then(response =>{ 
        console.log(response.data,"buy from api")})
      .catch(error => {console.log(error)})


    }
    

      const handleInputChange = (event) => {
        // event.persist();

        if(event.target.name == "RentorBuy" && event.target.value == 2){
            setIsRent(true)
            const premCust = props.customers.filter((c) =>{
                console.log(c); 
                return c.isprem == 1
            })
            console.log(premCust,"++++++++++++++++only prem")
            setCusts(premCust)
           
        }else{
            setIsRent(false)
            setCusts(props.customers)
        }
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }

      const handleDate = (event) =>{

        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }


  return (
    <ThemeProvider theme={theme}>
          { callFlag && <SnackBar errAlert={errAlert} message={message}  /> }
          {console.log("props in rent/buy",props)}
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
        <Grid item xs={12} style={styles.mb20}>
          <Typography> <b>Rent per Day : </b>${props.art.RentPerDay}</Typography>
        </Grid>

        <Grid item xs={12} >
        <FormControl component="fieldset">
          <FormLabel required component="legend" variant="body1">Rent/Buy</FormLabel>
          <RadioGroup
            row
            name="RentorBuy"
            value={inputs.RentorBuy}
            onChange={handleInputChange}
            required
            defaultValue={1}
          >
            <FormControlLabel value="1" control={<Radio />} label="Buy" />
            <FormControlLabel value="2" control={<Radio />} label="Rent" />


          </RadioGroup>
        
        </FormControl>

        {isRent && 
        <Grid Container>
            <Grid item xs={5}>
              <TextField
                id="Rent Start Date"
                label="From"
                type="date"
                fullWidth   
                name="RentFrom"         
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleDate}
                value={inputs.RentFrom|| ''}
              />
            </Grid>
            
            <Grid item xs={5}>
              <TextField
                id="Rent end Date"
                label="To"
                type="date"
                fullWidth   
                name="RentTo"         
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleDate}
                value={inputs.RentTo|| ''}
              />
            </Grid>
        </Grid>
      }   

        </Grid>

        <Cdivider light/>


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
                              
             {custs.map(st => (
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

export default withRoot(RentBuyForm);