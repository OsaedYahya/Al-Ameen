import { DefaultTheme, configureFonts } from "react-native-paper";

import "./theme.types";
import { FONT_CONFIG } from "./fonts/";

const LightTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  dark: false,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "#5EC3ED",
    accent: "#f1c40f",
    gray: "#888888",
    malibu: "#95E3F8",
    pictonBlue: "#5CC3EE",
    text: "#444444",
    white: "#FFFFFF"
  },
  fonts: configureFonts(FONT_CONFIG)
};

const DarkTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  dark: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "#338FCC",
    background: "#fff",
    accent: "#00c40f",
    gray: "#888888",
    malibu: "#4acff3",
    pictonBlue: "#20ade7",
    surface: "#0D2836",
    text: "#B1B1B2",
    white: "#FFFFFF"
  },
  fonts: configureFonts(FONT_CONFIG)
};

const ArrowTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    text: "#fff",
    white: "#FFFFFF"
  },
  fonts: configureFonts(FONT_CONFIG)
};

export { DarkTheme, LightTheme, ArrowTheme };
