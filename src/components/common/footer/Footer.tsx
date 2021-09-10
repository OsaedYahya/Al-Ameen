import React from "react";
import { StatusBar, View } from "react-native";

import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarProps
} from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Searchbar, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

import { TabBar } from "~/components/bottomTabBar/TabBar";
import { SafIcon } from "~/components/common";
import { HomeScreen, SettingsScreen } from "~/containers/";
import { RootState } from "~/redux/store";
import { LightTheme } from "~/theme/";
import { moderateScale } from "~/utils/responsivityUtil";

const Footer = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();
  const { isThemeDark } = useSelector((state: RootState) => state.settings);
  const { user: { givenName = "" } = {}, userToken } =
    useSelector((state: RootState) => state.auth) || {};

  const renderHomeIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"nav_main"}
      width="100%"
      aspectRatio={1}
      style={focused ? { color: colors.primary } : { color: colors.gray }}
    />
  );

  const renderUserIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"user_placeholder"}
      width={moderateScale(30)}
      height={moderateScale(30)}
      aspectRatio={1}
      style={focused ? { color: colors.primary } : { color: colors.gray }}
    />
  );

  return (
    <>
      <StatusBar
        barStyle={isThemeDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        screenOptions={() => ({
          headerTitleStyle: { fontFamily: theme.fonts.regular.fontFamily },
          tabBarColor: "transparent",
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarStyle: {
            elevation: 0
          }
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: t("main"),
            tabBarLabel: t("main"),
            tabBarIcon: renderHomeIcon
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SettingsScreen}
          options={{
            headerTitleStyle: {
              lineHeight: 30,
              fontFamily: LightTheme.fonts.regular.fontFamily
            },
            headerTitle: t("profile"),
            tabBarLabel: t("profile"),
            tabBarIcon: renderUserIcon
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Footer;
