import React from "react";

import { Button as RNPButton } from "react-native-paper";

import buttonStyle from "./Button.style";
import { ButtonType } from "./Button.types";

const Button = (props: ButtonType): JSX.Element => {
  const { title = "", style, icon, mode = "contained", onPress, titleStyle } = props;
  const { label } = buttonStyle;
  return (
    <RNPButton
      labelStyle={[label, titleStyle]}
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={style}
    >
      {title}
    </RNPButton>
  );
};
export default Button;
