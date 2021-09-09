import { Platform, I18nManager, Dimensions } from "react-native";

export const APP_SCREEN_WIDTH = Dimensions.get("window").width;
export const APP_SCREEN_HEIGHT = Dimensions.get("window").height;

// current platform
export const PLATFORM = Platform.OS;

// isRTL
export const isRTL = I18nManager.isRTL;

//remote config
export const FETCH_CACHE_TIME = 600; // 60 * 10
