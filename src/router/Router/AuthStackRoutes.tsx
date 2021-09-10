import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import { Footer } from "~/components/";
import {
  EvaluationPageScreen,
  LoginScreen,
  OrderDetailsScreen,
  OrdersPage,
  ProjectDetailsScreen
} from "~/containers/";
import ProjectsPage from "~/containers/projectsPage";
import { LightTheme } from "~/theme/";

const AuthRoutes = ({initial = "Login"} :{initial: string}) => {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName={initial}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background
        },
        headerShadowVisible: true,
        headerTitleStyle: {
          fontFamily: LightTheme.fonts.medium.fontFamily,
          fontWeight: LightTheme.fonts.medium.fontWeight
        }
      }}
    >
      <Stack.Screen name="HomeTabs" component={Footer} options={{ headerShown: false }} />
      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProjectsScreen"
        component={ProjectsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="EvaluationPage"
        options={{ headerShown: false }}
        component={EvaluationPageScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
