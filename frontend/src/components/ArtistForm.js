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



//----------------------------------------------------------------------------------



function ArtistForm(props)  {
    const [inputs, setInputs] = useState({});
    const [callFlag,setCallFlag] = useState(false);
    const [errAlert,setErrAlert] = useState("");
    const [message,setMessage] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [fileData, setFileData] = useState("");
    const [fileFlag, setFileFlag] = useState(false);





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


    async function addArtsit(event){
      axios.post(process.env.REACT_APP_API_URL+'/artist/add',inputs)
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
              setMessage("Artist Added")
              // refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while adding Artist Style")
          })
    }

    async function editArtist(event){
      axios.put(process.env.REACT_APP_API_URL+'/artist/'+inputs.id_Artist,inputs)
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
              setMessage("Artist Edited")
              // refreshPage()
              }
          })
          .catch(error => {
              console.log(error)
              setCallFlag(true)
              setErrAlert("error")
              setMessage("Error while editing Artist")
          })
    }


    async function handleSubmit(event){
      event.preventDefault()
      console.log(inputs,"++++++++++")

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
                        editArtist(event)
                    }else{
                        addArtsit(event)
                    }
              }
            }
        )
        .catch(error => {
            console.log(error)
        })

      }else{
            if(isEdit){
                editArtist(event)
            }else{
                addArtsit(event)
            }
      }
        
    }
    

      const handleInputChange = (event) => {
        // event.persist();
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

          {isEdit && inputs.Image &&  
              <Grid item xs={12} style={styles.flexCentered}>
                  <Avatar
                    alt="Artist Image"
                    src={inputs.Image}
                    sx={{ width: '80px', height: '80px' }}
                />
              </Grid>}
          



        <Grid item xs={12}>
          <TextField
            required
            id="Name"
            name="Name"
            label={strings.Artist.name}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Name|| ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Phone"
            name="Phone"
            label={strings.Artist.phone}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.Phone|| ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="WebsiteURL"
            name="WebsiteURL"
            label={strings.Artist.website}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={inputs.WebsiteURL|| ''}
          />
        </Grid>

        <Grid item xs={12}>
           <TextField
            id="DateOfBirth"
            label={strings.Artist.dob}
            type="date"
            fullWidth   
            name="DateOfBirth"         
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleInputChange}
            value={inputs.DateOfBirth|| ''}
          />
        </Grid>


        <TrapFocus close disableAutoFocus>
        <Grid item xs={12}>
            <InputLabel htmlFor="select-label">{strings.Artist.style}</InputLabel>
            <Select
              
              input={<Input id="select-label" />}
              value={inputs.FamousStyle || ''}
              onChange={handleInputChange}
              id="FamousStyle" 
              name="FamousStyle"
              fullWidth
              label={strings.Artist.style}
            >
                              
             {props.artStyles.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))} 
                <MenuItem key={0} value={0} >None</MenuItem>

            </Select>
        </Grid> 
        </TrapFocus> 

        <TrapFocus close disableAutoFocus>
        <Grid item xs={12}>
            <InputLabel htmlFor="select-label">{strings.Artist.placebirth}</InputLabel>
            <Select
              
              input={<Input id="select-label" />}
              value={inputs.BirthPlace || ''}
              onChange={handleInputChange}
              id="BirthPlace" 
              name="BirthPlace"
              fullWidth
              label={strings.Artist.placebirth}
            >
                              
             {props.countries.map(ct => (
                <MenuItem key={ct.value} value={ct.value}>{ct.label}</MenuItem>
            ))} 
                <MenuItem key={0} value={0} >None</MenuItem>

            </Select>
        </Grid> 


        
        </TrapFocus>

        <Grid item xs={12}>
            <Input 
              accept="image/*" 
              disableUnderline 
              id="Image" 
              type="file" 
              name="Image"
              // onChange={fileChangeHandler}
              onChange={(e) => fileChangeHandler(e)}
              // value={fileData|| ''}
              
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

export default withRoot(ArtistForm);