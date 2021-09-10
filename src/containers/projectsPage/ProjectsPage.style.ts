import { StyleSheet } from "react-native";

import { LightTheme } from "~/theme/";

const projectsPageStyle = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  containerStyle: {
    backgroundColor: LightTheme.colors.primary,
    paddingHorizontal: 5
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

export default projectsPageStyle;
