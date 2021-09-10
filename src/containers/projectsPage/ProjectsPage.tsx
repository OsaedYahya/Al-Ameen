import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { DataTable, Searchbar, Text, TouchableRipple } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

import DataTableTitle from "./DataTableTitle";
import projectsPageStyle from "./ProjectsPage.style";

import { projectsAPI } from "~/api/";
import { RootState } from "~/redux/store";
import { retrieveItem, storeItem } from "~/services/";
import { ArrowTheme, LightTheme } from "~/theme/theme";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getProjectsData();
  }, []);

  const storeProjectIfNotExist = async (data: any) => {
    let projects = [];
    await retrieveItem("Projects").then(res => {
      projects = res;
    });
    const merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

    projects = merge(data, projects, "SubscriberServiceID");
    await storeItem("Projects", projects);
    setData(projects);
  };

  const getProjectsData = () => {
    setIsLoading(true);
    projectsAPI
      .getProjects(userToken)
      .then(res => {
        setData(res.data);
        storeProjectIfNotExist(res.data);
      })
      .catch(() => {
        retrieveItem("Projects").then(res => {
          setData(res);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const grow = useDerivedValue(() => {
    return isExpanded
      ? withTiming(1, {
          duration: 200
        })
      : withTiming(0, {
          duration: 200
        });
  });
  const animatedStyles = useAnimatedStyle(() => {
    const width = interpolate(grow.value, [0, 1], [50, 270]);

    return {
      width
    };
  });

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const { flex1, flex2, containerStyle, headerTextStyle, rowReverse } = projectsPageStyle;
  const [sortDirections, setSortDirections] = useState<{
    sortDirection1: undefined | "ascending" | "descending";
    sortDirection2: undefined | "ascending" | "descending";
  }>({
    sortDirection1: "descending",
    sortDirection2: undefined
  });
  const renderItem = ({ item, index }: { item; index: number }) => {
    return (
      <TouchableRipple
        key={item.ProjectId}
        onPress={() => {
          navigation.navigate("ProjectDetailsScreen", {
            project: item,
            userToken
          });
        }}
      >
        <DataTable.Row style={{ paddingHorizontal: 8 }}>
          <DataTable.Cell style={flex1}>
            <Text style={{ fontSize: 12 }}>{item.ProjectId}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={flex2}>
            <Text style={{ fontSize: 12 }}>{item.ProjectName}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </TouchableRipple>
    );
  };

  const handleSortDirection = sortDirectionItem => {
    const x = {
      sortDirection1: undefined,
      sortDirection2: undefined
    };

    const isCurrentlyDescending = sortDirections[sortDirectionItem] === "descending";

    switch (sortDirections[sortDirectionItem]) {
      case undefined:
        x[sortDirectionItem] = "descending";
        break;
      case "ascending":
        x[sortDirectionItem] = undefined;
        setData(
          data.sort((a, b) => {
            return a.ProjectId > b.ProjectId;
          })
        );
        setSortDirections(x);
        return;
      case "descending":
        x[sortDirectionItem] = "ascending";
        break;
    }

    switch (sortDirectionItem) {
      case "sortDirection1":
        setData(
          data.sort((a, b) => {
            return isCurrentlyDescending
              ? a.ProjectId < b.ProjectId
              : a.ProjectId > b.ProjectId;
          })
        );
        break;
      case "sortDirection2":
        setData(
          data.sort((a, b) => {
            return isCurrentlyDescending
              ? b.ProjectName.localeCompare(a.ProjectName)
              : a.ProjectName.localeCompare(b.ProjectName);
          })
        );
        break;
      default:
        break;
    }

    setSortDirections(x);
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = query => {
    setSearchQuery(query);
    setSearchData(
      data.filter(item => item.ProjectName.toLowerCase().startsWith(query.toLowerCase()))
    );
  };

  function renderSearch() {
    return (
      <View
        style={{
          marginStart: 5,
          flexDirection: "row",
          marginBottom: 8,
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
          {t("projects")}
        </Text>
        <Animated.View style={[{ zIndex: 10 }, animatedStyles]}>
          <Searchbar
            onIconPress={() => {
              if (isExpanded) {
                setIsExpanded(false);
                Keyboard.dismiss();
              } else {
                setIsExpanded(true);
              }
            }}
            placeholder={searchQuery.length > 0 ? "" : t("search")}
            inputStyle={{
              fontSize: 15
            }}
            icon={isExpanded ? "arrow-left" : "magnify"}
            onChangeText={onChangeSearch}
            value={isExpanded ? searchQuery : ""}
            style={[
              {
                elevation: isExpanded ? 5 : 0,
                height: 40,
                zIndex: 10,
                width: "100%",
                backgroundColor: isExpanded ? "white" : "transparent"
              }
            ]}
          />
        </Animated.View>
      </View>
    );
  }

  function renderHeaders() {
    return (
      <DataTable.Header style={containerStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={flex1}
          onPress={() => handleSortDirection("sortDirection1")}
        >
          <DataTableTitle
            theme={ArrowTheme}
            style={[flex1, rowReverse]}
            sortDirection={sortDirections.sortDirection1}
          >
            <Text style={headerTextStyle}>{t("projectNumber")}</Text>
          </DataTableTitle>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={flex2}
          onPress={() => handleSortDirection("sortDirection2")}
        >
          <DataTableTitle
            theme={ArrowTheme}
            style={[flex2, rowReverse]}
            sortDirection={sortDirections.sortDirection2}
          >
            <Text style={headerTextStyle}>{t("projectName")}</Text>
          </DataTableTitle>
        </TouchableOpacity>
      </DataTable.Header>
    );
  }

  return (
    <View style={flex1}>
      {renderSearch()}
      {renderHeaders()}
      <FlatList
        refreshing={isLoading}
        onRefresh={getProjectsData}
        keyExtractor={item => item.ProjectId}
        data={searchQuery.length > 0 ? searchData : data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProjectsPage;
