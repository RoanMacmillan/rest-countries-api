import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Moon from "./assets/images/moon.svg";
import Sun from "./assets/images/sun.svg";
import "./DarkMode.css";
import Home from "./assets/pages/Home";
import CountryInfo from "./assets/pages/CountryInfo";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    
    <BrowserRouter>
      <div className={`App ${darkMode ? "darkMode" : "lightMode"}`}>
        <header>
          <div className="headerWrapper">
          <h1>Where in the world?</h1>

          <button type='button' className="headerBtn" onClick={handleToggle}>
            <img src={darkMode ? Sun : Moon} className="moon" alt="Moon"></img>
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          </div>
        </header>

        <Routes>
          <Route exact path="/" element={<Home />} />
          

          <Route path='/countries/:id' element={<CountryInfo />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
