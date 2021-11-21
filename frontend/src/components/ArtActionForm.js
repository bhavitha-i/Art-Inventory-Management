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
import styles from '../assets/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';



//----------------------------------------------------------------------------------



function ArtistForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [stores, setStores] = useState([])
    const [shows, setShows] = useState([])
    const [musuems, setMusuems] = useState([])
    const [moveTo, setMoveTo] = useState(1)



    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {
        getValues()

    },[]);

    const getValues = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/store/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Store,
                "label" : s.Name
          
              }))
              setStores(options)
              console.log(options,"stores from api")})
            .catch(error => {console.log(error)})
    
      axios.get(process.env.REACT_APP_API_URL+'/museum/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Museum,
                "label" : s.Name
          
              }))
              setMusuems(options)
              console.log(options," museums from api")})
            .catch(error => {console.log(error)})

      axios.get(process.env.REACT_APP_API_URL+'/art_show/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Art_Show,
                "label" : s.Title
          
              }))
              setShows(options)
              console.log(options," shows from api")})
            .catch(error => {console.log(error)})
      
            
    }; 


    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,moveTo,"++++++++++")
      if(moveTo == 1){
        inputs.Art = props.art.id_Art
          axios.post(process.env.REACT_APP_API_URL+'/art_in_store/add',inputs)
          .then(response =>{ 
              console.log(response.data,"from api")
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Art moved to art store.")
              // refreshPage()
              
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while adding Art")
          })
        }else if(moveTo == 2){
          inputs.Art = props.art.id_Art
          axios.post(process.env.REACT_APP_API_URL+'/art_in_auction/add',inputs)
          .then(response =>{ 
              console.log(response.data,"from api")
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Art moved to art show")
              // refreshPage()
              
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while adding Art")
          })
        }else if(moveTo == 3){
          inputs.Art = props.art.id_Art
          axios.post(process.env.REACT_APP_API_URL+'/art_in_museum/add',inputs)
          .then(response =>{ 
              console.log(response.data,"from api")
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Art moved to exhibition in Museum")
              // refreshPage()
              
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while adding Art")
          })
        }
        
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        console.log(event,"---", inputs)
        if(event.target.name == "MoveTo"){
          console.log("move to set",event.target.value)
          setMoveTo(event.target.value)
        }
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
          <Typography variant="h5">{props.art.Title}</Typography>
        </Grid>
        <Grid item xs={12} >
            {props.art.CreatedBy && 
              <Typography>Created By : {props.art.CreatedBy_Artist.Name}</Typography>
              }
        </Grid>

        <Grid item xs={12} >
            {props.art.Status != null && 
              <Typography>Status : {props.art.Status_ArtStatus.Status}</Typography>
              }
        </Grid>
            
        <Grid item xs={12} >
        <FormControl component="fieldset">
          <FormLabel required component="legend" variant="body1">Move to</FormLabel>
          <RadioGroup
            row
            name="MoveTo"
            value={inputs.MoveTo}
            onChange={handleInputChange}
            required
            defaultValue={1}
          >
            <FormControlLabel value="1" control={<Radio />} label="Art Store" />
            <FormControlLabel value="2" control={<Radio />} label="Art Show" />
            <FormControlLabel value="3" control={<Radio />} label="Museum" />

          </RadioGroup>
        
        </FormControl>

        </Grid>

        {moveTo == 1 && <Grid item xs={12} sm={7}>
            <InputLabel required htmlFor="select-label">{strings.ArtStore.choosestore}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.AtStore || ''}
              onChange={handleInputChange}
              id="AtStore" 
              name="AtStore"
              fullWidth
              label={strings.ArtStore.choosestore}
            >
                              
             {stores.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>}

        {moveTo == 1 &&  <Grid item xs={12} sm={7}>
          <TextField
            id="Price"
            name="Price"
            label={strings.ArtStore.price}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Price|| ''}
            fullWidth
            required
          />
        </Grid>}

        {moveTo == 1 &&  <Grid item xs={12} sm={7}>
          <TextField
            id="RentPerDay"
            name="RentPerDay"
            label={strings.ArtStore.rent}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.RentPerDay|| ''}
            fullWidth
            required
          />
        </Grid>}

        {moveTo == 2 && <Grid item xs={12} sm={7}>
            <InputLabel required htmlFor="select-label">{strings.ArtShow.chooseshow}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.AtArtShow || ''}
              onChange={handleInputChange}
              id="AtArtShow" 
              name="AtArtShow"
              fullWidth
              label={strings.ArtShow.chooseshow}
            >
                              
             {shows.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>}

        {moveTo == 2 &&  <Grid item xs={12} sm={7}>
          <TextField
            id="Price"
            name="Price"
            label={strings.ArtShow.price}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Price|| ''}
            fullWidth
            required
          />
        </Grid>}

        {moveTo == 2 &&  <Grid item xs={12} sm={7}>
          <TextField
            id="StartBid"
            name="StartBid"
            label={strings.ArtShow.startbid}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.StartBid|| ''}
            fullWidth
            required
          />
        </Grid>}


        {moveTo == 3 && <Grid item xs={12} sm={7}>
            <InputLabel required htmlFor="select-label">{strings.Museum.choosemusem}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.Museum || ''}
              onChange={handleInputChange}
              id="Museum" 
              name="Museum"
              fullWidth
              label={strings.Museum.choosemusem}
            >
                              
             {musuems.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>}

      


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