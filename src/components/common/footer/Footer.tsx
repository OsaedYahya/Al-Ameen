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
import {
  HomeScreen,
  OrdersPage,
  AddPostScreen,
  ProfileScreen,
  SettingsScreen,
  JoinUsScreen
} from "~/containers/";
import { RootState } from "~/redux/store";
import { moderateScale } from "~/utils/responsivityUtil";

const Footer = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();
  const { isThemeDark } = useSelector((state: RootState) => state.settings);
  const { user: { givenName = "" } = {}, userToken } =
    useSelector((state: RootState) => state.auth) || {};

  const renderDestinationIcon: BottomTabNavigationOptions["tabBarIcon"] = ({
    focused
  }) => (
    <SafIcon
      name={"nav_destinations"}
      width="100%"
      aspectRatio={1}
      style={focused ? { color: colors.primary } : { color: colors.gray }}
    />
  );
  const renderHomeIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"nav_main"}
      width="100%"
      aspectRatio={1}
      style={focused ? { color: colors.primary } : { color: colors.gray }}
    />
  );
  const renderMoreIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"nav_more"}
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

  const renderAddPostIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"add_post_nav"}
      startColor={focused ? colors.malibu : colors.gray}
      endColor={focused ? colors.pictonBlue : colors.gray}
      width="100%"
      aspectRatio={1}
    />
  );
  const isLoggedIn = !!userToken;
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
            tabBarLabel: t("main"),
            tabBarIcon: renderHomeIcon
          }}
        />
        <Tab.Screen
          name="Destinations"
          component={OrdersPage}
          options={{
            header: () => <></>,
            tabBarLabel: t("orders"),
            tabBarIcon: renderDestinationIcon,
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={isLoggedIn ? AddPostScreen : JoinUsScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: renderAddPostIcon
          }}
        />
        <Tab.Screen
          name="Profile"
          component={isLoggedIn ? ProfileScreen : JoinUsScreen}
          options={{
            tabBarLabel: `\u200F${givenName}`,
            tabBarIcon: renderUserIcon
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: t("more"),
            tabBarIcon: renderMoreIcon
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Footer;
