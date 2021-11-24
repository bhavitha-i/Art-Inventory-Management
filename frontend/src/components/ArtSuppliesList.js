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
import ArtSupplyForm from './ArtSupplyForm';
import ArtSupplySale from './ArtSupplySale';
import SearchBar from "material-ui-search-bar";
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, MenuItem, Menu } from '@mui/material';
import PopupAction from './PopupAction';
import ArtSupplyTableRow from './ArtSupplyTableRow';


// ----------------------------------------------------------------------



const P1TableCell = styled(TableCell)(() => ({
    textAlign: "center"

  }));


// -------------------------------------------------------


export default function ArtSuppliesList() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [artsupplies, setArtsupplies] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [stores, setStores] = useState([]);
  const [artist, setArtists] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [poptitle,setPoptitle]=useState("")


  const open = Boolean(anchorEl);
  const [openPopup, setOpenPopup] = useState(false);
  const [popopen, setPopopen] = useState("");


  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }    


  useEffect(() => {
        
    getArtSupplies()
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
          console.log(options," stores from api")})
        .catch(error => {console.log(error)})

  axios.get(process.env.REACT_APP_API_URL+'/artist/all')
        .then(response =>{ 
          const data = response.data
          const options = data.map(s => ({
            "value" : s.id_Artist,
            "label" : s.Name
      
          }))
          setArtists(options)
          console.log(options," artists from api")})
        .catch(error => {console.log(error)})
        
}; 

const getArtSupplies = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/art_supplies/all')
        .then(response =>{ 
          setArtsupplies(response.data)
          setRows(response.data)
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  


const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setArtsupplies(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = (event,item) => {
    setAnchorEl(null);
    // console.log(item, "--")
    // console.log(event.currentTarget.value,"***")
    if(event.currentTarget.value == 1){
      openEditPopup(item)
    }else if(event.currentTarget.value == 2){
      deleteitem(item)
    }else if(event.currentTarget.value == 3){
      openSalePop(item)
    }

}
   
  
const openEditPopup = item => {
  setRecordForEdit(item)
  setIsEdit(true)
  setPoptitle("Edit Art Supply")
  setPopopen("edit")
  setOpenPopup(true)
}

const openSalePop = item => {
  setRecordForEdit(item)
  setPoptitle("Sell Art Supply to Artist")
  setPopopen("sale")
  setOpenPopup(true)
}


const openAddPopup = item => {
  setPoptitle("Add Art Supply")
  setPopopen("add")
  setIsEdit(false)
  setOpenPopup(true)
  console.log(popopen, "--- here")
}

  

  function deleteitem(item){

    axios.delete(process.env.REACT_APP_API_URL+'/art_supplies/'+item.id_Art_Supplies)
    .then(response =>{ 
        if(response.data == null){
            setErrAlert("error")
            setMessage(response.message)
            setCallFlag(true)

        }
        else{
        console.log(response.data,"from api")
        setErrAlert("success")
        setMessage("Art Supply Deleted")
        setCallFlag(true)
        refreshPage()
        }
    })
    .catch(error => {
        console.log(error)
        setErrAlert("error")
        setMessage("Error while deleting Art Supply")
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
        placeholder="Search for Art Supply"
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
            <P1TableCell >Name</P1TableCell>
            <P1TableCell >Quantity</P1TableCell>
            <P1TableCell >Price</P1TableCell>
            <P1TableCell >Store</P1TableCell>
            <P1TableCell></P1TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artsupplies.map((item) => (
            <ArtSupplyTableRow 
              item={item} 
              stores={stores} 
              artists={artist}
              openEditPopup={openEditPopup}
              deleteitem={deleteitem}
              openSalePop={openSalePop}
              />
          ))}
          </TableBody>  
      </Table>
    </TableContainer>
            <Popup
                title= {poptitle}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
             >
               {(popopen == "add" || popopen=="edit") &&
                <ArtSupplyForm 
                setOpenPopup={setOpenPopup}
                  stores={stores}
                  recordForEdit={recordForEdit}
                />
               }

              {popopen == "sale" &&
                <ArtSupplySale 
                  artists={artist}
                  item={recordForEdit}
                  setOpenPopup={setOpenPopup}
                />
               }
                
                
        </Popup>
    </ThemeProvider>

  );
}


