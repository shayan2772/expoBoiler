import { getLangLabel } from "@/src/constant/functions";
import { useTheme } from "@/src/context/themeContext";
import { Storage } from "@/src/services/storage";
import { Theme, ThemeName } from "@/src/theme/colors";
import { Font, fontSize, fonts } from "@/src/theme/fonts";
import { useFonts } from "expo-font";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const { colors, setTheme, setThemeType, theme, themeType } = useTheme();
  const { t, i18n } = useTranslation();
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

  const onSetTheme = (val: ThemeName) => {
    setThemeType("default");
    setTheme(val);
  };

  const changeLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await Storage.setItem("language", lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t("current")} {t("theme")}: {theme}
      </Text>
      <Text style={styles.title}>
        {t("current")} {t("type")}: {themeType}
      </Text>
      <Text style={styles.title}>
        {t("current")} {t("language")}: {getLangLabel(i18n.language)}
      </Text>

      <View style={styles.buttonCon}>
        <Button
          title="Light"
          onPress={() => onSetTheme("light")}
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

      <View style={styles.buttonCon}>
        <Button
          title="English"
          onPress={() => changeLang("en")}
          color={colors.primary}
        />
        <Button
          title="اردو"
          onPress={() => changeLang("ur")}
          color={colors.primary}
        />
        <Button
          title="Français"
          onPress={() => changeLang("fr")}
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
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 12,
    },
  });
