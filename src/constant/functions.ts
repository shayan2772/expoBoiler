import * as Device from "expo-device";
import { Dimensions, Platform } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const guidelineBaseWidth = 375;

export const getLangLabel = (code: string) => {
  switch (code) {
    case "ur":
      return "اردو";
    case "fr":
      return "Français";
    default:
      return "English";
  }
};

export const fontScale = (size: number): number => {
  const width = windowWidth;
  const height = windowHeight;

  // Screen dimension based scaling
  const scaleFactor = Math.min(width / guidelineBaseWidth, 1.3);

  // Device type detection
  const isTablet =
    Device.deviceType === Device.DeviceType.TABLET ||
    width > 900 ||
    (width > height && width > 700); // landscape tablet detection

  const isSmallDevice = width < 350;
  const isLargeTablet = width > 1100;

  // Platform and device specific adjustments
  let adjustedFactor;

  if (isTablet) {
    if (isLargeTablet) {
      adjustedFactor = 0.7; // Large tablets - slightly larger fonts
    } else {
      adjustedFactor = 0.65; // Regular tablets
    }
  } else if (isSmallDevice) {
    adjustedFactor = Platform.OS === "ios" ? 0.85 : 0.8; // Small phones
  } else {
    adjustedFactor = Platform.OS === "ios" ? 0.95 : 0.9; // Regular phones
  }

  const scaled = size * scaleFactor * adjustedFactor;

  // Minimum font size ensure readability
  const minSize = Math.max(size * 0.8, 8);
  const finalSize = Math.max(Math.round(scaled), minSize);

  return finalSize;
};
