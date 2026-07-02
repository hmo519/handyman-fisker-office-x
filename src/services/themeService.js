const THEME_KEY = "hf-theme";

export const themes = {
  fisker: {
    name: "Fisker Blue",
    className: "theme-fisker",
  },
  carbon: {
    name: "Carbon Black",
    className: "theme-carbon",
  },
  construction: {
    name: "Construction Orange",
    className: "theme-construction",
  },
};

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "fisker";
}

export function saveTheme(themeKey) {
  localStorage.setItem(THEME_KEY, themeKey);
}

export function applyTheme(themeKey) {
  const theme = themes[themeKey] || themes.fisker;

  document.body.classList.remove(
    "theme-fisker",
    "theme-carbon",
    "theme-construction"
  );

  document.body.classList.add(theme.className);
  saveTheme(themeKey);
}

