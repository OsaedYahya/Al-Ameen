import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface Props {
  name: string;
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle> & StyleProp<TextStyle>;
  aspectRatio?: number;
  startColor?: string;
  endColor?: string;
}

export type SafIconProps = Props;
