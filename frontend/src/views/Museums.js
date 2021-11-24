import * as React from 'react';
import MuseumsList from '../components/MuseumsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Museum(){

    const options=[]
    options.push( { title:"Museums", url:"/museum"})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <MuseumsList/>
    </ThemeProvider>
    );
}

export default withRoot(Museum)

