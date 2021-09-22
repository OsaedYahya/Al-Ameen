import React, {useEffect} from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Dimensions
} from "react-native";

import { useTranslation } from "react-i18next";
import { Button, Card, TouchableRipple } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { SafIcon } from "~/components/common";
import NfcManager, {NfcEvents} from "react-native-nfc-manager";

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const backgroundStyle = {
    backgroundColor: colors.background
  };
  const { t } = useTranslation();
  NfcManager.start();

  useEffect(() => {

    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise(resolve => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        tagFound = tag;
        resolve(tagFound);
        navigation.navigate('Login', {
          user: {
            phone: tag,
            name: tag,
          }
        })
        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }, []);
  return (
    <ImageBackground
      source={require("./../../assets/images/bg.png")}
      style={styles.containerStyles}
      resizeMode={"contain"}
    >
      <TouchableRipple
        style={{ height: 50, width: 50 }}
        onPress={() => navigation.navigate("Login")}
      >
        <View />
      </TouchableRipple>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyles: {
    height: "100%",
    backgroundColor: "white"
  }
});
