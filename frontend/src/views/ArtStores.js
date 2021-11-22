import * as React from 'react';

import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import ArtstoresList from '../components/ArtstoresList';

function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Art Shows"}/>
        <ArtstoresList />
       
    </ThemeProvider>
    );
}

export default withRoot(Home)