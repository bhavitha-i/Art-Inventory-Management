import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import SettingsTabs from '../components/SettingsTabs';
import { useParams } from "react-router-dom";

function Home( {settings} ){
    
    console.log(useParams(), "use param")
    let { index } = useParams();
    console.log(index, "   activeIndex")
    
    if(!index){
        index = 0
    }



    return (
    <ThemeProvider theme={theme}>
        <NavAppBar/>
        <SettingsTabs activeIndex={parseInt(index)} />
    </ThemeProvider>
    );
}

export default withRoot(Home)

