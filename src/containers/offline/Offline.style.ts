import { StyleSheet } from "react-native";

import { normalize, verticalScale, scale } from "~/utils/responsivityUtil";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  lottieWrapperStyle: { height: "50%", width: "100%" },
  primaryTextStyle: { fontSize: normalize(14) },
  secondaryTextStyle: { fontSize: normalize(12), marginBottom: verticalScale(30) },
  buttonStyle: { paddingHorizontal: scale(15) },
  progressBarStyle: { height: 7 },
  progressBarWrapper: { width: "100%", position: "absolute", bottom: 2 }
});

export default styles;
