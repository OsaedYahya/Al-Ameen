import React from "react";
import { Linking, Platform, SafeAreaView, View } from "react-native";

import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import Config from "react-native-config";
import { Text, Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

import styles from "./ForceUpdate.style";

import LOTTIE from "~/assets/lottie/";
import { SafIcon } from "~/components/";
import { RootState } from "~/redux/store";
import { logError, scale, verticalScale } from "~/utils/";

const ForceUpdate = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleButtonClicked = () =>
    Linking.openURL(
      Platform.OS === "android"
        ? `market://details?id=${Config.ANDROID_APP_ID}`
        : `itms-apps://itunes.apple.com/us/app/id${Config.APP_STORE_ID}?mt=8.`
    ).catch(error => {
      logError(
        `error while force update and redirect to appstore or google play ${error}`
      );
    });
  const { isThemeDark } = useSelector((state: RootState) => state.settings);

  const {
    container,
    safarwayLogo,
    loadingLottie,
    updateTextContainer,
    updateTextHeader,
    updateButton,
    updateButtonContainer,
    updateButtonText
  } = styles(theme);
  return (
    <SafeAreaView style={container}>
      <SafIcon
        name="safarway_logo"
        width={scale(200)}
        height={verticalScale(50)}
        style={safarwayLogo}
      />
      <LottieView
        style={loadingLottie}
        source={
          isThemeDark ? LOTTIE.safarway_force_update_dark : LOTTIE.safarway_force_update
        }
        autoPlay
        loop
      />
      <View style={updateTextContainer}>
        <Text>{t("force_update_title")}</Text>
        <Text style={updateTextHeader}>{t("force_update_description")}</Text>
        <Button
          mode="contained"
          contentStyle={updateButton}
          onPress={handleButtonClicked}
          style={updateButtonContainer}
        >
          <Text style={updateButtonText}>{t("force_update_button_text")}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ForceUpdate;
