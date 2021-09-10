import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Footer } from "~/components/";
import {EvaluationPageScreen, LoginScreen, OrderDetailsScreen, OrdersPage, ProjectDetailsScreen} from "~/containers/";
import {LightTheme} from "~/theme/";
import ProjectsPage from "~/containers/projectsPage";
import {useTheme} from "react-native-paper";

const AppRoutes = ({initial = "Login"} :{initial: string}) => {
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

export default AppRoutes;
