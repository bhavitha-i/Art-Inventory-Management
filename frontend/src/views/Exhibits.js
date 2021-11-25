import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import MuseumExhibits from '../components/MuseumExhibits'
import { useParams } from "react-router-dom";


function Home(){

    const options=[]
    options.push( { title:"Museums", url:"/museumDisplay"})
    options.push( { title:"Exhibits", url:""})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <MuseumExhibits id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

