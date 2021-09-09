import React, { useState } from "react";
import { View, I18nManager } from "react-native";

import { useTranslation } from "react-i18next";
import { Switch, Text } from "react-native-paper";
import RNRestart from "react-native-restart";
import { useSelector, useDispatch } from "react-redux";

import { THEME_MODE_FLAG, LANGUAGE_FLAG } from "~/constants/";
import { setSettings } from "~/redux/reducers/settings.reducer";
import { RootState } from "~/redux/store";
import { storeItem } from "~/services/asyncStorage";

const Settings = (): JSX.Element => {
  const { isThemeDark, language } = useSelector((state: RootState) => state.settings);

  const [isDarkModeSwitchOn, setDarkModeSwitchOn] = useState(isThemeDark);
  const [isLanguageSwitchOn, setLanguageSwitchOn] = useState(language === "ar");

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onToggleDarkModeSwitch = async () => {
    setDarkModeSwitchOn(prevState => !prevState);
    dispatch(setSettings({ isThemeDark: !isDarkModeSwitchOn }));
    await storeItem(THEME_MODE_FLAG, !isDarkModeSwitchOn ? "dark" : "light");
  };

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

  return (
    <View>
      <Text>Settings</Text>

      <Text>dark</Text>
      <Switch value={isDarkModeSwitchOn} onValueChange={onToggleDarkModeSwitch} />

      <Text>language Arabic</Text>
      <Switch value={isLanguageSwitchOn} onValueChange={onToggleLanguageSwitch} />

      <Text>{t("main")}</Text>
    </View>
  );
};

export default Settings;
