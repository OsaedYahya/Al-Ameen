import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type style = {
  labelFocused: TextStyle;
  labelUnfocused: TextStyle;
  buttonContainer: ViewStyle;
  container: ViewStyle;
};
const bottomTabButtonStyle = (theme: ReactNativePaper.Theme): style =>
  StyleSheet.create({
    labelFocused: {
      fontSize: 12,
      color: theme.colors.primary,
      fontFamily: theme.fonts.regular.fontFamily
    },
    labelUnfocused: {
      fontSize: 12,
      color: theme.colors.gray,
      fontFamily: theme.fonts.regular.fontFamily
    },
    buttonContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    },
    container: {
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default bottomTabButtonStyle;
