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
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../assets/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@mui/material/Link';
import Popup from './Popup'
import ArtistForm from './ArtistForm';
import SearchBar from "material-ui-search-bar";
import { Box } from '@mui/system';

// ----------------------------------------------------------------------


const Ccard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  }));


const Cmedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: "56.25%"

  }));

const Ccontent = styled(CardContent)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing.unit * 3    
  }));


  const Cdivider = styled(Divider)(({ theme }) => ({
    margin: `${theme.spacing.unit * 3}px 0`
    
  }));
  
  const CHeading = styled(Typography)(({ theme }) => ({
    fontWeight: "bold"
    
  }));

  const CSubtitle = styled(Typography)(({ theme }) => ({
    lineHeight: 1.8
    
  }));

  const CAvatar = styled(Avatar)(({ theme }) => ({
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing.unit
    }
    
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

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {

    const getArtists = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/artist/all')
            .then(response =>{ 
              setArtists(response.data)
              setRows(response.data)
              console.log(response.data,"from api")})
            .catch(error => {console.log(error)})
  };    
  getArtists()


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
getValues()

},[]);


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
        if(response.data == null){
            setCallFlag(true)
            setErrAlert("error")
            setMessage(response.message)
        }
        else{
        console.log(response.data,"from api")
        setCallFlag(true)
        setErrAlert("success")
        setMessage("Artist Deleted")
        refreshPage()
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
      <Box style={styles.ArtStylesBox}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Seach for Art Style"
        style={styles.ArtStylesSeach}
        />
         <Button
              type="submit"
              variant="contained"
              style={styles.ArtStylesAddButton}
              onClick={() => openAddPopup(true)}
      >
            Add
          </Button>
      </Box>
        <TableContainer component={Paper} style={styles.ArtistTableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell >{strings.Artist.id}</TableCell>
            <TableCell >{strings.Artist.name}</TableCell>
            <TableCell >{strings.Artist.phone}</TableCell>
            <TableCell >{strings.Artist.placebirth}</TableCell>
            <TableCell >{strings.Artist.style}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist) => (
            <TableRow
              key={artist.id_Artist}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell>
                {console.log(artist.Image,"in map")}
                    <Avatar variant="rounded" src={artist.Image} ></Avatar>
              </TableCell>
              <TableCell >{artist.id_Artist}</TableCell>
              <TableCell >{artist.Name}</TableCell>
              <TableCell >{artist.Phone}</TableCell>
              <TableCell >{artist.BirthPlace_Country && artist.BirthPlace_Country.Name}</TableCell>
              <TableCell >{artist.FamousStyle_Art_Style && artist.FamousStyle_Art_Style.StyleName}</TableCell>
              <TableCell>
                <Container  style={styles.TableActionIcons}>
                  <EditIcon onClick={() => openEditPopup(artist)}/>
                  <DeleteIcon onClick={() => deleteitem(artist)}/>
                  </Container>
              </TableCell>
              
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


