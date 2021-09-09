import { StyleSheet } from "react-native";

import { normalize } from "~/utils/";

const styles = (theme: ReactNativePaper.Theme): any =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center"
    },
    secondaryTextStyle: {
      textAlign: "center",
      fontFamily: theme.fonts.light.fontFamily,
      fontSize: normalize(12),
      marginHorizontal: 24
    },
    primaryTextStyle: {
      marginVertical: 20,
      fontFamily: theme.fonts.medium.fontFamily,
      color: theme.colors.text,
      fontSize: normalize(13)
    }
  });
export default styles;
