import { ThemeProvider } from "@/src/context/themeContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <Stack />
    </ThemeProvider>
  );
}
