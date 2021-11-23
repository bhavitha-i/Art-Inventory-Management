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
const p2Box={
  display: "flex",
  alignItems:"center",
  justifyContent: "flex-end",
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
const spaceBetween={
  justifyContent: "space-between",
  display: "flex",
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

const ASVImage={
  width:"100%",
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

}

const paddingBottom10={
  paddingBottm:"10px"
}

const MarginAuto={
  margin:"auto"
}

const level2ActionGrid={
  display: "flex",
  flexDirection: "column",
  justifyContent:"space-between"
}

const level2ActionIcons={
  display: "flex",
  justifyContent:"flex-end",
  cursor: "pointer"
}

const options={

  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"

}

const padding10={
  padding:"10px"
}

const disaplyFlex={
  display:"Flex"
}

const AVbidlist={
  padding:"10px",
  margin:"auto",
  maxWidth:"95%"
}

const MenuIcon={
  position: "absolute", color: "white",top: 10,left: "90%",transform: "translateX(-50%)"
}

const HeiWid50={
  width:"50px",
  height:"50px",
}

const ml20={
  marginLeft:"20px"
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
    options,
    spaceBetween,
    level2GContainer:level2GContainer,
    level1ActionButton:level1ActionButton,
    paddingBottom10:paddingBottom10,
    MarginAuto:MarginAuto,
    level2ActionGrid:level2ActionGrid,
    level2ActionIcons:level2ActionIcons,
    ASVImage,
    padding10,
    disaplyFlex,
    AVbidlist,
    MenuIcon,
    HeiWid50,
    ml20,
    p2Box
  }



  export default styles
