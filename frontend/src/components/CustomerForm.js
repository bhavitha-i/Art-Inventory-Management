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
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



//----------------------------------------------------------------------------------



function CustomerForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [isPrem,setIsPrem]=useState(false)





    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {

        console.log(props, '****'  , props.artStyles,  " from props")
        if (props.recordForEdit != null){
            setInputs(props.recordForEdit)
            setIsEdit(true)
          }
          else{
            setInputs([])
          }

    }, [])



    async function addCustomer(event){
        console.log(inputs,"in add function")
      axios.post(process.env.REACT_APP_API_URL+'/customer/add',inputs)
          .then(response =>{ 
              if(response.data == null){
                  setErrAlert("error")
                  setMessage(response.message)
                  setCallFlag(true)

              }
              else{
              console.log(response.data,"from api")
              setErrAlert("success")
              setMessage("Customer Added")
              setCallFlag(true)
              refreshPage()



                if(isPrem){
                  var now = new Date();
                  var duedate = new Date(now);
                  duedate.setDate(now.getDate() + 365);
                  
                   var premInputs={
                        "id_Customer":response.data.data.id_Customer,
                        "ExpiresOn":duedate
    
                    }
                    console.log(response.data.data.id_Customer,premInputs,"before customer")
             
                    axios.post(process.env.REACT_APP_API_URL+'/premimum_customer/add',premInputs)
                         .then(response =>{ 
                                if(response.data == null){
                                    console.log("Premium Details added")

                                }
                                else{
                                console.log(response.data,"from api")
                                setErrAlert("success")
                                setMessage("Customer Added")
                                setCallFlag(true)
                                refreshPage()
                                }
                            })
              .catch(error => {
                  console.log(error)
              })
            }

            }
          })
          .catch(error => {
              console.log(error)
          })




       


    
    }

    async function editCustomer(event){
      axios.put(process.env.REACT_APP_API_URL+'/customer/'+inputs.id_Customer,inputs)
          .then(response =>{ 
              if(response.data == null){
                  setErrAlert("error")
                  setMessage(response.message)
                  setCallFlag(true)

              }
              else{
              console.log(response.data,"from api")
              setErrAlert("success")
              setMessage("Customer Edited")
              setCallFlag(true)
              refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setErrAlert("error")
              setMessage("Error while editing Customer")
              setCallFlag(true)
          })
    }


    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")
      if (isEdit) {
         editCustomer(event);
      } else {
        addCustomer(event);
      }

        
    }

const handleinfo =(event) =>{
   
        if(event.target.value == 1){
        
        setInputs(inputs => ({...inputs, "isPremium": 1}));
        return
    }
    else setIsPrem(false)
    return

}
      const handleInputChange = (event) => {
        // event.persist();
        
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        if(event.target.name == "isPremium"){
          if(event.target.value == 1)
            setIsPrem(true)
          else
            setIsPrem(false)
        }
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
            id="FirstName"
            name="FirstName"
            label="First Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.FirstName|| ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="LastName"
            name="LastName"
            label="Last Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.LastName|| ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Phone"
            name="Phone"
            label="Phone"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Phone|| ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Email|| ''}
          />
        </Grid>

      

     


        <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel required component="legend" variant="body1">Premium Member</FormLabel>
          <RadioGroup
            row
            name="isPremium"
            value={inputs.isPremium || 0}
            onChange={handleInputChange}
            required
            
          >
            <FormControlLabel value="0" control={<Radio />} label="No" />
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
      

          </RadioGroup>
        
        </FormControl>
        </Grid> 
        {
            isPrem &&  <Grid item xs={12}>
            <Alert severity="info">Memeber ship expiers after one year from today</Alert>
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

export default withRoot(CustomerForm);
