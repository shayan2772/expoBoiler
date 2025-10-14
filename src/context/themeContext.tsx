import { Theme, ThemeName, themes } from "@/src/theme/colors";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Storage } from "../services/storage";

type ThemeContextType = {
  theme: ThemeName;
  colors: Theme;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: themes.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>("light");

  useEffect(() => {
    (async () => {
      const saved = await Storage.getItem("theme");
      if (saved && themes[saved as ThemeName]) {
        setThemeState(saved as ThemeName);
      } else {
        // optional: auto detect system theme
        // const system = Appearance.getColorScheme() === "dark" ? "dark" : "light";
        // setThemeState(system);
      }
    })();
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    Storage.setItem("theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
