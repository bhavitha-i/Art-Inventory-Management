import * as React from 'react';
import ArtsList from '../components/ArtsList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function Home(){
    const options=[]
    options.push( { title:"Arts", url:"/art"})
    
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtsList/>
    </ThemeProvider>
    );
}

export default withRoot(Home)

