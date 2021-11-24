import React from 'react';
import AppBar from '../components/NavAppBar'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
import styles from '../assets/styles';
import ArtHomeCard from './ArtHomeCard';
import ArtistHomeCard from './ArtistHomeCard';
import ArtShowsHomeCard from './ArtShowsHomeCard'
import ArtStoresHomeCard from './ArtStoresHomeCard'
import CustomersHomeCard from './CustomersHomeCard'
import MuseumHomeCard from './MuseumHomeCard'
import ArtSuppliesHomeCard from './ArtSuppliesHomeCard'
import OrderCard from './OrderCard'



// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
         <Container  style={styles.HeaderContainer}>

        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <ArtistHomeCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ArtHomeCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ArtShowsHomeCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ArtStoresHomeCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomersHomeCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MuseumHomeCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <OrderCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ArtSuppliesHomeCard />
          </Grid>


        </Grid>
      </Container>
    </ThemeProvider>
  );
}
