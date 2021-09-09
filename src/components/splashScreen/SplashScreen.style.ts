import { StyleSheet } from "react-native";

import { DarkTheme, LightTheme } from "~/theme/";

const styles = StyleSheet.create({
  bootSplashContainerLight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.background
  },
  bootSplashContainerDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DarkTheme.colors.background
  },
  bootsplashWrapperStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bootSplashLogoStyle: {
    width: "100%"
  },
  loaderWrapperStyle: {
    position: "absolute",
    width: "100%",
    height: "20%"
  }
});

export default styles;
