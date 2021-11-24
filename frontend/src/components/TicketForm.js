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
import moment from 'moment'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TrapFocus from '@mui/material/Unstable_TrapFocus';







function TicketForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [selExh,setSelExh]= useState("")
    const [seleSd, handleDateChangeSd] = useState();
    const [seleEd, handleDateChangeEd] = useState();




    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }



    useEffect(() => {

        }, []
      )

    


    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
       //Exhibit value assinged to Museum due to column name changes in db
          inputs.Museum = selExh[0].id_Art_Exhibition

          inputs.price=selExh[0].TicketPrice
          inputs.exhibit = selExh[0].id_Art_Exhibition

          const museum=inputs;
            console.log(museum,"  --museum")




            axios.post(process.env.REACT_APP_API_URL+'/customer_purchases/tickets',museum)
            .then(response =>{ 

                console.log(response.data,"from api")
                setErrAlert("success")
                setMessage("Ticket Added")
                setCallFlag(true)
                
            })
            .catch(error => {
                console.log(error)
                setCallFlag(true)
                setErrAlert("error")
                setMessage("Error while adding Exhibit")
            })

          
        }
    }
 
    const handleSel = (event) =>{
       
        
    }
    

      const handleInputChange = (event) => {
          if(event.target.name == "Exhibit"){
            setSelExh (props.exhibits.filter( (e) =>{
                return e.id_Art_Exhibition == event.target.value
            }))
          }
 
        
            
            
            handleDateChangeSd(selExh.StartTime)
     
          console.log(event.target.value,"trail in=======")
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }




  return (
    <ThemeProvider theme={theme}>
        {console.log("in ticket form",props.exhibits,props.customers)}
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
      
            <TrapFocus close disableAutoFocus>
        <Grid item xs={12}>
            <InputLabel required htmlFor="select-label">Select Exhibit</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.Exhibit || ''}
              onChange={(e) => {handleInputChange(e)}}
              id="Exhibit" 
              name="Exhibit"
              fullWidth
              label="Exhibit name"
            >
                              
             {props.exhibits.map(ct => (
                <MenuItem key={ct.id_Art_Exhibition} value={ct.id_Art_Exhibition}>{ct.Title}</MenuItem>
            ))} 
               
            </Select>
        </Grid> 


        
        </TrapFocus>


        <TrapFocus close disableAutoFocus>
        <Grid item xs={12}>
            <InputLabel required htmlFor="select-label">Select Customer</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.Customer || ''}
              onChange={handleInputChange}
              id="Customer" 
              name="Customer"
              fullWidth
              label="Customer Name"
            >
                              
             {props.customers.map(ct => (
                <MenuItem key={ct.id_Customer} value={ct.id_Customer}>{ct.FirstName+" "+ct.LastName}</MenuItem>
            ))} 
               
            </Select>
        </Grid> 


        
        </TrapFocus>




        

        <Grid item xs={12}>
            {console.log("before text",selExh[0])}
          <TextField
            required
            id="TicketPrice"
            name="TicketPrice"
            label={strings.Museum.ticketPrice}
            fullWidth
            variant="filled"
                
            value={selExh && selExh[0].TicketPrice}
          />
        </Grid>


        <Grid item xs={12}>
           
          <TextField
            required
            id="StartTime"
            name="Start Time"
            label="Exhibit starts from"
            fullWidth
            variant="filled"
                
            value={selExh && moment(selExh[0].StartTime).format('DD/MM/YYYY h:mm:ss a')}
          />
        </Grid>
        <Grid item xs={12}>
           
           <TextField
             required
             id="EndTime"
             name="End Time"
             label="Exhibit Ends on"
             fullWidth
             variant="filled"
             value={selExh && moment(selExh[0].EndTime).format('DD/MM/YYYY h:mm:ss a')}
           
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

export default withRoot(TicketForm);