import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface RadioButtonInterface {
  label?: string;
  color?: string;
  checked?: string;
  uncheckedColor?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  value?: string;
}

export type RadioButtonProps = RadioButtonInterface;
