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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



//----------------------------------------------------------------------------------



function ADUpdate(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [fileData, setFileData] = useState("");
    const [fileFlag, setFileFlag] = useState(false);
    const [countries,setCountries] = useState([]);
    const [status,setStatus] = useState([]);
    const [artists,setArtists] = useState([]);
    const [artstyles,setArtstyles] = useState([]);



    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }


    useEffect(() => {

        if (props.recordForEdit != null){
            setInputs(props.recordForEdit)
          }
          getValues()

    }, [])


    const getValues = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/artStyle/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Art_Styles,
                "label" : s.StyleName
          
              }))
              setArtstyles(options)
              console.log(options," art sytles from api")})
            .catch(error => {console.log(error)})
    
      axios.get(process.env.REACT_APP_API_URL+'/country/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Country,
                "label" : s.Name
          
              }))
              setCountries(options)
              console.log(options," countries from api")})
            .catch(error => {console.log(error)})
  
      axios.get(process.env.REACT_APP_API_URL+'/art_status/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Art_Status,
                "label" : s.Status
          
              }))
              setStatus(options)
              console.log(options," art status from api")})
            .catch(error => {console.log(error)})
  
      axios.get(process.env.REACT_APP_API_URL+'/artist/all')
            .then(response =>{ 
              const data = response.data
              const options = data.map(s => ({
                "value" : s.id_Artist,
                "label" : s.Name
          
              }))
              setArtists(options)
              console.log(options," artist from api")})
            .catch(error => {console.log(error)})
            
  }; 



    const fileChangeHandler = (event) => {
      // event.preventDefault()
      setFileData(event.target.files[0]);
      setFileFlag(true)

    };


    async function editArt(event){
      axios.put(process.env.REACT_APP_API_URL+'/art/'+inputs.id_Art,inputs)
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
              setMessage("Art Edited")
              refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while editing Art")
          })
    }


    async function handleSubmit(event){
      event.preventDefault()
            if(fileFlag){
              console.log(fileData)
              const data = new FormData();
              data.append("Image",fileData);
              axios.post(process.env.REACT_APP_API_URL+'/uploadImage',data)
              .then(response =>{ 
                    if(response.data != null){
                      inputs.Image = response.data.filepath
                      // setInputs(inputs => ({...inputs, Image }));
                      
                      console.log(response.data,"******ResImage")
                      console.log(inputs)
                      editArt(event)
                    }
                  }
              )
              .catch(error => {
                  console.log(error)
              })

            }else{
                editArt(event)
            }
        
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
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
      

      <Grid container spacing={3}>

          {inputs.Image &&  
              <Grid item xs={12} style={styles.flexCentered}>
                  <Avatar
                    alt="Artist Image"
                    src={inputs.Image}
                    variant="square"
                    sx={{ width: '90px', height: '90px' }}
                />
              </Grid>}
          



        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Title"
            name="Title"
            label={strings.Art.title}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Title|| ''}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            
            id="Year"
            name="Year"
            label={strings.Art.year}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Year|| ''}
          />
        </Grid>



        <Grid item xs={12}>
          <TextField
            id="Description"
            name="Description"
            label={strings.Art.description}
            fullWidth
            maxRows={2}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Description|| ''}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
            <InputLabel required htmlFor="select-label">{strings.Art.created}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.CreatedBy || ''}
              onChange={handleInputChange}
              id="CreatedBy" 
              name="CreatedBy"
              fullWidth
              label={strings.Art.created}
            >
                              
             {artists.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
            <InputLabel required htmlFor="select-label">{strings.Art.country}</InputLabel>
            <Select
              required
              input={<Input id="select-label" />}
              value={inputs.CountryOfOrigin || ''}
              onChange={handleInputChange}
              id="CountryOfOrigin" 
              name="CountryOfOrigin"
              fullWidth
              label={strings.Art.country}
            >
                              
             {countries.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>




        <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="select-label">{strings.Art.style}</InputLabel>
            <Select
              
              input={<Input id="select-label" />}
              value={inputs.Style || ''}
              onChange={handleInputChange}
              id="Style" 
              name="Style"
              fullWidth
              label={strings.Art.style}
            >
             {artstyles.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 

            </Select>
        </Grid>


        <Grid item xs={12}  sm={6}>
          <InputLabel required>{strings.Art.image}</InputLabel>
            <Input 
              accept="image/*" 
              disableUnderline 
              id="Image" 
              type="file" 
              name="Image"
              onChange={(e) => fileChangeHandler(e)}
              
            />
        </Grid>    


        <Grid item xs={12}>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
        </Button>
        </Grid>
      </Grid>
      </Box>
      </Container>
      </ThemeProvider>
  );
}

export default withRoot(ADUpdate);