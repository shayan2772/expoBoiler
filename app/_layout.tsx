import { ThemedStatusBar } from "@/src/components/themedStatusBar";
import { ThemeProvider } from "@/src/context/themeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

