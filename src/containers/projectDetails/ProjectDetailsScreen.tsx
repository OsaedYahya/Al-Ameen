import React, { useState } from "react";
import { Alert, Dimensions, FlatList, Image, ScrollView, View } from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";
import ImageZoom from "react-native-image-pan-zoom";
import {
  DataTable,
  Modal,
  Text,
  TextInput,
  TouchableRipple,
  useTheme
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { projectsAPI } from "~/api/";
import Button from "~/components/Button/Button";
import { retrieveItem, storeItem } from "~/services/";
import { DarkTheme, LightTheme } from "~/theme/";
import { translate } from "~/translations/";
import { guidelineBaseWidth } from "~/utils/";

const ProjectDetailsScreen = () => {
  const { params } = useRoute();
  const { project = {}, userToken } = params;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [images, setImages] = useState(project?.Images || []);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState("");

  const handleSetImages = async () => {
    let projects = [];
    await retrieveItem("Projects").then(res => {
      projects = res;
    });
    const index = projects.findIndex(item => item.ProjectId === project.ProjectId);
    const newProject = project;
    newProject.Images = images;
    projects[index] = newProject;
    await storeItem("Projects", projects);
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
    <View>
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
          {t("projectInfo")}
        </Text>
      </View>
      <ScrollView>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("projectNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.ProjectNumber}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("projectName")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.ProjectName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("orderType")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.ProjectTypeName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>
            {t("nameOfProjectBenefactor")}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.BenName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("documentNumber")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.ProjectId}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomColor: "#aaa" }}>
          <DataTable.Cell style={{ flex: 1 }}>{t("phone")}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{project.BenMobile}</DataTable.Cell>
        </DataTable.Row>
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
            keyExtractor={item => item.toString()}
            data={images}
            renderItem={renderImage}
          />
          <Button
            onPress={() => handleSetImages()}
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
    </View>
  );
};

export default ProjectDetailsScreen;
