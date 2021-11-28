/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { styled } from '@mui/material/styles';
import  { useState, useEffect } from "react"
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import styles from '../assets/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Icon } from '@iconify/react';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom'
import Popup from './Popup'
import ArtistForm from './ArtistForm';
import SearchBar from "material-ui-search-bar";
import { Box } from '@mui/system';
import SnackBar from './SnackBar';


// ----------------------------------------------------------------------



const P1TableCell = styled(TableCell)(() => ({
    textAlign: "center"

  }));


// -------------------------------------------------------


export default function ArtistsList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [artists, setArtists] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [artStyles, setArtStyles] = useState([]);
  const [countries, setCountires] = useState();
 
  const [artsBy,setArtsBy] =  useState();

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {
        
        getArtists()
        getValues()

  },[]);



const getValues = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/artStyle/all')
        .then(response =>{ 
          const data = response.data
          const options = data.map(s => ({
            "value" : s.id_Art_Styles,
            "label" : s.StyleName
      
          }))
          setArtStyles(options)
          console.log(options," art sytles from api")})
        .catch(error => {console.log(error)})

  axios.get(process.env.REACT_APP_API_URL+'/country/all')
        .then(response =>{ 
          const data = response.data
          const options = data.map(s => ({
            "value" : s.id_Country,
            "label" : s.Name
      
          }))
          setCountires(options)
          console.log(options," countries from api")})
        .catch(error => {console.log(error)})
        
}; 

const getArtists = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/artist/all')
        .then(response =>{ 
          setArtists(response.data)
          setRows(response.data)
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  


const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setArtists(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};

const openArtPopup = item =>{
  setArtsBy(item.Arts)

}


  const openEditPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
    setIsEdit(true)
  }
  

  const openAddPopup = item => {
    setOpenPopup(true)
    setIsEdit(false)
  }

  function deleteitem(item){

    axios.delete(process.env.REACT_APP_API_URL+'/artist/'+item.id_Artist)
    .then(response =>{ 
      console.log(response.data.status, response.status,'---res')
        if(response.data.status == true){
          console.log(response.data,"from api")
          setCallFlag(true)
          setErrAlert("success")
          setMessage("Artist Deleted")
          refreshPage()
        }
        else{
        setErrAlert("error")
        setMessage("Artist can not be deleted")
        setCallFlag(true)
        }
    })
    .catch(error => {
        console.log(error)
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Error while deleting Artist")
    })
    

  }







  return (
    <ThemeProvider theme={theme}>
                { callFlag && <SnackBar errAlert={errAlert} message={message} setCallFlag={setCallFlag} /> }
      <Box style={styles.p1Box}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for Artist"
        style={styles.SettingsSearch}
        />
         <Button
              type="submit"
              variant="contained"
              // style={styles.ArtStylesAddButton}
              onClick={() => openAddPopup(true)}
      >
            Add
          </Button>
      </Box>
        <TableContainer component={Paper} style={styles.p1TableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
            <P1TableCell></P1TableCell>
            {/* <P1TableCell >{strings.Artist.id}</P1TableCell> */}
            <P1TableCell >{strings.Artist.name}</P1TableCell>
            <P1TableCell >{strings.Artist.phone}</P1TableCell>
            <P1TableCell >{strings.Artist.placebirth}</P1TableCell>
            <P1TableCell >{strings.Artist.style}</P1TableCell>
            <P1TableCell></P1TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist) => (
            <TableRow
              key={artist.id_Artist}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
           
              <P1TableCell>
              <Link to={`/artistView/${artist.id_Artist}`} >
                    <Avatar variant="rounded" src={artist.Image} ></Avatar>
                    </Link>
              </P1TableCell>
              
              {/* <P1TableCell >{artist.id_Artist}</P1TableCell> */}
              <P1TableCell>{artist.Name}</P1TableCell>
              <P1TableCell >{artist.Phone}</P1TableCell>
              <P1TableCell >{artist.BirthPlace_Country && artist.BirthPlace_Country.Name}</P1TableCell>
              <P1TableCell >{artist.FamousStyle_Art_Style && artist.FamousStyle_Art_Style.StyleName}</P1TableCell>
              <P1TableCell>
                <Container  style={styles.TableActionIcons}>
                  <EditIcon onClick={() => openEditPopup(artist)}/>
                  <DeleteIcon onClick={() => deleteitem(artist)}/>
            
                
                  
                  </Container>
              </P1TableCell>
              
            </TableRow>
          ))}
          </TableBody>  
      </Table>
    </TableContainer>
            <Popup
                title={isEdit?"Edit Artist":"Add Artist"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <ArtistForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    artStyles={artStyles}
                    countries={countries}
                    />
                
            </Popup>


          
    </ThemeProvider>

  );
}


