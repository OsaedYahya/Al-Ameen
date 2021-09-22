import React, { useState } from "react";
import { Image, View } from "react-native";

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, TextInput, useTheme } from "react-native-paper";

import Button from "~/components/Button/Button";

const Login = () => {
  const { params = {} } = useRoute();
  const {
    user = {
      name: "Shisha Espresso",
      phone: "059595995"
    }
  } = params;

  const textStyle = {
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 16,
    color: "rgb(171,38,104)"
  };
  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 22,
          marginBottom: 8,
          color: "rgb(171,38,104)"
        }}
      >
        Confirm
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>From Account</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>Current Account ILS</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text
          style={{ flex: 1, alignSelf: "center", fontSize: 16, color: "rgb(171,38,104)" }}
        >
          To
        </Text>
        <Text
          style={[textStyle, { fontWeight: "300" }]}
        >{`${user.name}\n${user.phone}`}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>From Amount</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>3.4 ILS</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>To Amount</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>3.4 ILS</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>Exchange Rate</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>1</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>Commission</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>0 ILS</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={textStyle}>Total Amount</Text>
        <Text style={[textStyle, { fontWeight: "300" }]}>3.4 ILS</Text>
      </View>
      <Button
        title={"Confirm"}
        style={{
          marginTop: "15%",
          width: "75%",
          borderRadius: 0,
          alignSelf: "center",
          backgroundColor: "rgb(171,38,104)"
        }}
        mode="contained"
      />
    </View>
  );
};

export default Login;
