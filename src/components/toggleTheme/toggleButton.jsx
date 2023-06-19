// ToggleButton.js
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "./themeContext";

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button className="mb-4 w-100" variant={theme === 'dark' ? "outline-light" : "outline-dark"} onClick={toggleTheme}>
      {theme === "dark" ? (
        <>
          <i className="fa-solid fa-sun"></i> Light Mode
        </>
      ) : (
        <>
          <i className="fa-solid fa-moon"></i> Dark Mode
        </>
      )}
    </Button>
  );
};

export default ToggleButton;
