import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface ButtonInterface {
  onPress?: () => void;
  icon?: string;
  style: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  mode?: "outlined" | "text" | "contained";
}
export type ButtonType = ButtonInterface;
