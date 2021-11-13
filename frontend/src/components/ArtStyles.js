import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@mui/material/Link';
import  { useState, useEffect } from "react"
import axios from "axios";
import SnackBar from './SnackBar';
import strings from '../assets/strings'
import styles from '../assets/styles';
import trimWords from 'trim-words';
import { Container, Grid } from '@mui/material';
import SearchBar from "material-ui-search-bar";
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Popup from './Popup'
import ArtStyleForm from './ArtStyleForm';






export default function ArtStyles() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [artstyles, setStyles] = useState([])
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 500);
    console.log('page to reload')
  }


  useEffect(() => {

    const getStyles = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/artStyle/all')
            .then(response =>{ 
              setStyles(response.data)
              setRows(response.data)
              console.log(response.data,"from api")})
            .catch(error => {console.log(error)})
  };    
  getStyles()
  },[]);


  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.StyleName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setStyles(filteredRows);
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

  function deleteitem(style){

    axios.delete(process.env.REACT_APP_API_URL+'/artStyle/'+style.id_Art_Styles)
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
        setMessage("Art Style Deleted")
        refreshPage()
        }
    })
    .catch(error => {
        console.log(error)
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Error while deleting Art Style")
    })
    

  }
  return (
    <Container style={styles.ArtStylesContainer}>
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell >{strings.ArtStyles.id}</TableCell>
            <TableCell >{strings.ArtStyles.name}&nbsp;</TableCell>
            <TableCell >{strings.ArtStyles.desc}&nbsp;</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artstyles.map((style) => (
            <TableRow 
              key={style.id_Art_Styles}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell >{style.id_Art_Styles}</TableCell>
              <TableCell >{style.StyleName}</TableCell>
              <TableCell >{style.Description && trimWords(style.Description, 3, '...')}</TableCell>
              <TableCell style={styles.TableActionIcons}>
                    <EditIcon onClick={() => openEditPopup(style)}/>
                    <DeleteIcon onClick={() => deleteitem(style)}/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <Popup
                title={isEdit?"Edit Art Style":"Add Art Syle"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ArtStyleForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </Container>
  );
}