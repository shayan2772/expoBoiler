import { langData, themeData } from "@/src/constant/data";
import { useAppDispatch, useTheme } from "@/src/hooks/hooks";
import {
  setLanguage,
  setTheme,
  setThemeType,
} from "@/src/state/slices/generalSlice";
import { ThemeName } from "@/src/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
import { createStyles } from "./styles";

export default function Header() {
  const dispatch = useAppDispatch();
  const { colors, theme } = useTheme();
  const { i18n } = useTranslation();
  const styles = useMemo(() => createStyles(colors), [colors]);

  // console.log("theme : ", theme);
  // console.log("language : ", i18n.language);

  const renderItem2 = (item) => {
    return (
      <View style={[styles.item, item.value === theme && styles.selItem]}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View
        style={[styles.item, item.value === i18n.language && styles.selItem]}
      >
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  const changeLang = async (val: string) => {
    await i18n.changeLanguage(val);
    dispatch(setLanguage(val));
    
    // Handle RTL for native platforms
    if (Platform.OS !== "web") {
      const needsRTL = val === "ur";
      const currentIsRTL = I18nManager.isRTL;
      
      // Only reload if RTL direction needs to change
      if (needsRTL !== currentIsRTL) {
        if (needsRTL) {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
        } else {
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
        }
        
        // Reload app to apply RTL changes
        // This is necessary because I18nManager changes only take effect after app restart
        try {
        setTimeout(async () => {
          await Updates.reloadAsync();
        }, 50);
        } catch (error) {
          // If reload fails (e.g., in Expo Go), the change will apply on next app restart
          console.warn("Could not reload app. RTL change will apply on next restart:", error);
        }
      }
    } else {
      // Handle RTL for web
      if (typeof document !== "undefined") {
        if (val === "ur") {
          document.documentElement.dir = "rtl";
          document.documentElement.setAttribute("lang", "ur");
        } else {
          document.documentElement.dir = "ltr";
          document.documentElement.setAttribute("lang", val);
        }
      }
    }
  };

  const onSetTheme = async (val: ThemeName) => {
    dispatch(setThemeType("default"));
    dispatch(setTheme(val));
  };

  return (
    <View style={styles.container}>
      <View style={styles.rightSec}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownListCont}
          activeColor={colors.primary}
          showsVerticalScrollIndicator={false}
          dropdownPosition="auto"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={themeData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder=""
          value={theme}
          onChange={(item) =>
            item.value === "system"
              ? setThemeType(item.value)
              : onSetTheme(item.value)
          }
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={20}
              color={colors.icon}
            />
          )}
          renderRightIcon={() => null}
          renderItem={renderItem2}
        />
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownListCont}
          showsVerticalScrollIndicator={false}
          activeColor={colors.primary}
          dropdownPosition="auto"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={langData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder=""
          value={i18n.language}
          onChange={(item) => changeLang(item.value)}
          renderLeftIcon={() => (
            <Ionicons name="language" size={20} color={colors.icon} />
          )}
          renderRightIcon={() => null}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
