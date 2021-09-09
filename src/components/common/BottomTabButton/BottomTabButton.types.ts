import * as React from "react";

interface BottomTabButtonInterface {
  onPress: () => void | undefined;
  children?: React.ReactNode;
  shouldRotate?: boolean;
  text?: string;
  isFocused?: boolean;
}
export type BottomTabButtonType = BottomTabButtonInterface;
