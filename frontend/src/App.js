import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import theme from './components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import FileUpload from './components/FileUpload';


import Home from "./views/Home";
import Artist from "./views/Artist"
import Art from "./views/Arts"
import Settings from './views/Settings';
import ArtView from './views/ArtView'
import ArtShowView from './views/ArtshowView'
import ArtShows from './views/Artshows'
import Museums from './views/Museums';
import ArtStores from './views/ArtStores';
import ArtStoreView from './views/ArtStoreView';
import Customer from './views/Customer'
import Orders from './views/Orders'
import Exhibits from './views/Exhibits';
import ExhibitView from './views/ExhibitView';
import ArtSupplies from './views/ArtSupplies'


function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/artist" element={<Artist />} />
        <Route  path="/customer" element={<Customer />} />
        <Route  path="/art" element={<Art />} />
        <Route  path="/artview/:Id" element={<ArtView />} />
        <Route  path="/artshow/:Id" element={<ArtShowView />} />
        <Route  path="/artstore/:Id" element={<ArtStoreView />} />
        <Route  path="/museum/:Id" element={<Exhibits />} />
        <Route  path="/exhibit/:Id" element={<ExhibitView />} />


        <Route  path="/artshow" element={<ArtShows />} />
   	    <Route  path="/artstore" element={<ArtStores />} />
        <Route  path="/museum" element={<Museums />} />
        <Route  path="/order" element={<Orders />} />
        <Route  path="/artsupplies" element={<ArtSupplies />} />

        <Route  path="/settings" element={<Settings />} />
        <Route  path="/settings/:index" element={<Settings />} />
        <Route  path="/fileUpload" element={<FileUpload />} />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
