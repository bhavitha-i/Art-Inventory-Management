import * as React from 'react';
import ArtsList from '../components/ArtsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Arts"}/>
        <ArtsList/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

