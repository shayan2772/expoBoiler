import { Font, fonts } from "@/src/theme/fonts";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
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
    <View className="flex-1 items-center justify-center bg-gray-400 p-5 gap-16">
     
     <View className="gap-3">
     <Text style={{ fontSize: 18 }} className="font-fontRegular">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18 }} className="font-fontMedium">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18 }} className="font-fontSemibold">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18 }} className="font-fontBold">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18 }} className="font-fontExtraBold">
        Edit app/index.tsx to edit this screen.
      </Text>
     </View>
   


     <View className="gap-3">
      <Text style={{ fontSize: 18, fontFamily: fonts.fontRegular, }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18, fontFamily: fonts.fontMedium, }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18, fontFamily: fonts.fontSemibold, }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18, fontFamily: fonts.fontBold, }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text style={{ fontSize: 18, fontFamily: fonts.fontExtraBold, }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      </View>
    </View>
  );
}
