import * as React from 'react';
import ArtSuppliesList from '../components/ArtSuppliesList'
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';


function ArtSupplies(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar title={"  >  Art Supplies"}/>
        <ArtSuppliesList/>
    </ThemeProvider>
    );
}

export default withRoot(ArtSupplies)

