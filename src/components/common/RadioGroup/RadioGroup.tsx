import React from "react";

import { RadioButton as RNPRadioButton } from "react-native-paper";

import { RadioGroupProps } from "./RadioGroup.types";
import {View} from "react-native";

const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  const { children, onToggle } = props;
  const [isSwitchOn, setIsSwitchOn] = React.useState("first");
  const onToggleSwitch = (key: string) => {
    if (onToggle) {
      onToggle(key);
    }
    setIsSwitchOn(key);
  };

  return (
    <RNPRadioButton.Group onValueChange={onToggleSwitch} value={isSwitchOn}>
      <View style={{flexDirection: 'row'}}>
        {React.Children.map(children, child => {
          return (
            !!child &&
            React.cloneElement(child, {
              checked: isSwitchOn
            })
          );
        })}

      </View>
    </RNPRadioButton.Group>
  );
};

export default RadioGroup;
