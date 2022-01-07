import React from "react";
import { View } from "react-native";

import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions
} from "@react-navigation/material-bottom-tabs";
import {useNavigation, useRoute} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

import { SafIcon } from "~/components/";
import { TopTabBar } from "~/components/bottomTabBar/TopTabBar";
import {
  EvaluationPageScreen1,
  EvaluationPageScreen2,
  SettingsScreen
} from "~/containers/";
import EvaluationPageScreen3 from "~/containers/evaluationPage3";
import { RootState } from "~/redux/store";
import { LightTheme } from "~/theme/";

const EvaluationPageScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { params } = useRoute();

  const Tab = createMaterialBottomTabNavigator();
  const { pageOne, pageTwo, pageThree } = useSelector((state: RootState) => state.pages);

  const renderHomeIcon: MaterialBottomTabNavigationOptions["tabBarIcon"] = (
    { focused },
    page
  ) => {
    let iconName = "";
    if (page === 0) {
      iconName = "empty_circle";
    } else if (page === 1) {
      iconName = "half_full";
    } else iconName = "full_circle";
    return (
      <SafIcon
        name={iconName}
        width="100%"
        style={focused ? { color: colors.primary } : { color: colors.gray }}
      />
    );
  };

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          marginStart: 5,
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingEnd: 38,
          alignItems: "center",
          marginTop: insets.top
        }}
      >
        <TouchableRipple onPress={() => navigation.goBack()} style={{ borderRadius: 50 }}>
          <Icon name={"chevron-right"} size={38} color={LightTheme.colors.primary} />
        </TouchableRipple>
        <Text
          style={{
            marginHorizontal: 10,
            flex: 1,
            zIndex: 2,
            fontSize: 18,
            textAlign: "center"
          }}
        >
          {t("EvaluationPage")}
        </Text>
      </View>
      <Tab.Navigator
        barStyle={{
          backgroundColor: colors.background,
        }}
        activeColor={colors.primary}
        inactiveColor={colors.gray}
        labeled={false}
        style={{ flexDirection: "column-reverse", paddingVertical: 6, paddingHorizontal: 4 }}
        tabBar={(props: any) => <TopTabBar {...props} />}
      >
        <Tab.Screen
          name="Home2"
          initialParams={{
            order: params?.order
          }}
          options={{
            tabBarLabel: "صفحة ١",
            tabBarIcon: props => renderHomeIcon(props, pageOne)
          }}
          component={EvaluationPageScreen1}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "صفحة ٢",
            tabBarIcon: props => renderHomeIcon(props, pageTwo)
          }}
          initialParams={{
            order: params?.order
          }}
          name="Settings2"
          component={EvaluationPageScreen2}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "صفحة ٣",
            tabBarIcon: props => renderHomeIcon(props, pageThree)
          }}
          initialParams={{
            order: params?.order
          }}
          name="Settings3"
          component={EvaluationPageScreen3}
        />
      </Tab.Navigator>
    </>
  );
};

export default EvaluationPageScreen;
