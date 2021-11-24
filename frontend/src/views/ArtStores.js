import * as React from 'react';

import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import ArtstoresList from '../components/ArtstoresList';

function ArtStore(){
    const options=[]
    options.push( { title:"Art Stores", url:"/artstore"})


    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtstoresList />
       
    </ThemeProvider>
    );
}

export default withRoot(ArtStore)