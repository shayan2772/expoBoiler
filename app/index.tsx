import { useTheme } from "@/src/context/themeContext";
import { Theme, ThemeName } from "@/src/theme/colors";
import { Font, fontSize, fonts } from "@/src/theme/fonts";
import { useFonts } from "expo-font";
import { useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const { colors, setTheme,setThemeType, theme,themeType } = useTheme();
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


  const onSetTheme=(val:ThemeName)=>{
    setThemeType("default")
    setTheme(val);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Theme: {theme}</Text>
      <Text style={styles.title}>Current Type: {themeType}</Text>

      <View style={styles.buttonCon}>
        <Button
          title="Light"
          onPress={() =>onSetTheme("light")}
          color={colors.primary}
        />
        <Button
          title="Dark"
          onPress={() => onSetTheme("dark")}
          color={colors.primary}
        />
        <Button
          title="Blue"
          onPress={() => onSetTheme("blue")}
          color={colors.primary}
        />
        <Button
          title="System"
          onPress={() => setThemeType("system")}
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
      fontSize: fontSize.size22,
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
