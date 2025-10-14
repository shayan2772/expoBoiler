import * as Device from "expo-device";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Reference sizes (based on ~5" screen like Pixel 5 / iPhone 11)
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800 + 40;

// Scale helperss
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const vs = (size: number) => (height / guidelineBaseHeight) * size;

// ✅ Responsive font scale
const fontScale = (size: number) => {
  const scaleFactor = width / guidelineBaseWidth;

  const isTablet = Device.deviceType === Device.DeviceType.TABLET;
  let adjustedFactor;

  if (isTablet) {
    adjustedFactor = 0.55; // smaller fonts on tablets
  } else {
    adjustedFactor = Platform.OS === "ios" ? 0.95 : 0.88;
  }

  const scaled = size * scaleFactor * adjustedFactor;
  return Math.round(scaled);
};

export const fonts = {
  fontRegular: "fontRegular",
  fontMedium: "fontMedium",
  fontSemibold: "fontSemibold",
  fontBold: "fontBold",
  fontExtraBold: "fontExtraBold",
};

export const Font = {
  fontRegular: require("@/assets/fonts/SUSEMono-Regular.ttf"),
  fontMedium: require("@/assets/fonts/SUSEMono-Medium.ttf"),
  fontSemibold: require("@/assets/fonts/SUSEMono-SemiBold.ttf"),
  fontBold: require("@/assets/fonts/SUSEMono-Bold.ttf"),
  fontExtraBold: require("@/assets/fonts/SUSEMono-ExtraBold.ttf"),
};
 
 
export const fontSize = {
  size10: fontScale(10),
  size11: fontScale(11),
  size12: fontScale(12),
  size13: fontScale(13),
  size14: fontScale(14),
  size15: fontScale(15),
  size16: fontScale(16),
  size17: fontScale(17),
  size18: fontScale(18),
  size19: fontScale(19),
  size20: fontScale(20),
  size21: fontScale(21),
  size22: fontScale(22),
  size23: fontScale(23),
  size24: fontScale(24),
  size25: fontScale(25),
  size26: fontScale(26),
  size27: fontScale(27),
  size28: fontScale(28),
  size29: fontScale(29),
  size30: fontScale(30),
  size31: fontScale(31),
  size32: fontScale(32),
  size33: fontScale(33),
  size34: fontScale(34),
  size35: fontScale(35),
  size36: fontScale(36),
  size37: fontScale(37),
  size38: fontScale(38),
  size39: fontScale(39),
  size40: fontScale(40),
};
