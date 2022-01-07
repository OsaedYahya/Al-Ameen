import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  View
} from "react-native";

import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";
import ImageZoom from "react-native-image-pan-zoom";
import MapView, { Marker } from "react-native-maps";
import {
  DataTable,
  Text,
  Modal,
  TextInput,
  TouchableRipple,
  useTheme,
  Searchbar
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

import { applicationsAPI } from "~/api/";
import Button from "~/components/Button/Button";
import { RootState } from "~/redux/store";
import { retrieveItem, storeItem } from "~/services/";
import { DarkTheme, LightTheme } from "~/theme/";
import { translate } from "~/translations/";
import { guidelineBaseWidth } from "~/utils/";
import {
  checkLocationPermissions,
  getLocation,
  requestLocationPermissions
} from "~/utils/location";

const OrderDetailsScreen = () => {
  const { params } = useRoute();
  const { order: initialOrder = {} } = params;
  const [order, setOrder]=  useState(initialOrder);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [images, setImages] = useState(order?.Images || []);
  const [lat, setLat] = useState(order?.Latitude || "");
  const [lon, setLon] = useState(order?.Longitude || "");
  const [marker, setMarker] = useState({
    latitude: parseFloat(order?.Latitude) || 31.7683,
    longitude: parseFloat(order?.Longitude) || 35.2137
  });

  const mapRef = React.createRef();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState("");
  const navigation = useNavigation();
  const [mapModalVisible, setMapModalVisible] = useState(false);

  useFocusEffect(() => {
    getOrder()
  })
  const getOrder = async () => {
    let orders = [];
    await retrieveItem("Orders").then(res => {
      orders = res || [];
    });
    const index = orders.findIndex(
      item => item.SubscriberServiceID === order.SubscriberServiceID
    );
    setOrder(orders[index]);
  };

  const handleSetImages = async () => {
    let orders = [];
    await retrieveItem("Orders").then(res => {
      orders = res || [];
    });
    const index = orders.findIndex(
      item => item.SubscriberServiceID === order.SubscriberServiceID
    );
    const newOrder = order;
    newOrder.Images = images;
    orders[index] = newOrder;
    await storeItem("Orders", orders);
  };

  const handleSetLocation = async () => {
    let orders = [];
    await retrieveItem("Orders").then(res => {
      orders = res || [];
    });
    const index = orders.findIndex(
      item => item.SubscriberServiceID === order.SubscriberServiceID
    );
    const newOrder = order;
    newOrder.Longitude = marker.longitude.toFixed(6);
    newOrder.Latitude = marker.latitude.toFixed(6);
    orders[index] = newOrder;
    await storeItem("Orders", orders);
  };

  const renderImage = ({ item }) => {
    return (
      <TouchableRipple
        onPress={() => {
          setModalVisible(true);
          setCurrentImageUri(item?.sourceURL || item?.path);
        }}
        style={{
          borderWidth: 1,
          borderColor: colors.text,
          alignSelf: "flex-start",
          marginTop: 20,
          marginHorizontal: 4
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          resizeMode={"cover"}
          source={{
            uri: item?.sourceURL || item?.path
          }}
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginStart: 5,
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingEnd: 38,
          alignItems: "center",
          marginTop: insets.top
        }}
      >
        <TouchableRipple style={{ borderRadius: 50 }} onPress={navigation.goBack}>
          <Icon name={"chevron-right"} size={38} color={LightTheme.colors.primary} />
        </TouchableRipple>
        <Text
          style={{
            marginHorizontal: 10,
            flex: 1,
            zIndex: 2,
            fontSize: 18,
            textAlign: "center"
          }}
        >
          {t("orderInfo")}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("orderNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.ApplicantNum}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("typeOfOrder")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.ServiceNameA}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("dateOfOrder")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>
            {moment(order.InsertDate).locale("en").format("YYYY-MM-DD")}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("nameOfOrderIssuer")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.ApplicantName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("documentNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>
            {order.SubscriberServiceFullNumber}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("phone")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>
            {order.SubscriberServiceFullNumber}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("orderType")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{order.RestorationType}</DataTable.Cell>
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
            onPress={() => setMapModalVisible(true)}
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
            onPress={handleSetLocation}
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
            onPress={() => {
              Alert.alert(translate("add_photo"), translate("add_photo_desc"), [
                {
                  text: translate("camera"),
                  onPress: () =>
                    ImagePicker.openCamera({
                      mediaType: "photo",
                      includeExif: true,
                      compressImageQuality: 0.8,
                      compressImageMaxHeight: 2000,
                      compressImageMaxWidth: 2000,
                      compressVideoPreset: "Passthrough",
                      includeBase64: true
                    }).then(res => {
                      setImages(oldArray => [...oldArray, res]);

                      /*                      projectsAPI.addAttachments(project.ProjectId, userToken, {
                        FileName: res.filename,
                        FileBase64: res.data
                      })*/
                    })
                },
                {
                  text: translate("photo_gallery"),
                  onPress: () =>
                    ImagePicker.openPicker({
                      mediaType: "photo",
                      multiple: true,
                      includeExif: true,
                      compressImageQuality: 0.8,
                      compressImageMaxHeight: 400,
                      compressImageMaxWidth: 400,
                      compressVideoPreset: "Passthrough",
                      includeBase64: true
                    }).then(res => {
                      setImages(oldArray => [...oldArray, ...res]);
                    })
                }
              ]);
            }}
            style={{ alignSelf: "flex-start" }}
            title={t("takePhotos")}
          />
          <FlatList
            horizontal
            keyExtractor={item => item?.path}
            data={images}
            renderItem={renderImage}
          />

          <Button
            onPress={() => {
              handleSetImages();
            }}
            style={{
              alignSelf: "flex-end",
              marginTop: 12,
              backgroundColor: DarkTheme.colors.accent
            }}
            title={t("save")}
          />
        </View>
        <Button
          labelStyle={{ color: colors.background }}
          style={{ borderRadius: 0 }}
          mode="contained"
          title={t("EvaluationPage")}
          onPress={() => {
            navigation.navigate("EvaluationPage", {
              order
            });
          }}
        />
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
              uri: currentImageUri
            }}
          >
            <Image
              style={{ width: guidelineBaseWidth, height: guidelineBaseWidth }}
              resizeMode={"contain"}
              source={{
                uri: currentImageUri
              }}
            />
          </ImageZoom>
        </View>
      </Modal>
      <Modal
        visible={mapModalVisible}
        onDismiss={() => setMapModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View>
          <View
            style={{
              position: "absolute",
              zIndex: 999,
              borderRadius: 50,
              backgroundColor: "white",
              padding: 5,
              margin: 5,
              borderWidth: 1
            }}
          >
            <Icon
              name={"close"}
              onPress={() => setMapModalVisible(false)}
              size={30}
              color={LightTheme.colors.primary}
            />
          </View>
          <MapView
            onPress={event => {
              setMarker(event.nativeEvent.coordinate);
            }}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            showsUserLocation
            showsMyLocationButton={false}
            followsUserLocation
            initialRegion={{
              latitude: 31.7683,
              longitude: 35.2137,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker coordinate={marker} />
          </MapView>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              padding: 5,
              borderWidth: 1,
              position: "absolute",
              zIndex: 999,
              alignSelf: "center",
              bottom: 0,
              right: 0,
              margin: 5
            }}
          >
            <Icon
              size={30}
              name="crosshairs-gps"
              onPress={() => {
                requestLocationPermissions().then((status: string) => {
                  if (status === "granted") {
                    getLocation(position => {
                      const { longitude = 0, latitude = 0 } = position.coords;
                      mapRef?.current.animateToRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      });
                    });
                  }
                });
              }}
            />
          </View>
          <Button
            style={{
              position: "absolute",
              zIndex: 999,
              alignSelf: "center",
              bottom: 0,
              margin: 5
            }}
            title={t("save")}
            onPress={() => {
              setMapModalVisible(false);
              setLon(marker.longitude.toFixed(6));
              setLat(marker.latitude.toFixed(6));
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetailsScreen;
