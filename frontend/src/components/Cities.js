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
import StateForm from './StateForm';
import CityForm from './CityForm';






export default function ArtStyles() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
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

       getStates()
       getCities()
  },[]);


  const getCities = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/zipcode/all')
          .then(response =>{ 
            setCities(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};

const getStates = async () => {
        axios.get(process.env.REACT_APP_API_URL+'/state/all')
        .then(response =>{ 
          const data = response.data
          const options = data.map(s => ({
            "value" : s.id_State,
            "label" : s.Name

          }))
          setStates(options)
          console.log(options," state data from api")})
        .catch(error => {console.log(error)})
};

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.CityName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setStates(filteredRows);
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

  function deleteitem(record){

    axios.delete(process.env.REACT_APP_API_URL+'/zipcode/'+record.ZipCode)
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
        setMessage("Record Deleted")
        window.location.href = "/#/settings/3";
      }
    })
    .catch(error => {
        console.log(error)
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Error while deleting record")
    })
    

  }
  
  return (
    <Container style={styles.SettingsContainer}>
      <Box style={styles.SettingsBox}>
        <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search for City"
        style={styles.SettingsSearch}
        />
         <Button
              type="submit"
              variant="contained"
              style={styles.SettingsAddButton}
              onClick={() => openAddPopup(true)}
      >
            Add
          </Button>
      </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Record table">
        <TableHead>
          <TableRow>
            <TableCell >{strings.City.zipcode}</TableCell>
            <TableCell >{strings.City.name}</TableCell>
            <TableCell >{strings.City.state}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((record) => (
            <TableRow 
              key={record.ZipCode}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell >{record.ZipCode}</TableCell>
              <TableCell >{record.CityName}</TableCell>
              <TableCell >{record.State && record.State.Name}</TableCell>
              <TableCell style={styles.TableActionIcons}>
                    <EditIcon onClick={() => openEditPopup(record)}/>
                    <DeleteIcon onClick={() => deleteitem(record)}/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <Popup
                title={isEdit?"Edit City":"Add City"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CityForm 
                    states = {states}
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </Container>
  );
}