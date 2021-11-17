import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@mui/material/Typography';
import theme from "./theme";
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from "@mui/system";
import styles from "../assets/styles";
import ArtStyles from "./ArtStyles";
import Countries from "./Countries"
import States from "./States"
import Cities from "./Cities"


class SettingsTabs extends React.PureComponent {
    state = this.props
    handleChange = (_, activeIndex) => this.setState({ activeIndex });

    render() {
      const { activeIndex } = this.state;
      if(activeIndex == null){
        this.setState({ activeIndex:0 })
      }
      return (
        <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex", paddingTop: "10px"
          }}
        >
          <Box>
          <Tabs 
            value={activeIndex} 
            onChange={this.handleChange} 
            orientation="vertical" 
            sx={{ borderRight: 1, borderColor: 'divider' }}
            >
            <Tab label="Art Styles" />
            <Tab label="Country" />
            <Tab label="State" />
            <Tab label="City" />

          </Tabs>
          </Box>
  
          {activeIndex === 0 && <TabContainer> <ArtStyles/> </TabContainer>}
          {activeIndex === 1 && <TabContainer> <Countries/> </TabContainer>}
          {activeIndex === 2 && <TabContainer> <States/> </TabContainer>}
          {activeIndex === 3 && <TabContainer> <Cities/> </TabContainer>}

        </div>

          </ThemeProvider>
      );
    }
  }
  

  
  function TabContainer(props) {
    return (
      <Typography component="div" >
        {props.children}
      </Typography>
    );
  }
  
  export default SettingsTabs;
