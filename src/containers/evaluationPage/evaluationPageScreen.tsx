import React, { RefObject, useRef, useState } from "react";
import {KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";
import PagerView from "react-native-pager-view";
import { Button } from "react-native-paper";

import TextInput from "~/components/TextInput/TextInput";
import {RadioGroup} from "~/components/common/RadioGroup";
import {RadioButton} from "~/components/common/RadioButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const EvaluationPageScreen = () => {

  return (
    <PagerView
      ref={pageView}
      initialPage={0}
      scrollEnabled
      style={{
        flex: 1,
        margin: 12,
        paddingBottom: 8
      }}
    />
  );
};

export default EvaluationPageScreen;
