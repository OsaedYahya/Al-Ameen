import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableRipple } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import { loginAPI } from "~/api/";
import Button from "~/components/Button/Button";
import { USER_ID } from "~/constants/";
import { setUser } from "~/redux/reducers/auth.reducer";
import { RootState } from "~/redux/store";
import { storeItem } from "~/services/";
import { logError } from "~/utils/";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user: { givenName = "" } = {}, userToken } =
    useSelector((state: RootState) => state.auth) || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleSignIn = async () => {
    try {
      setTimeout(() => {
        setIsLoading(true);
        loginAPI
          .Login(username, password)
          .then(res => {
            storeItem(USER_ID, res.data.StaffId);
            dispatch(
              setUser({
                userToken: res.data.StaffId
              })
            );
            navigation.navigate("HomeTabs");
          })
          .catch(error => alert(error))
          .finally(() => setIsLoading(false));
      }, 200);
    } catch (error) {
      logError(`handleSignIn  error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      )}
      <View
        style={{
          marginStart: 5,
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 20,
          alignItems: "center",
          marginTop: insets.top
        }}
      >
        <Text
          style={{
            marginHorizontal: 10,
            flex: 1,
            zIndex: 2,
            fontSize: 18,
            textAlign: "center"
          }}
        >
          {t("login")}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Image
          style={{ height: 80, marginVertical: 50 }}
          resizeMode={"contain"}
          source={{
            uri: Image.resolveAssetSource(require("./../../assets/images/logo.png")).uri
          }}
        />
        <Text style={{ alignSelf: "center", fontSize: 18 }}>{t("login")}</Text>
        <TextInput
          style={{ backgroundColor: "transparent", marginTop: 12 }}
          label={t("username")}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={{ backgroundColor: "transparent", marginTop: 12 }}
          label={t("password")}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        {/*<Button
          titleStyle={{ color: colors.text }}
          title={t("forgetPassword")}
          style={{ marginTop: 12 }}
          mode="text"
          onPress={handleSignIn}
        />*/}
        <Button
          title={t("login")}
          style={{ marginTop: 12 }}
          mode="contained"
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
};

export default Login;
