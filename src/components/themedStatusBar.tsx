import { StatusBar } from "react-native";
import { useTheme } from "../context/themeContext";

export function ThemedStatusBar() {
    const { theme, colors } = useTheme();
  
    return (
      <StatusBar
        animated
        translucent
        backgroundColor={colors.background}
        barStyle={
          theme === "dark" || theme === "blue" ? "light-content" : "dark-content"
        }
      />
    );
  }
  