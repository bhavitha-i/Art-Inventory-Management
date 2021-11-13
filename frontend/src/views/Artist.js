import * as React from 'react';
import ArtistsList from '../components/ArtistsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar/>
        <ArtistsList/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

