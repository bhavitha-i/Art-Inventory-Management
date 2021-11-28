import * as React from 'react';
import Grid from '@mui/material/Grid';
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
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';







function ExhibitonForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [seleSd, handleDateChangeSd] = useState(new Date());
    const [seleEd, handleDateChangeEd] = useState(new Date());



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
            handleDateChangeSd(props.recordForEdit.StartTime)
            handleDateChangeEd(props.recordForEdit.EndTime)
            console.log(props, "--inputs")

          }
          else{
            setInputs([])
          }
        }, []
      )

    


    async function handleSubmit(event){
        if (event) {
          event.preventDefault();
          inputs.StartTime = seleSd
          inputs.EndTime = seleEd
          inputs.Museum = props.museumId
          const museum=inputs;
            console.log(museum,"  --museum")
        
        if(isEdit){

            axios.put(process.env.REACT_APP_API_URL+'/art_exhibition/'+inputs.id_Art_Exhibition,inputs)
            .then(response =>{ 
                console.log(response.data,"from api")
                setErrAlert("success")
                setMessage("Exhibit Edited")
                setCallFlag(true)
                refreshPage()
                
            })
            .catch(error => {
                console.log(error)
                setErrAlert("error")
                setMessage("Error while editing Exhibit")
                setCallFlag(true)

            })
        }

        else{

            axios.post(process.env.REACT_APP_API_URL+'/art_exhibition/add',inputs)
            .then(response =>{ 

                console.log(response.data,"from api")
                setErrAlert("success")
                setMessage("Exhibit Added")
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
    }
    

      const handleInputChange = (event) => {
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
            id="Title"
            name="Title"
            label={strings.Museum.exhibitTit}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Description"
            name="Description"
            label={strings.Museum.desc}
            fullWidth
            maxRows={2}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Description|| ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="TicketPrice"
            name="TicketPrice"
            label={strings.Museum.ticketPrice}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.TicketPrice}
          />
        </Grid>

        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label={strings.Museum.starttime}
                name="StartTime"
                inputVariant="standard"
                value={seleSd}
                fullWidth
                onChange={handleDateChangeSd}
              />
          </MuiPickersUtilsProvider>

        </Grid>


        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label={strings.Museum.endtine}
                name="EndTime"
                inputVariant="standard"
                value={seleEd}
                fullWidth
                onChange={handleDateChangeEd}
              />
          </MuiPickersUtilsProvider>

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

export default withRoot(ExhibitonForm);