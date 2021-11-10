import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Artist from "./views/Artist"
import Settings from './views/Settings';
import theme from './components/theme';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/artist" element={<Artist />} />
        <Route  path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
