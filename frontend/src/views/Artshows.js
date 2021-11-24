import * as React from 'react';
import ArtshowsList from '../components/ArtshowsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function ArtShow(){
    const options=[]
    options.push( { title:"Art Shows", url:"/artshow"})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtshowsList/>
    </ThemeProvider>
    );
}

export default withRoot(ArtShow)

