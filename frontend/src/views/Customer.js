import * as React from 'react';
import CustomerList from "../components/CustomerList"
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Customers"}/>

        <CustomerList />
        
    </ThemeProvider>
    );
}

export default withRoot(Home)

