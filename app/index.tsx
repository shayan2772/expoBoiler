import { useTheme } from "@/src/context/themeContext";
import { Theme } from "@/src/theme/colors";
import { Font, fontSize, fonts } from "@/src/theme/fonts";
import { useFonts } from "expo-font";
import { useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const { colors, setTheme, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [fontsLoaded] = useFonts({
    fontRegular: Font.fontRegular,
    fontMedium: Font.fontMedium,
    fontSemibold: Font.fontSemibold,
    fontBold: Font.fontBold,
    fontExtraBold: Font.fontExtraBold,
  });

  if (!fontsLoaded) {
    return null; // show loader until fonts loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Theme: {theme}</Text>

      <View style={styles.buttonCon}>
        <Button
          title="Light"
          onPress={() => setTheme("light")}
          color={colors.primary}
        />
        <Button
          title="Dark"
          onPress={() => setTheme("dark")}
          color={colors.primary}
        />
        <Button
          title="Blue"
          onPress={() => setTheme("blue")}
          color={colors.primary}
        />
      </View>
    </View>
  );
}

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      color: theme.text,
      fontSize: fontSize.size30,
      fontFamily: fonts.fontBold,
    },
    buttonCon: {
      marginTop: 20,
      gap: 5,
    },
    button: {
      marginTop: 20,
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
  });
