import React, { useState } from "react";
import { Image, View } from "react-native";

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useTranslation } from "react-i18next";
import { Text, TextInput, useTheme } from "react-native-paper";

import Button from "~/components/Button/Button";
import { federatedSignIn, signOut, signIn } from "~/services/";
import { logError } from "~/utils/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const { t } = useTranslation();
  const handleSignOut = async () => {
    try {
    } catch (error) {
      logError(`handleSignOut  error ${error}`);
    }
  };

  const handleSignIn = async () => {
    try {
    } catch (error) {
      logError(`handleSignIn  error ${error}`);
    }
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Image
        style={{ height: 200, marginTop: 50 }}
        resizeMode={"contain"}
        source={{
          uri: "https://www.taawon.org/sites/default/files/ar-logo.png"
        }}
      />
      <Text style={{ alignSelf: "center", fontSize: 18 }}>{t("login")}</Text>
      <TextInput
        style={{ backgroundColor: "transparent", marginTop: 12 }}
        label={t("email")}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ backgroundColor: "transparent", marginTop: 12 }}
        label={t("password")}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Button
        titleStyle={{ color: colors.text }}
        title={t("forgetPassword")}
        style={{ marginTop: 12 }}
        mode="text"
        onPress={handleSignIn}
      />
      <Button
        title={t("login")}
        style={{ marginTop: 12, borderRadius: 50 }}
        mode="contained"
        onPress={handleSignIn}
      />
    </View>
  );
};

export default Login;
