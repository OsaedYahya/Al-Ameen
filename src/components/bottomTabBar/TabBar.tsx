import React, { useEffect, useCallback } from "react";
import { View, Dimensions } from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import style from "./TabBar.style";

import BottomTabButton from "~/components/common/BottomTabButton/BottomTabButton";
import { isRTL } from "~/constants/";
import defaults from "~/constants/defaults";
import { RootState } from "~/redux/store";
import { moderateScale } from "~/utils/";

export const TabBar = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps): JSX.Element => {
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const theme = useTheme();
  const { isThemeDark } = useSelector((reduxState: RootState) => reduxState.settings);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }]
    };
  });
  const animateSlider = useCallback(
    (index: number) => {
      offset.value = withSpring((isRTL ? -1 : 1) * (index * tabWidth), {
        velocity: 1000,
        damping: 15,
        stiffness: 150,
        restSpeedThreshold: 10
      });
    },
    [offset, tabWidth]
  );

  useEffect(() => {
    animateSlider(state.index);
  }, [animateSlider, state.index]);

  const {
    containerDark,
    containerLight,
    tabContainer,
    slider,
    buttonContainer,
    buttonsContainer
  } = style(theme);

  const renderIcon = (
    tabBarIcon:
      | ((props: { focused: boolean; color: string; size: number }) => React.ReactNode)
      | undefined,
    isFocused: boolean
  ): React.ReactNode => {
    if (tabBarIcon)
      return tabBarIcon({
        focused: isFocused,
        color: theme.colors.primary,
        size: moderateScale(30)
      });
    return <></>;
  };
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        isThemeDark ? containerDark : containerLight,
        { height: defaults.TAB_BAR_HEIGHT + insets.bottom }
      ]}
    >
      <View style={[tabContainer, { width: totalWidth }]}>
        <Animated.View
          style={[
            slider,
            animatedStyles,
            {
              width: tabWidth - 20
            }
          ]}
        />
        <View style={buttonsContainer}>
          {state.routes.map((route, index) => {
            const { key, name } = route;
            const { tabBarIcon, tabBarLabel } = descriptors[key].options;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: key,
                canPreventDefault: true
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.dispatch(CommonActions.navigate({ name }));
              }

              animateSlider(index);
            };

            return (
              <View key={index} style={buttonContainer}>
                <BottomTabButton
                  onPress={onPress}
                  shouldRotate={name === "AddPost"}
                  text={tabBarLabel?.toString()}
                  isFocused={isFocused}
                >
                  {renderIcon(tabBarIcon, isFocused)}
                </BottomTabButton>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
