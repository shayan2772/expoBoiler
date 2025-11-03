import { Dimensions, PixelRatio, Platform } from "react-native";
// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// Base dimensions (iPhone 14 Pro as reference)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Responsive font size calculator
 * Scales font sizes based on screen width for consistent appearance across devices
 */
export const fontScale = (size: number): number => {
  // For web, use different scaling based on window width
  if (Platform.OS === "web") {
    // Small screens (mobile-like on web)
    if (SCREEN_WIDTH <= 640) {
      return Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);
    }
    // Medium screens (tablets)
    else if (SCREEN_WIDTH <= 1024) {
      return Math.round(size * 1.1); // Slightly larger
    }
    // Large screens (desktop)
    else {
      return Math.round(size * 1.15); // Even larger for desktop
    }
  }

  // For mobile, scale based on screen width
  const scaleRatio = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scaleRatio;

  // Round to nearest pixel
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

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
