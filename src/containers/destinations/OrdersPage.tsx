import * as React from "react";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { useTranslation } from "react-i18next";
import { DataTable, Text } from "react-native-paper";

import DataTableTitle from "~/containers/destinations/DataTableTitle";
import ordersPageStyle from "~/containers/destinations/OrdersPage.style";
import { ArrowTheme } from "~/theme/theme";

const OrdersPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([
    { id: 1, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 2, name: "askdmas", type: "طارىء", date: "21/12/1996" },
    { id: 3, name: "askdla", type: "شامل", date: "21/12/1996" },
    { id: 4, name: "mkdfg", type: "شامل", date: "21/12/1996" },
    { id: 5, name: "dfcx", type: "شامل", date: "21/12/1996" },
    { id: 6, name: "mkcb", type: "شامل", date: "21/12/1996" },
    { id: 7, name: "ksdg", type: "شامل", date: "21/12/1996" },
    { id: 8, name: "Hedfhdfy", type: "طارىء", date: "21/12/1996" },
    { id: 9, name: "H412ey", type: "طارىء", date: "21/12/1996" },
    { id: 10, name: "12Hey", type: "طارىء", date: "21/12/1996" },
    { id: 11, name: "sdgsdHey", type: "طارىء", date: "21/12/1996" },
    { id: 12, name: "Hsaey", type: "طارىء", date: "21/12/1996" },
    { id: 13, name: "Hesafasy", type: "طارىء", date: "21/12/1996" },
    { id: 14, name: "Heasfy", type: "طارىء", date: "21/12/1996" },
    { id: 15, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 16, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 17, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 18, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 19, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 20, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 21, name: "Hey", type: "طارىء", date: "21/12/1996" },
    { id: 22, name: "Hey", type: "طارىء", date: "21/12/2022" },
    { id: 23, name: "Hey", type: "طارىء", date: "21/12/2021" }
  ]);
  const { flex1, flex2, containerStyle, headerTextStyle, rowReverse } = ordersPageStyle;
  const [sortDirections, setSortDirections] = useState<{
    sortDirection1: undefined | "ascending" | "descending";
    sortDirection2: undefined | "ascending" | "descending";
    sortDirection3: undefined | "ascending" | "descending";
    sortDirection4: undefined | "ascending" | "descending";
  }>({
    sortDirection1: "ascending",
    sortDirection2: undefined,
    sortDirection3: undefined,
    sortDirection4: undefined
  });
  const renderItem = ({ item, index }: { item; index: number }) => {
    return (
      <DataTable.Row style={{ paddingHorizontal: 8 }} key={item}>
        <DataTable.Cell style={flex1}><Text style={{fontSize: 12}}>{item.id}</Text></DataTable.Cell>
        <DataTable.Cell style={flex2}><Text style={{fontSize: 12}}>{item.name}</Text></DataTable.Cell>
        <DataTable.Cell style={flex1}><Text style={{fontSize: 12}}>{item.type}</Text></DataTable.Cell>
        <DataTable.Cell style={flex1}><Text style={{fontSize: 12}}>{item.date}</Text></DataTable.Cell>
      </DataTable.Row>
    );
  };

  const handleSortDirection = sortDirectionItem => {
    const x = {
      sortDirection1: undefined,
      sortDirection2: undefined,
      sortDirection3: undefined,
      sortDirection4: undefined
    };

    const isCurrentlyAscending = sortDirections[sortDirectionItem] === "ascending";
    x[sortDirectionItem] = isCurrentlyAscending ? "descending" : "ascending";

    switch (sortDirectionItem) {
      case "sortDirection1":
        setData(
          data.sort((a, b) => {
            return isCurrentlyAscending ? a.id > b.id : a.id < b.id;
          })
        );
        break;
      case "sortDirection2":
        setData(
          data.sort((a, b) => {
            return isCurrentlyAscending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          })
        );
        break;
      case "sortDirection3":
        setData(
          data.sort((a, b) => {
            return isCurrentlyAscending
              ? a.type.localeCompare(b.type)
              : b.type.localeCompare(a.type);
          })
        );
        break;
      case "sortDirection4":
        setData(
          data.sort((a, b) => {
            return isCurrentlyAscending
              ? a.date.localeCompare(b.date)
              : b.date.localeCompare(a.date);
          })
        );
        break;
      default:
        break;
    }

    setSortDirections(x);
  };

  return (
    <View style={flex1}>
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
            <Text style={headerTextStyle}>{t("orderNumber")}</Text>
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
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default OrdersPage;
