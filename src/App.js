import logo from "./logo.svg";
import "./App.css";
import Create from "./Components/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./Components/Read";
import { ThemeProvider, useTheme } from "./utils/theme-context";
import Head from "./Components/Head";
import Update from "./Components/Update";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Head />

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Create />} />
            <Route  path="/read" element={<Read />} />
            <Route  path="/update" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
