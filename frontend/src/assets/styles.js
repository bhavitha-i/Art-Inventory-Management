import { padding } from "@mui/system"

const HeaderContainer ={
    padding :"50px"
}

const MyProfileTabsBox ={
  height: "100vh",
  width: "200px",
  borderRight: 1,
  borderColor: 'divider',
}

const ArtStylesContainer={
  width: "90vw"
}

const ArtStylesBox={
  display: "flex",
  alignItems:"center",
  justifyContent: "space-between",
  padding:"5px"

}

const ArtStylesSeach={
    justifyContent: "flex-start",
    boxShadow: "none",
    backgroundColor: "inherit",
    width:"fit-content",
}

const ArtStylesAddButton={
  // justifyContent: "flex-end",
}

const TableActionIcons={
  justifyContent: "space-around",
  display: "flex",
}

const ArtistTableContainer={
  width: "80%",
  margin: "auto"
}


  const styles = {
    HeaderContainer: HeaderContainer,
    MyProfileTabsBox:MyProfileTabsBox,
    ArtStylesContainer:ArtStylesContainer,
    ArtStylesSeach:ArtStylesSeach,
    ArtStylesBox:ArtStylesBox,
    ArtStylesAddButton:ArtStylesAddButton,
    TableActionIcons:TableActionIcons,
    ArtistTableContainer:ArtistTableContainer
  }



  export default styles
