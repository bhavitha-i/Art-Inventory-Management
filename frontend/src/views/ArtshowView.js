import * as React from 'react';
import ArtShowView from '../components/ArtShowView'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { useParams } from "react-router-dom";


function ArtShowview(){
    const [options,setOptions]= React.useState([])
    options.push( { title:"Art Shows", url:"/artshow"})
    

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtShowView  id={useParams().Id}/>
    </ThemeProvider>
    );
}

export default withRoot(ArtShowview)

