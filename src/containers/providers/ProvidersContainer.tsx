import React, { useState, useEffect } from "react";
import { I18nManager, Appearance } from "react-native";

import { Hub } from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";
import RNRestart from "react-native-restart";
import { useSelector, useDispatch } from "react-redux";

import {
  THEME_MODE_FLAG,
  LANGUAGE_FLAG,
  FIRST_RESTART_FLAG,
  REFRESH_TOKEN_FLAG,
  JWT_TOKEN_FLAG
} from "~/constants/";
import { setUser } from "~/redux/reducers/auth.reducer";
import { setSettings } from "~/redux/reducers/settings.reducer";
import { RootState } from "~/redux/store";
import Router from "~/router/";
import { configureAmplify, authenticateCurrentUser } from "~/services/";
import { retrieveItem, storeItem } from "~/services/asyncStorage";
import { DarkTheme, LightTheme } from "~/theme/";
import { i18n } from "~/translations/";
import { logError } from "~/utils/errorHandler";

const ProvidersContainer = (): JSX.Element => {
  const [isProvidersLoading, setIsProvidersLoading] = useState(true);

  const { isThemeDark } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    const initliazeApp = async () => {
      const savedLanguage = await retrieveItem(LANGUAGE_FLAG);
      const savedThemeMode = await retrieveItem(THEME_MODE_FLAG);

      if (savedLanguage) {
        dispatch(setSettings({ language: savedLanguage }));
        if (savedLanguage === "en") {
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
        } else {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
        }
        await i18n.changeLanguage(savedLanguage);
      } else {
        // default language values
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);

        await i18n.changeLanguage("en");
        const isFirstRestart = await retrieveItem(FIRST_RESTART_FLAG);
        if (!I18nManager.isRTL && !isFirstRestart) {
          // default language values
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
          // here we save a flag and do one restart only to force RTL
          await storeItem(FIRST_RESTART_FLAG, "1");
          RNRestart.Restart();
        }
      }

      if (savedThemeMode) {
        dispatch(setSettings({ isThemeDark: savedThemeMode === "dark" }));
      } else {
        // default theme values
        const colorScheme = Appearance.getColorScheme();
        dispatch(setSettings({ isThemeDark: colorScheme === "dark" }));
      }
/*
      const authenticatedCurrentUserData = await authenticateCurrentUser();
      const {
        signInUserSession: {
          idToken: { jwtToken: userToken = "", payload = {} } = {},
          refreshToken: { token: refreshToken = "" } = {}
        } = {}
      } = authenticatedCurrentUserData;

      handleAuhtenicateUser(userToken, refreshToken, payload);*/

      setIsProvidersLoading(false);
    };

    configureAmplify();
    initliazeApp();

    const hubSubscriber = Hub.listen("auth", async ({ payload: { event, data } }) => {
      const {
        signInUserSession: {
          idToken: { jwtToken: userToken = "", payload = {} } = {},
          refreshToken: { token: refreshToken = "" } = {}
        } = {}
      } = data;

      if (event === "signIn") {
        handleAuhtenicateUser(userToken, refreshToken, payload);
      }
    });

    return () => {
      Hub.remove("auth", hubSubscriber);
    };
  }, []);

  const handleAuhtenicateUser = async (
    userToken: string,
    refreshToken: string,
    payload: any
  ) => {
    const {
      identities,
      given_name,
      family_name,
      name,
      email,
      email_verified,
      phone_number,
      phone_number_verified
    } = payload;
    const { providerName, providerType } = identities[0];

    dispatch(
      setUser({
        userToken,
        refreshToken,
        user: {
          providerName,
          providerType,
          givenName: given_name,
          familyName: family_name,
          name,
          email,
          emailVerified: email_verified,
          phoneNumber: phone_number,
          phoneNumberVerified: phone_number_verified
        }
      })
    );
    try {
      await storeItem(JWT_TOKEN_FLAG, userToken);
      await storeItem(REFRESH_TOKEN_FLAG, refreshToken);
    } catch (error) {
      logError("error in saving to Local storage in listener hub ");
    }
  };

  const theme = isThemeDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      {!isProvidersLoading && <Router theme={theme} />}
    </PaperProvider>
  );
};

export default ProvidersContainer;
