import { useEffect, useState } from "react";
import {
  applyTheme,
  getTheme,
  themes,
} from "../services/themeService";

function ThemeSwitcher() {
  const [selectedTheme, setSelectedTheme] = useState(getTheme());

  useEffect(() => {
    applyTheme(selectedTheme);
  }, [selectedTheme]);

  function handleChange(event) {
    setSelectedTheme(event.target.value);
  }

  return (
    <div className="hfCard">
      <h3>🎨 Thema</h3>

      <p>Kies de uitstraling van HF Office X.</p>

      <select
        value={selectedTheme}
        onChange={handleChange}
        className="themeSelect"
      >
        {Object.entries(themes).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSwitcher;
