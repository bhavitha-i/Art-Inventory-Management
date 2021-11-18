import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import theme from './components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import FileUpload from './components/FileUpload';


import Home from "./views/Home";
import Artist from "./views/Artist"
import Art from "./views/Arts"
import Settings from './views/Settings';
import ArtView from './components/ArtView'
import ArtShows from './views/Artshows'


function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/artist" element={<Artist />} />
        <Route  path="/art" element={<Art />} />
        <Route  path="/artview/:artId" element={<ArtView />} />
        <Route  path="/artshow" element={<ArtShows />} />



        <Route  path="/settings" element={<Settings />} />
        <Route  path="/settings/:index" element={<Settings />} />
        <Route  path="/fileUpload" element={<FileUpload />} />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
