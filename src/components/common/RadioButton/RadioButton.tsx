import React from "react";

import { RadioButton as RNPRadioButton } from "react-native-paper";

import { RadioButtonProps } from "./RadioButton.types";

import { LightTheme } from "~/theme/";

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const {
    label = "",
    color = LightTheme.colors.primary,
    uncheckedColor = LightTheme.colors.primary,
    disabled,
    checked = "",
    value = "",
    style = {},
    labelStyle = { fontSize: 14 }
  } = props;
  return (
    <RNPRadioButton.Item
      mode={"android"}
      style={style}
      labelStyle={labelStyle}
      color={color}
      uncheckedColor={uncheckedColor}
      disabled={!!disabled}
      label={label}
      value={value}
      status={checked === value ? "checked" : "unchecked"}
    />
  );
};

export default RadioButton;
