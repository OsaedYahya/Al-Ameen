import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import { OfflineScreen } from "~/containers/";

const OfflineStackRoutes = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen
        name="Offline"
        component={OfflineScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OfflineStackRoutes;
