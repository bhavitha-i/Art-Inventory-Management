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






export default function ArtStore_ArtStatus() {


  const [artStatus, setArtStatus] = useState([])



  useEffect(() => {

    const getData = async () => {
      axios.get(process.env.REACT_APP_API_URL+'/inStore_art_status/all')
            .then(response =>{ 
              setArtStatus(response.data)
              console.log(response.data,"from api")})
            .catch(error => {console.log(error)})
  };    
  getData()
  },[]);



  
  return (
    <Container style={styles.SettingsContainer}>
  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell >Instore - Art Status Id</TableCell>
            <TableCell >Instore - Art Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artStatus.map((status) => (
            <TableRow 
              key={status.id_Status}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell >{status.id_InStore_Art_Status}</TableCell>
              <TableCell >{status.Status}</TableCell>
              {/* <TableCell style={styles.TableActionIcons}>
                    <EditIcon onClick={() => openEditPopup(style)}/>
                    <DeleteIcon onClick={() => deleteitem(style)}/>

              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Container>
  );
}