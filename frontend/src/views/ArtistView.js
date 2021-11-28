import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { useParams } from "react-router-dom";
import ArtistDetails from '../components/ArtsByList'

function ArtistView(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar/>
        <ArtistDetails id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(ArtistView)

