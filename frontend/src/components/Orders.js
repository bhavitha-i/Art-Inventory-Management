/* eslint-disable no-unused-vars */
import * as React from 'react';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
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


export default function Orders() {

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [orders, setOrders] = useState([])
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
        
        getOrders()
        // getValues()

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

const getOrders = async () => {
  axios.get(process.env.REACT_APP_API_URL+'/order/all')
        .then(response =>{ 
          setOrders(response.data)
          setRows(response.data)
          console.log(response.data,"from api")})
        .catch(error => {console.log(error)})
};  


const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return ( row.Customer_Customer.FirstName.toLowerCase().includes(searchedVal.toLowerCase()) 
            || row.Customer_Customer.LastName.toLowerCase().includes(searchedVal.toLowerCase()) );
    });
    setOrders(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};



  const handleAddrTypeChange = async (e,order) => {
    console.log((e.target.value,order))


  
   

    const statusUpdate={
        
        "PaymentStatus":e.target.value
    }
    console.log(order.order_id,"order")
    axios.put(process.env.REACT_APP_API_URL+`/order/${order.id_Order}`,statusUpdate)
    .then(response =>{ 

        console.log(response.data,"from api")
        setErrAlert("success")
        setMessage("Payment Added")
        setCallFlag(true)
        refreshPage()
        
    })
    .catch(error => {
        console.log(error)
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Error while adding Exhibit")
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
         {/* <Button
              type="submit"
              variant="contained"
              // style={styles.ArtStylesAddButton}
              onClick={() => openAddPopup(true)}
      >
            Add
          </Button> */}
      </Box>
        <TableContainer component={Paper} style={styles.p1TableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="Product table">
        <TableHead>
          <TableRow>
           
            {/* <P1TableCell >{strings.Artist.id}</P1TableCell> */}
            <P1TableCell >Order Id</P1TableCell>
            <P1TableCell >Customer Name</P1TableCell>
            <P1TableCell >Value</P1TableCell>
            <P1TableCell >Payment Status</P1TableCell>
            <P1TableCell >Action</P1TableCell>
            <P1TableCell >Date</P1TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id_Order}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

       
              {/* <P1TableCell >{artist.id_Artist}</P1TableCell> */}
              <P1TableCell>{order.id_Order}</P1TableCell>
              <P1TableCell>{order.Customer_Customer.FirstName + " "+order.Customer_Customer.LastName }</P1TableCell>
              <P1TableCell >{order.Value}</P1TableCell>
              <P1TableCell >{order.PaymentStatus_Payment_Status.Status}</P1TableCell>
              <P1TableCell >  <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
         
          }}
          onChange={(e) => handleAddrTypeChange(e,order)}
        >
            <option value={order.PaymentStatus_Payment_Status.Status}>-</option>
          <option value={0}>Initiated</option>
          <option value={1}>Pending</option>
          <option value={2}>Accepted</option>
          <option value={3}>Rejected</option>
        
        </NativeSelect></P1TableCell>
              <P1TableCell >{moment(order.Date).format('DD/MM/YYYY h:mm:ss a')}</P1TableCell>
             
             

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


