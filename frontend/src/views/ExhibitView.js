import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { useParams } from "react-router-dom";
import ExhibitViewArt from '../components/ExhibitViewArts'


function Home(){
    const options=[]
    options.push( { title:"Museums", url:"/museumDisplay"})
    options.push( { title:"Exhibits"})


    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ExhibitViewArt id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

