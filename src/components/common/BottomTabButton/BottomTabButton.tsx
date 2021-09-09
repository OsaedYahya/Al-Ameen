import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from "react-native-reanimated";

import bottomTabButtonStyle from "./BottomTabButton.style";
import { BottomTabButtonType } from "./BottomTabButton.types";

const INITIAL_SCALE = 1;
const FINAL_SCALE = 1.1;

const BottomTabButton = (props: BottomTabButtonType): JSX.Element => {
  const theme = useTheme();
  const { onPress, shouldRotate, children, text, isFocused } = props;
  const pulseAnimation = useSharedValue(INITIAL_SCALE);
  const rotateAnimation = useSharedValue(0);
  const translateAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: pulseAnimation.value },
        { translateY: -translateAnimation.value },
        { rotate: `${rotateAnimation.value}deg` }
      ]
    };
  });

  useEffect(() => {
    if (!shouldRotate) {
      pulseAnimation.value = withTiming(isFocused ? FINAL_SCALE : INITIAL_SCALE, {
        duration: 200
      });
    }
  }, [isFocused, pulseAnimation, shouldRotate]);

  const handleAnimateButton = () => {
    if (pulseAnimation.value === INITIAL_SCALE || pulseAnimation.value === FINAL_SCALE) {
      if (shouldRotate) {
        if (rotateAnimation.value === 0) {
          rotateAnimation.value = withSpring(45, { velocity: 500 });
        } else {
          rotateAnimation.value = withSpring(0, { velocity: 500 });
        }
      }
      if (isFocused) {
        pulseAnimation.value = withRepeat(
          withTiming(!isFocused ? FINAL_SCALE : INITIAL_SCALE, { duration: 150 }),
          2,
          true
        );
      }
      if (onPress) {
        onPress();
      }
    }
  };

  const { labelFocused, labelUnfocused, container, buttonContainer } =
    bottomTabButtonStyle(theme);

  return (
    <Pressable style={container} onPress={handleAnimateButton}>
      <View style={buttonContainer}>
        <Animated.View style={[animatedStyle]}>{children}</Animated.View>
        <Text style={isFocused ? labelFocused : labelUnfocused}>{text}</Text>
      </View>
    </Pressable>
  );
};
export default BottomTabButton;
