import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale_font = SCREEN_WIDTH / 320;

const normalize = (size: number) => {
  const newSize = size * scale_font;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { normalize, scale, verticalScale, moderateScale };
