import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { useParams } from "react-router-dom";
import ArtstoreView from '../components/ArtstoreView'


function Home(){

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Store > Store Title "}/>
        <ArtstoreView id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

