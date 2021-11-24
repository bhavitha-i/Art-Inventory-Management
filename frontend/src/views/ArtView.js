import * as React from 'react';
import ArtDetails from '../components/ArtDetails'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { useParams } from "react-router-dom";


function ArtView(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar/>
        <ArtDetails id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(ArtView)

