import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import * as Localization from "expo-localization";
import { SecureStorageService } from "@/src/services/storage";
import { I18nManager } from "react-native";

import en from "@/src/locales/en/translation.json";
import fr from "@/src/locales/fr/translation.json";
import ur from "@/src/locales/ur/translation.json";

const resources = {
  en: { translation: en },
  ur: { translation: ur },
  fr: { translation: fr },
};

export const initI18n = async () => {
  const savedLang = await SecureStorageService.getItem("language");
  // Localization.getLocales()[0]?.languageCode || "en";
  const lng = savedLang ||  "en";

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v4",
      resources,
      lng,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });

  // Handle RTL
  if (lng === "ur") {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  } else {
    if (I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  }

  return i18n;
};
