import * as React from 'react';
import ArtSuppliesList from '../components/ArtSuppliesList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function ArtSupplies(){

    const options=[]
    options.push( { title:"Art Supplies", url:"/artsupplies"})

    return (
    <ThemeProvider theme={theme}>
        <NavAppBar options={options}/>
        <ArtSuppliesList/>
    </ThemeProvider>
    );
}

export default withRoot(ArtSupplies)

