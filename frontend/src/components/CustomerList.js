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
import Link from '@mui/material/Link';
import Popup from './Popup'
import ArtistForm from './ArtistForm';
import SearchBar from "material-ui-search-bar";
import { Box } from '@mui/system';
import CustomerForm from './CustomerForm';

// ----------------------------------------------------------------------



const P1TableCell = styled(TableCell)(() => ({
    textAlign: "center"

  }));


// -------------------------------------------------------


export default function CustomerList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [customers, setCustomers] = useState([])
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
        
        getCustomers()
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

const getCustomers = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/customer/all')
        .then(response =>{ 
          setCustomers(response.data)
          setRows(response.data)
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  


const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return ( row.FirstName.toLowerCase().includes(searchedVal.toLowerCase()) 
              || row.LastName.toLowerCase().includes(searchedVal.toLowerCase())  );
    });
    setCustomers(filteredRows);
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

    axios.delete(process.env.REACT_APP_API_URL+'/customer/'+item.id_Customer)
    .then(response =>{ 
        if(response.data == null){
            setErrAlert("error")
            setMessage(response.message)
            setCallFlag(true)
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
        setErrAlert("error")
        setMessage("Error while deleting Artist")
        setCallFlag(true)
    })
    

  }







  return (
    <ThemeProvider theme={theme}>
      <Box style={styles.p1Box}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for Customer"
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
           
            {/* <P1TableCell >{strings.Artist.id}</P1TableCell> */}
            <P1TableCell >First Name</P1TableCell>
            <P1TableCell >Last Name</P1TableCell>
            <P1TableCell >Phone</P1TableCell>
            <P1TableCell >Email</P1TableCell>
            {/* <P1TableCell >Address</P1TableCell> */}
            <P1TableCell>Premimum membership</P1TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id_Customer}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

       
              {/* <P1TableCell >{artist.id_Artist}</P1TableCell> */}
              <P1TableCell>{customer.FirstName}</P1TableCell>
              <P1TableCell>{customer.LastName}</P1TableCell>
              <P1TableCell >{customer.Phone}</P1TableCell>
              <P1TableCell >{customer.Email}</P1TableCell>
              {/* <P1TableCell >TBD</P1TableCell> */}
              <P1TableCell >{customer.isPremium}</P1TableCell>
             
             
              
              <P1TableCell>
                <Container  style={styles.TableActionIcons}>
                  <EditIcon onClick={() => openEditPopup(customer)}/>
                  <DeleteIcon onClick={() => deleteitem(customer)}/>
                  </Container>
              </P1TableCell>
              
            </TableRow>
          ))}
          </TableBody>  
      </Table>
    </TableContainer>
            <Popup
                title={isEdit?"Edit Customer":"Add Customer"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
                <CustomerForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    artStyles={artStyles}
                    countries={countries}
                    />
                
            </Popup>
    </ThemeProvider>

  );
}


