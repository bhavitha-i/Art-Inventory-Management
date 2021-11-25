import * as React from 'react';
import ArtistsList from '../components/ArtistsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Artist(){
    const options=[]
    options.push( { title:"Artists", url:"/artistDisplay"})
    
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtistsList/>
    </ThemeProvider>
    );
}

export default withRoot(Artist)

