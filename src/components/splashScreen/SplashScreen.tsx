import React, { useEffect, useState } from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";
import RNBootSplash from "react-native-bootsplash";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import { useSelector } from "react-redux";

import styles from "./SplashScreen.style";
import { SplashScreenProps } from "./SplashScreen.types";

import LOTTIE from "~/assets/lottie/";
import { RootState } from "~/redux/store";
import { verticalScale } from "~/utils/responsivityUtil";

const bootSplashLogo = require("~/assets/images/logo.png");

const SplashScreen = (props: SplashScreenProps) => {
  const { isLoading } = props;
  const { isThemeDark } = useSelector((state: RootState) => state.settings);

  const [showLottie, setShowLottie] = useState(false);
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -offset.value }]
    };
  });

  const handleAnimationCallback = (isCompleted: boolean) => {
    isCompleted && setShowLottie(true);
  };

  useEffect(() => {
    RNBootSplash.hide({ fade: true }); // fade
    offset.value = withTiming(verticalScale(110), { duration: 1000 }, isCompleted => {
      runOnJS(handleAnimationCallback)(isCompleted);
    });
  }, []);

  const {
    bootSplashContainerLight,
    bootSplashContainerDark,
    bootSplashLogoStyle,
    loaderWrapperStyle
  } = styles;

  if (!isLoading) {
    return null;
  }

  const backgroundStyle = isThemeDark
    ? bootSplashContainerDark
    : bootSplashContainerLight;
  const animatedImageStyle = [bootSplashLogoStyle, animatedStyles];

  return (
    <View style={backgroundStyle}>
      <Animated.Image
        resizeMode={"contain"}
        style={animatedImageStyle}
        source={bootSplashLogo}
      />
      {showLottie && (
        <View style={loaderWrapperStyle}>
          <LottieView source={LOTTIE.safarway_loading} autoPlay loop />
        </View>
      )}
    </View>
  );
};

export default SplashScreen;
