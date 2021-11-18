import { borderColor, padding } from "@mui/system"
import theme from "../components/theme"

const HeaderContainer ={
    padding :"50px"
}

const MyProfileTabsBox ={
  height: "100vh",
  width: "200px",
  borderRight: 1,
  borderColor: 'divider',
}

const SettingsContainer={
  width: "90vw"
}

const SettingsBox={
  display: "flex",
  alignItems:"center",
  justifyContent: "space-between",
  padding:"5px"

}

const p1Box={
  display: "flex",
  alignItems:"center",
  justifyContent: "space-between",
  padding:"5px",
  width:"80%",
  margin:"auto"

}

const SettingsSearch={
    justifyContent: "flex-start",
    boxShadow: "none",
    backgroundColor: "inherit",
    width:"fit-content",
}

const SettingsAddButton={
  // justifyContent: "flex-end",
}

const TableActionIcons={
  justifyContent: "space-around",
  display: "flex",
}

const p1TableContainer={
  width: "80%",
  margin: "auto"
}

const flexCentered ={
  display: "flex",
  justifyContent :"center"
}

const flexStart ={
  display: "flex",
  justifyContent :"flex-start"
}

const leftM0={
  margin : "auto auto auto 0"
}

const ArtCardContent={
  paddingBottom : "16px" 
}

const AVImage={
  width:"80%",
  height:"100%",
  margin:"auto"
}

const AVInfo={
  textAlign: "left",
  paddingLeft: "10%"
}

const AVArtistImage={
  width:"100px",
  height:"100px",
}

const AVInfoHeader={
  paddingLeft: "5%",
  paddingTop: "30px"
}

const level2Box={
  margin: "10px",
  borderColor: theme.palette.primary.main
}

const level2GContainer={
  display:"flex",
  padding:"10px"
}

const level1ActionButton={
  marginTop:"auto",
  marginBottom: "auto",

}



  const styles = {
    HeaderContainer: HeaderContainer,
    MyProfileTabsBox:MyProfileTabsBox,
    SettingsContainer:SettingsContainer,
    SettingsBox:SettingsBox,
    SettingsSearch:SettingsSearch,
    SettingsAddButton:SettingsAddButton,
    TableActionIcons:TableActionIcons,
    p1TableContainer:p1TableContainer,
    flexCentered:flexCentered,
    p1Box:p1Box,
    flexStart:flexStart,
    leftM0:leftM0,
    ArtCardContent:ArtCardContent,
    AVImage:AVImage,
    AVInfo:AVInfo,
    AVArtistImage:AVArtistImage,
    AVInfoHeader:AVInfoHeader,
    level2Box:level2Box,
    level2GContainer:level2GContainer,
    level1ActionButton:level1ActionButton
  }



  export default styles
