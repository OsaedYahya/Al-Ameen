type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;

const _FONT_COFIG = {
  regular: {
    fontFamily: "din_next_medium",
    fontWeight: "normal" as FontWeight
  },
  medium: {
    fontFamily: "din_next_bold",
    fontWeight: "normal" as FontWeight
  },
  light: {
    fontFamily: "din_next_light",
    fontWeight: "normal" as FontWeight
  },
  thin: {
    fontFamily: "din_next_light",
    fontWeight: "normal" as FontWeight
  }
};
const _FONT_COFIG_IOS = {
  regular: {
    fontFamily: "DINNextLTW23-Medium",
    fontWeight: "normal" as FontWeight
  },
  medium: {
    fontFamily: "DINNextLTW23-Heavy",
    fontWeight: "normal" as FontWeight
  },
  light: {
    fontFamily: "DINNextLTW23-Light",
    fontWeight: "normal" as FontWeight
  },
  thin: {
    fontFamily: "DINNextLTW23-Light",
    fontWeight: "normal" as FontWeight
  }
};
const FONT_CONFIG = {
  ios: _FONT_COFIG_IOS,
  android: _FONT_COFIG,
  web: _FONT_COFIG
};

export default FONT_CONFIG;
