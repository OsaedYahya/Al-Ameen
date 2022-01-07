import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
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
import ordersPageStyle from "./OrdersPage.style";

import { applicationsAPI } from "~/api/";
import { SafIcon } from "~/components/";
import { THEME_MODE_FLAG } from "~/constants/";
import { RootState } from "~/redux/store";
import { retrieveItem, storeItem } from "~/services/";
import { ArrowTheme, LightTheme } from "~/theme/theme";

const OrdersPage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);

  const storeOrderIfNotExist = async (data: any) => {
    let orders = [];
    await retrieveItem("Orders").then(res => {
      orders = res || [];
    });
    const merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

    orders = merge(data, orders, "SubscriberServiceID");
    await storeItem("Orders", orders);
    setData(orders);
  };
  useEffect(() => {
    applicationsAPI
      .getApplications(userToken)
      .then(res => {
        setData(res.data);
        storeOrderIfNotExist(res.data);
      })
      .catch(() => {
        retrieveItem("Orders").then(res => {
          setData(res || []);
        });
      });
  }, []);

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
    const width = interpolate(grow.value, [0, 1], [50, 250]);

    return {
      width
    };
  });

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const { flex1, flex2, containerStyle, headerTextStyle, rowReverse } = ordersPageStyle;
  const [sortDirections, setSortDirections] = useState<{
    sortDirection1: undefined | "ascending" | "descending";
    sortDirection2: undefined | "ascending" | "descending";
    sortDirection3: undefined | "ascending" | "descending";
    sortDirection4: undefined | "ascending" | "descending";
  }>({
    sortDirection1: undefined,
    sortDirection2: "descending",
    sortDirection3: undefined,
    sortDirection4: undefined
  });
  const renderItem = ({ item, index }: { item; index: number }) => {
    return (
      <TouchableRipple
        key={item}
        onLongPress={() =>{
          if(item.Latitude&&
            item.Longitude&&
          item.EvaluationForm&&
          item.Images){
            applicationsAPI.AddApplicationForm(
              item.SubscriberServiceID,
              item.userId,
              item.EvaluationForm,
              item.RoleId,
              item.Location,
              item.Images
            )
          } else {
            alert("Enter all data")
          }
        }}
        onPress={() => {
          navigation.navigate("OrderDetailsScreen", {
            order: item
          });
        }}
      >
        <DataTable.Row style={{ paddingHorizontal: 8 }}>
          <View
            style={[
              flex1,
              {
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }
            ]}
          >
            {/*
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 12 }}>{item.ApplicantNum}</Text>
            </View>
*/}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <SafIcon
                name={"location"}
                width={18}
                height={18}
                style={{ color: item.Latitude && item.Longitude ? "green" : "grey", marginVertical: 1 }}
              />
              <SafIcon
                name={"form"}
                width={16}
                height={16}
                style={{ color: item.EvaluationForm ? "green" : "grey", marginVertical: 1 }}
              />

              <SafIcon
                name={"camera"}
                width={16}
                height={16}
                style={{ color: (item.Images || [])?.length > 0 ? "green" : "grey" }}
              />
            </View>
          </View>
          <Text style={[flex2, { fontSize: 12, alignSelf: "center" }]} numberOfLines={2}>
            {item.ApplicantName}
          </Text>
          <DataTable.Cell style={flex1}>
            <Text style={{ fontSize: 12 }}>{item.RestorationType}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={flex1}>
            <Text style={{ fontSize: 12 }}>
              {moment(item.InsertDate).locale("en").format("YYYY-MM-DD")}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      </TouchableRipple>
    );
  };

  const handleSortDirection = sortDirectionItem => {
    const x = {
      sortDirection1: undefined,
      sortDirection2: undefined,
      sortDirection3: undefined,
      sortDirection4: undefined
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
            return a.ApplicantNum > b.ApplicantNum;
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
              ? a.ApplicantNum < b.ApplicantNum
              : a.ApplicantNum > b.ApplicantNum;
          })
        );
        break;
      case "sortDirection2":
        setData(
          data.sort((a, b) => {
            return isCurrentlyDescending
              ? b.ApplicantName.localeCompare(a.ApplicantName)
              : a.ApplicantName.localeCompare(b.ApplicantName);
          })
        );
        break;
      case "sortDirection3":
        setData(
          data.sort((a, b) => {
            return isCurrentlyDescending
              ? b.RestorationType.localeCompare(a.RestorationType)
              : a.RestorationType.localeCompare(b.RestorationType);
          })
        );
        break;
      case "sortDirection4":
        setData(
          data.sort((a, b) => {
            return isCurrentlyDescending
              ? b.InsertDate.localeCompare(a.InsertDate)
              : a.InsertDate.localeCompare(b.InsertDate);
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
      data.filter(item => item.ApplicantNum.toLowerCase().startsWith(query.toLowerCase()))
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
          {t("orders")}
        </Text>
        <Animated.View
          style={[{ zIndex: 10, marginEnd: isExpanded ? 10 : 0 }, animatedStyles]}
        >
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
            icon={isExpanded ? "arrow-right" : "magnify"}
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
        <TouchableOpacity activeOpacity={1} style={flex1}>
          <DataTableTitle
            theme={ArrowTheme}
            style={[flex1, rowReverse]}
            sortDirection={sortDirections.sortDirection1}
          >
            <Text style={headerTextStyle}>الحالة</Text>
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
            <Text style={headerTextStyle}>{t("nameOfOrderIssuer")}</Text>
          </DataTableTitle>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={flex1}
          onPress={() => handleSortDirection("sortDirection3")}
        >
          <DataTableTitle
            theme={ArrowTheme}
            style={[flex1, rowReverse]}
            sortDirection={sortDirections.sortDirection3}
          >
            <Text style={headerTextStyle}>{t("typeOfOrder")}</Text>
          </DataTableTitle>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={flex1}
          onPress={() => handleSortDirection("sortDirection4")}
        >
          <DataTableTitle
            theme={ArrowTheme}
            style={[flex1, rowReverse]}
            sortDirection={sortDirections.sortDirection4}
          >
            <Text style={headerTextStyle}>{t("dateOfOrder")}</Text>
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
        keyExtractor={item => item.SubscriberServiceID}
        refreshing={data.length === 0}
        onRefresh={() => {
          applicationsAPI
            .getApplications(userToken)
            .then(res => {
              setData(res.data);
              storeOrderIfNotExist(res.data);
            })
            .catch(() => {
              retrieveItem("Orders").then(res => {
                setData(res || []);
              });
            });
        }}
        data={searchQuery.length > 0 ? searchData : data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OrdersPage;
