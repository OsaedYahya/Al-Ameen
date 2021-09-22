import React, { useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";
import ImageZoom from "react-native-image-pan-zoom";
import {
  DataTable,
  Modal,
  TextInput,
  TouchableRipple,
  useTheme
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "~/components/Button/Button";
import { DarkTheme } from "~/theme/";
import { guidelineBaseWidth } from "~/utils/";

const OrderDetailsScreen = () => {
  const { params } = useRoute();
  const { order = {} } = params;
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const renderImage = () => (
    <TouchableRipple
      onPress={() => setModalVisible(true)}
      style={{
        borderWidth: 1,
        borderColor: colors.text,
        alignSelf: "flex-start",
        marginTop: 20,
        marginHorizontal: 4
      }}
    >
      <Image
        style={{ height: 100, width: 100, margin: 8 }}
        resizeMode={"contain"}
        source={{
          uri: "https://www.taawon.org/sites/default/files/ar-logo.png"
        }}
      />
    </TouchableRipple>
  );

  return (
    <View>
      <ScrollView>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("orderNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.id}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("orderType")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>طلب ترميم - القدس</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("dateOfOrder")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.date}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("nameOfOrderIssuer")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("documentNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>بشار شاهر العمران القدومي</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("phone")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>05034053</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("typeOfOrder")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.type}</DataTable.Cell>
        </DataTable.Row>

        <View
          style={{
            margin: 12,
            paddingBottom: 8,
            borderBottomWidth: 0.5,
            borderBottomColor: "#aaa"
          }}
        >
          <Button
            onPress={() => alert("hey")}
            style={{ alignSelf: "flex-start" }}
            title={t("locateSite")}
          />
          <TextInput
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
            style={{ marginTop: 12, fontSize: 14 }}
            mode={"outlined"}
            label={t("lat")}
            value={lat}
            onChangeText={setLat}
          />
          <TextInput
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
            style={{ marginTop: 12, fontSize: 14 }}
            mode={"outlined"}
            label={t("lon")}
            value={lon}
            onChangeText={setLon}
          />
          <Button
            onPress={() => alert("hey")}
            style={{
              alignSelf: "flex-end",
              marginTop: 12,
              backgroundColor: DarkTheme.colors.accent
            }}
            title={t("save")}
          />
        </View>
        <View
          style={{
            margin: 12,
            marginBottom: 12 + insets.bottom,
            paddingBottom: 8,
            borderBottomWidth: 0.5,
            borderBottomColor: "#aaa"
          }}
        >
          <Button
            onPress={() =>
              ImagePicker.openPicker({
                mediaType: "photo",
                multiple: true,
                includeExif: true,
                compressImageQuality: 1,
                compressVideoPreset: "Passthrough",
                includeBase64: true
              })
            }
            style={{ alignSelf: "flex-start" }}
            title={t("takePhotos")}
          />
          <FlatList
            horizontal
            keyExtractor={item => item.toString()}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={renderImage}
          />
          <Button
            onPress={() => alert("hey")}
            style={{
              alignSelf: "flex-end",
              marginTop: 12,
              backgroundColor: DarkTheme.colors.accent
            }}
            title={t("save")}
          />
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={{ backgroundColor: colors.background }}>
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={Dimensions.get("window").height - guidelineBaseWidth}
            imageWidth={guidelineBaseWidth}
            imageHeight={guidelineBaseWidth}
            resizeMode={"contain"}
            source={{
              uri: "https://www.taawon.org/sites/default/files/ar-logo.png"
            }}
          >
            <Image
              style={{ width: guidelineBaseWidth, height: guidelineBaseWidth }}
              resizeMode={"contain"}
              source={{
                uri: "https://www.taawon.org/sites/default/files/ar-logo.png"
              }}
            />
          </ImageZoom>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetailsScreen;
