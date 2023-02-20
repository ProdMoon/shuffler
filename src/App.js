import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Chip,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    let getStoredMode = localStorage.getItem("isDarkMode");
    if (getStoredMode === null) {
      localStorage.setItem("isDarkMode", false);
    }
    setIsDarkMode(getStoredMode === "true" ? true : false);
  }, []);

  function handleShuffle() {
    let arr = [];
    arr = arr.concat(document.getElementById("nameInput").value.split(","));
    arr.sort(() => Math.random() - 0.5);
    setNames(arr);
  }

  function toggleTheme() {
    localStorage.setItem("isDarkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="theme-switch">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
          />
        </FormGroup>
      </div>
      <div className="main">
        지금 섞어야 하니까,
        <Typography variant="h2">Shuffler.</Typography>
        <div className="inputbox">
          <TextField
            fullWidth
            id="nameInput"
            variant="outlined"
            defaultValue={"문준호,박경준,신치우,정나린,최다봄"}
          />
        </div>
        <div className="shuffle-button">
          <Button variant="contained" onClick={handleShuffle}>
            Shuffle!
          </Button>
        </div>
        <div className="chips-container">
          {names.map((name, i) => (
            <div className="chips" key={name}>
              <Chip label={`${i + 1}. ${name}`} size="medium" />
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
