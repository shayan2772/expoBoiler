import { Theme, ThemeName, themes } from "@/src/theme/colors";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Storage } from "../services/storage";

type ThemeContextType = {
  theme: ThemeName;
  themeType: any;
  colors: Theme;
  setTheme: (t: ThemeName) => void;
  setThemeType: (t: any) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  themeType: "default",
  colors: themes.light,
  setTheme: () => {},
  setThemeType: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>("light");
  const [themeType, setThemeTypeState] = useState<any>("default");

  useEffect(() => {
    (async () => {
      const saved = await Storage.getItem("theme");
      const type = await Storage.getItem("themeType");
      if (saved && themes[saved as ThemeName]) {
        setTheme(saved as ThemeName);
      }
      if (type && type === "system") {
        setThemeType(type);
      }
    })();
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    Storage.setItem("theme", t);
  };

  const setThemeType = (t: any) => {
    setThemeTypeState(t);
    Storage.setItem("themeType", t);

    if (t === "system") autoDetectTheme();
  };

  const autoDetectTheme = () => {
    const system = Appearance.getColorScheme() === "dark" ? "dark" : "light";
    setTheme(system);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        colors: themes[theme],
        setTheme,
        setThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
