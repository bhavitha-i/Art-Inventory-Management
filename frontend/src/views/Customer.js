import * as React from 'react';
import CustomerList from "../components/CustomerList"
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Customer(){

    const options=[]
    options.push( { title:"Customers", url:"/customer"})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>

        <CustomerList />
        
    </ThemeProvider>
    );
}

export default withRoot(Customer)

