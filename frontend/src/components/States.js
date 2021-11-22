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
import  { useState, useEffect } from "react"
import axios from "axios";
import strings from '../assets/strings'
import styles from '../assets/styles';
import { Container } from '@mui/material';
import SearchBar from "material-ui-search-bar";
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Popup from './Popup'
import StateForm from './StateForm';






export default function ArtStyles() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [states, setStates] = useState([])
  const [countries, setCountries] = useState([])
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

       getCountries()
       getStates()
  },[]);


  const getStates = async () => {
    axios.get(process.env.REACT_APP_API_URL+'/state/all')
          .then(response =>{ 
            setStates(response.data)
            setRows(response.data)
            console.log(response.data,"from api")})
          .catch(error => {console.log(error)})
};

const getCountries = async () => {
        axios.get(process.env.REACT_APP_API_URL+'/country/all')
        .then(response =>{ 
          const data = response.data
          const options = data.map(s => ({
            "value" : s.id_Country,
            "label" : s.Name

          }))
          setCountries(options)
          console.log(options," Country data from api")})
        .catch(error => {console.log(error)})
};

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
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

  function deleteitem(style){

    axios.delete(process.env.REACT_APP_API_URL+'/state/'+style.id_Country)
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
        window.location.href = "/settings/2";
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
        placeholder="Search for State"
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
            <TableCell >{strings.State.id}</TableCell>
            <TableCell >{strings.State.name}</TableCell>
            <TableCell >{strings.State.country}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states.map((state) => (
            <TableRow 
              key={state.id_Country}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell >{state.id_State}</TableCell>
              <TableCell >{state.Name}</TableCell>
              <TableCell >{state.Country && state.Country.Name}</TableCell>
              <TableCell style={styles.TableActionIcons}>
                    <EditIcon onClick={() => openEditPopup(state)}/>
                    <DeleteIcon onClick={() => deleteitem(state)}/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <Popup
                title={isEdit?"Edit State":"Add State"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <StateForm 
                    countries = {countries}
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
    </Container>
  );
}