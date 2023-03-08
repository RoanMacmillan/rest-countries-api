import { useState } from "react";
import "./App.css";
import Moon from "./assets/images/moon.svg";
import "./DarkMode.css";
import Home from "./assets/pages/Home";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "darkMode" : "lightMode"}`}>
      <header>
        <h1>Where in the world?</h1>

          <button onClick={handleToggle}>
            <img src={Moon} className="moon" alt="Moon"></img>
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
      </header>
    <Home />
    </div>
  );
}

export default App;
