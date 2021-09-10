import * as React from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  I18nManager
} from "react-native";

import { useTheme, Text, withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> & {
  children: React.ReactNode;
  numeric?: boolean;
  sortDirection?: "ascending" | "descending";
  numberOfLines?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme: ReactNativePaper.Theme;
};

const DataTableTitle = ({
  numeric,
  children,
  onPress,
  sortDirection,
  theme,
  style,
  numberOfLines = 1,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const { current: spinAnim } = React.useRef<Animated.Value>(
    new Animated.Value(sortDirection === "ascending" ? 0 : 1)
  );

  React.useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: sortDirection === "ascending" ? 0 : 1,
      duration: 150,
      useNativeDriver: true
    }).start();
  }, [sortDirection, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  });

  const icon = sortDirection ? (
    <Animated.View style={[styles.icon, { transform: [{ rotate: spin }] }]}>
      <Icon name="arrow-up" size={16} color={theme.colors.text} />
    </Animated.View>
  ) : null;

  return (
    <TouchableWithoutFeedback disabled={!onPress} onPress={onPress} {...rest}>
      <View style={[styles.container, numeric && styles.right, style]}>
        {icon}
        <Text style={styles.cell} numberOfLines={numberOfLines}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

DataTableTitle.displayName = "DataTable.Title";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 12
  },

  right: {
    justifyContent: "flex-end"
  },

  cell: {
    height: 24,
    lineHeight: 24,
    fontSize: 12,
    fontWeight: "500",
    alignItems: "center"
  },
  icon: {
    marginEnd: 5,
    height: 24,
    justifyContent: "center"
  }
});

export default withTheme(DataTableTitle);

// @component-docs ignore-next-line
export { DataTableTitle };
