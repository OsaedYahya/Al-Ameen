import React from "react";

import { TextInput as TextInputRNP, useTheme } from "react-native-paper";

import textInputStyle from "./TextInput.style";
import { TextInputType } from "./TextInput.types";

const TextInput = (props: TextInputType): JSX.Element => {
  const { colors } = useTheme();
  const { setValue, value, label } = props;
  const { textInput } = textInputStyle;
  return (
    <TextInputRNP
      theme={{ colors: { text: colors.text, placeholder: colors.gray } }}
      style={textInput}
      mode={"outlined"}
      multiline
      label={label}
      value={value}
      onChangeText={setValue}
    />
  );
};
export default TextInput;
