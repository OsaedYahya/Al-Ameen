import React, { useState } from "react";
import { View, I18nManager, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {Button, Switch, Text, useTheme} from "react-native-paper";
import RNRestart from "react-native-restart";
import { useSelector, useDispatch } from "react-redux";

import { THEME_MODE_FLAG, LANGUAGE_FLAG, USER_ID } from "~/constants/";
import { setSettings } from "~/redux/reducers/settings.reducer";
import { RootState } from "~/redux/store";
import { deleteItem, storeItem } from "~/services/asyncStorage";

const Settings = (): JSX.Element => {
  const { isThemeDark, language } = useSelector((state: RootState) => state.settings);
  const { colors } = useTheme();
  const [isDarkModeSwitchOn, setDarkModeSwitchOn] = useState(isThemeDark);
  const [isLanguageSwitchOn, setLanguageSwitchOn] = useState(language === "ar");

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onToggleDarkModeSwitch = async () => {
    setDarkModeSwitchOn(prevState => !prevState);
    dispatch(setSettings({ isThemeDark: !isDarkModeSwitchOn }));
    await storeItem(THEME_MODE_FLAG, !isDarkModeSwitchOn ? "dark" : "light");
  };

  const navigation = useNavigation();

  const onToggleLanguageSwitch = async () => {
    setLanguageSwitchOn(!isLanguageSwitchOn);
    const lang = isLanguageSwitchOn ? "en" : "ar";
    dispatch(setSettings({ language: lang }));
    if (lang === "en") {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    } else {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
    await storeItem(LANGUAGE_FLAG, lang);
    RNRestart.Restart();
  };
  const handleLogout = () => {
    deleteItem(USER_ID);
    navigation.navigate("Login");
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Text>{t("dark_mode")}</Text>
      <Switch value={isDarkModeSwitchOn} onValueChange={onToggleDarkModeSwitch} />

      <Text>{t("change_language")}</Text>
      <Switch value={isLanguageSwitchOn} onValueChange={onToggleLanguageSwitch} />
      <Button
        labelStyle={{ color: colors.background }}
        style={{ margin: 30 }}
        mode="contained"
        onPress={handleLogout}
      >
        {t("logOut")}
      </Button>
    </View>
  );
};

export default Settings;
