import * as React from 'react';
import NavAppBar from '../components/NavAppBar';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import SettingsTabs from '../components/SettingsTabs';


function Home(){
    return (
    <ThemeProvider theme={theme}>
        <NavAppBar/>
        <SettingsTabs />
    </ThemeProvider>
    );
}

export default withRoot(Home)

