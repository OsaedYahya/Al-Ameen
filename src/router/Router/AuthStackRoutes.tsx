import React from "react";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Footer } from "~/components/";
import {
  EvaluationPageScreen,
  HomeScreen,
  LoginScreen,
  OrderDetailsScreen,
  OrdersPage,
  ProjectDetailsScreen
} from "~/containers/";
import ProjectsPage from "~/containers/projectsPage";
import { LightTheme } from "~/theme/";

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerLeft: () => (
            <Icon
              name={"arrow-left"}
              size={28}
              color={"rgb(171,38,104)"}
              onPress={() => navigation.goBack()}
            />
          ),
          headerBackTitle: "",
          headerTitle: ""
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
