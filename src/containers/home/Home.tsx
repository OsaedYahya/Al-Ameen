import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";

import { useTranslation } from "react-i18next";
import { Button, Card, TouchableRipple } from "react-native-paper";
import { useTheme } from "react-native-paper";

import { SafIcon } from "~/components/common";
import {deleteItem} from "~/services/";
import {USER_ID} from "~/constants/";

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const backgroundStyle = {
    backgroundColor: colors.background
  };
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.containerStyles}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.containerStyles, backgroundStyle]}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <TouchableRipple
            style={{
              width: "45%"
            }}
            onPress={() => navigation.navigate("OrdersScreen")}
          >
            <Card
              style={{
                justifyContent: "center",
                backgroundColor: colors.primary,
                paddingVertical: 50
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: "white",
                  padding: 5,
                  height: 60,
                  width: 60,
                  alignSelf: "center"
                }}
              >
                <SafIcon name="clipboard" width={"100%"} height={50} />
              </View>
              <Button labelStyle={{ color: colors.background }} mode="borderless">
                {t("orders")}
              </Button>
            </Card>
          </TouchableRipple>

          <TouchableRipple
            style={{
              width: "45%"
            }}
            onPress={() => navigation.navigate("ProjectsScreen")}
          >
            <Card
              style={{
                justifyContent: "center",
                backgroundColor: colors.primary,
                paddingVertical: 50
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: "white",
                  padding: 5,
                  height: 60,
                  width: 60,
                  alignSelf: "center"
                }}
              >
                <SafIcon name="prototype" width={"100%"} height={50} />
              </View>
              <Button labelStyle={{ color: colors.background }} mode="borderless">
                {t("projects")}
              </Button>
            </Card>
          </TouchableRipple>
        </View>

        {/*<Button
          labelStyle={{ color: colors.background }}
          style={{ marginVertical: 30 }}
          mode="contained"
          onPress={() => navigation.navigate("EvaluationPage")}
        >
          {t("EvaluationPage")}
        </Button>*/}
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
