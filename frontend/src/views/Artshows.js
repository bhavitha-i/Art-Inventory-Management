import * as React from 'react';
import ArtshowsList from '../components/ArtshowsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Art Shows"}/>
        <ArtshowsList/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

