import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import OrdersList from '../components/Orders'


function Orders(){

    const options=[]
    options.push( { title:"Customer Orders", url:"/order"})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <OrdersList/>
    </ThemeProvider>
    );
}

export default withRoot(Orders)

