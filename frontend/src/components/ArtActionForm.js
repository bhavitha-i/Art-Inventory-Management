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



function ArtistForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [fileData, setFileData] = useState("");
    const [fileFlag, setFileFlag] = useState(false);
    const [arttype, setArttype] = useState(1);
    const [typeinputs, setTypeinputs] = useState({});




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

    const fileChangeHandler = (event) => {
      // event.preventDefault()
      setFileData(event.target.files[0]);
      setFileFlag(true)

    };

    function verify(){
        if(inputs.fileFlag === false)
          return false
        else if(inputs.Type == null || inputs.Type == ''){
          inputs.Type = 1
          return true
        }
        else 
          return true
    }

    async function addArt(event){
      axios.post(process.env.REACT_APP_API_URL+'/art/add',{inputs,typeinputs})
          .then(response =>{ 
              if(response.data.message == "Validation error"){
                  setCallFlag(true)
                  setErrAlert("error")
                  setMessage(response.message)
              }
              else{
              console.log(response.data,"from api")
              setCallFlag(true)
              setErrAlert("success")
              setMessage("Art Added")
              // refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while adding Art")
          })
      
    }

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
              // refreshPage()
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
      console.log(inputs,typeinputs,"++++++++++")
      if(verify()){

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
                          if(isEdit){
                              editArt(event)
                          }else{
                              addArt(event)
                          }
                    }
                  }
              )
              .catch(error => {
                  console.log(error)
              })

            }else{
                  if(isEdit){
                      editArt(event)
                  }else{
                      addArt(event)
                  }
            }
          }
          else{
                 console.log("Verify failed")
                  setCallFlag(true)
                  setErrAlert("error")
                  setMessage("Error while adding Art")
          }
        
    }
    

      const handleInputChange = (event) => {
        // event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        if(event.target.name == "Type"){
          setArttype(event.target.value)
        }
      }

      const handleTypeInputChange = (event) => {
        // event.persist();
        setTypeinputs(typeinputs => ({...typeinputs, [event.target.name]: event.target.value}));
        if(event.target.name == "Type"){
          setArttype(event.target.value)
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
      

      <Grid container spacing={3}>

          {isEdit && inputs.Image &&  
              <Grid item xs={12} style={styles.flexCentered}>
                  <Avatar
                    alt="Artist Image"
                    src={inputs.Image}
                    sx={{ width: '80px', height: '80px' }}
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
                              
             {props.artists.map(st => (
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
                              
             {props.countries.map(st => (
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
                             {console.log(props,"--")} 
             {props.artstyles.map(st => (
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

        <Grid item xs ={12}>
        <FormControl component="fieldset">
          <FormLabel required component="legend">{strings.Art.type}</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="Type"
            value={inputs.Type}
            onChange={handleInputChange}
            defaultValue={1}
            required
          >
            <FormControlLabel value="1" control={<Radio />} label={strings.Art.painting} />
            <FormControlLabel value="2" control={<Radio />} label={strings.Art.sculpture} />
          </RadioGroup>
        </FormControl>

        </Grid>
            
        {arttype == 1 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            
            id="Style"
            name="Style"
            label={strings.Art.pStyle}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Style|| ''}
          />
        </Grid>
         }

      {arttype == 1 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Drawn_on"
            name="Drawn_on"
            label={strings.Art.pdrawnOn}
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Drawn_on|| ''}
          />
        </Grid>
         }  

      {arttype == 1 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Length"
            name="Length"
            label={strings.Art.plength}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Length|| ''}
          />
        </Grid>
         }  


    {arttype == 1 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Width"
            name="Width"
            label={strings.Art.pwidth}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Width|| ''}
          />
        </Grid>
         }  

      {arttype == 2 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Height"
            name="Height"
            label={strings.Art.sheight}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Height|| ''}
          />
        </Grid>
         } 


      {arttype == 2 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Weight"
            name="Weight"
            label={strings.Art.sweight}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Weight|| ''}
          />
        </Grid>
         } 

      {arttype == 2 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Material"
            name="Material"
            label={strings.Art.smaterial}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Material|| ''}
          />
        </Grid>
         }      
          

      {arttype == 2 &&  
        <Grid item xs={12} sm={3}>
          <TextField
            id="Texture"
            name="Texture"
            label={strings.Art.stexture}
            fullWidth
            variant="standard"
            onChange={handleTypeInputChange}
            value={typeinputs.Texture|| ''}
          />
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

export default withRoot(ArtistForm);