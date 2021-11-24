import * as React from 'react';
import styles from '../assets/styles';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import withRoot from './WithRoot';
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';







const P1TableCell = styled(TableCell)(() => ({
    textAlign: "center",

  }));

function TicketData(props)  {
   




    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(true);
      }, 500);
      console.log('page to reload')
    }



    useEffect(() => {

        }, []
      )

    





  return (
    <ThemeProvider theme={theme}>
        <TableContainer component={Paper} style={styles.p2TableContainer}>
<Table sx={{ minWidth: 650 }} aria-label="Product table">
  <TableHead >
    <TableRow>
 
      {/* <P1TableCell >{strings.Artist.id}</P1TableCell> */}
      <P1TableCell style={styles.tickethead} >Ticket Number</P1TableCell>
      <P1TableCell style={styles.tickethead}>Customer Name</P1TableCell>

    </TableRow>
  </TableHead>
  <TableBody>
    {props.tickets.data.map((ticket) => (
      <TableRow
        key={ticket.id_Exhibition_Tickets}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >

        <P1TableCell>
        {ticket.id_Exhibition_Tickets}
        </P1TableCell>
  
        <P1TableCell>{ticket.Customer_Customer.FirstName + " "+ticket.Customer_Customer.LastName}  </P1TableCell>
    
        
      </TableRow>
    ))}
    </TableBody>  
</Table>
</TableContainer>

      </ThemeProvider>
  );
}

export default withRoot(TicketData);