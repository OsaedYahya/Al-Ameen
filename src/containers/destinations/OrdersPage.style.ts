import { StyleSheet } from "react-native";

import { LightTheme } from "~/theme/";

const ordersPageStyle = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  containerStyle: {
    backgroundColor: LightTheme.colors.primary,
    paddingHorizontal: 0
  },
  headerTextStyle: {
    color: LightTheme.colors.background
  },
  rowReverse: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    marginHorizontal: 4
  }
});

export default ordersPageStyle;
