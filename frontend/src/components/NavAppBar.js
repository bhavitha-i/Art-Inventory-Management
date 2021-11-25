/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import styles from '../assets/styles';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';




export default function NavAppBar(props) {

  const breadcrumbs= [
    <Link 
      underline="none" 
      variant="h5" 
      color="initial" 
      href="/#"
      sx={{ fontSize: 24 }}>
      {strings.common.artInventoryManagement } 
  </Link>
  ]

  props.options && props.options.map( (crum) =>{
    const obj =    
      <Link 
          underline="none" 
          variant="h5" 
          color="initial" 
          href={'/#'+crum.url}
          sx={{ fontSize: 24 }}>
          {crum.title} 
      </Link>
      breadcrumbs.push(obj)
  })


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1, }}>
        <Toolbar >
            
          <Typography  component="div" sx={{ flexGrow: 1 , fontSize:24}}>
            
          <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
          >
              {breadcrumbs}
        </Breadcrumbs>

          </Typography>

            <IconButton
              size="large"
              aria-label="account of current user"
              href="/#/settings"
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>

        </Toolbar>
    </Box>
    </ThemeProvider>

  );
}


