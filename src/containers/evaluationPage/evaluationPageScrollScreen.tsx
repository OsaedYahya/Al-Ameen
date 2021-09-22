import React from "react";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { Text, useTheme } from "react-native-paper";

import { SafIcon } from "~/components/";
import { TopTabBar } from "~/components/bottomTabBar/TopTabBar";
import { EvaluationPageScreen1, SettingsScreen } from "~/containers/";

const EvaluationPageScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const Tab = createMaterialTopTabNavigator();

  const renderHomeIcon: MaterialTopTabNavigationOptions["tabBarIcon"] = ({ focused }) => (
    <SafIcon
      name={"nav_main"}
      width="100%"
      aspectRatio={1}
      style={focused ? { color: colors.primary } : { color: colors.gray }}
    />
  );

  const renderTitle = ({ focused }: { focused: boolean }) => (
    <Text style={focused ? { color: colors.primary } : { color: colors.gray }}>
      {t("main")}
    </Text>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarInactiveTintColor: 'red',
      }}
      tabBar={(props: MaterialTopTabBarProps) => <TopTabBar {...props} />}
    >
      <Tab.Screen
        name="Home2"
        options={{
          tabBarLabel: "Hey",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: renderHomeIcon
        }}
        component={EvaluationPageScreen1}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Hey",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: renderHomeIcon
        }}
        name="Settings2"
        component={SettingsScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Hey",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: renderHomeIcon
        }}
        name="Settings3"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default EvaluationPageScreen;
