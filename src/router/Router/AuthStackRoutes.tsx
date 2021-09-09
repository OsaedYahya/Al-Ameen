import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Footer } from "~/components/";
import { LoginScreen } from "~/containers/";

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={Footer} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
