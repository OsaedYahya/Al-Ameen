import React, { useContext } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";

import Config from "react-native-config";
import { Button } from "react-native-paper";
import { Text, useTheme } from "react-native-paper";
import AIcon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";

import { SafIcon } from "~/components/common";
import { AppDispatch } from "~/redux/store";

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const backgroundStyle = {
    backgroundColor: colors.background
  };
  const dispatch: AppDispatch = useDispatch();

  return (
    <SafeAreaView style={styles.containerStyles}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.containerStyles, backgroundStyle]}
      >
        <Icon name="rocket" size={30} color="#900" />
        <AIcon name="shrink" size={30} color="#900" />
        <SafIcon
          name="traveller_header_badge"
          width={50}
          height={50}
          style={{ aspectRatio: 3 / 2 }}
        />

        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("PointsBank")}
        >
          Points Bank
        </Button>

        <Text>API_HOST = {Config.API_HOST}</Text>

        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1
  }
});
