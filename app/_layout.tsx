import { ThemedStatusBar } from "@/src/components/themedStatusBar";
import { initI18n } from "@/src/i18n/index";
import { persistor, store } from "@/src/state/store";
import { Font } from "@/src/theme/fonts";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    fontRegular: Font.fontRegular,
    fontMedium: Font.fontMedium,
    fontSemibold: Font.fontSemibold,
    fontBold: Font.fontBold,
    fontExtraBold: Font.fontExtraBold,
  });

  useEffect(() => {
    (async () => {
      await initI18n();
      setReady(true);
    })();
  }, []);

  if (!ready || !fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          }
        >
          <ThemedStatusBar />
          <Slot />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}
