import React, { useEffect, useState } from "react";

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";

import { RadioButton } from "~/components/common/RadioButton";
import { RadioGroup } from "~/components/common/RadioGroup";
import TextInput from "~/components/TextInput/TextInput";
import { setPages } from "~/redux/reducers/pages.reducer";
import { setPagesObj } from "~/redux/reducers/pagesObj.reducer";
import { RootState } from "~/redux/store";

const EvaluationPageScreen1 = () => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const { SubscriberServiceID, RoleID, Latitude, Longitude } = params.order;
  const { order } = params;
  const currentForm = order?.EvaluationForm || {};

  const {
    NameOfTheOccupantOfTheProperty= "",
    TheUse= "",
    Address= "",
    MobileNumber= "",
    GeneralInfo= "",
    AgeOfTheBreadwinner= "",
    GenderOfTheBreadwinner= "",
    EducationLevelOfTheHeadOfTheFamily= "",
    HouseSpace= "",
    WhatIsTheJobOfTheHeadOfTheFamilyIfHeWorks= "",
    FamilyIncomeLevel= "",
  } = currentForm;
  const [nameOfPropertyOwner, setNameOfPropertyOwner] = useState(NameOfTheOccupantOfTheProperty);
  const [usage, setUsage] = useState(TheUse);
  const [address, setAddress] = useState(Address);
  const [mobileNo, setMobileNo] = useState(MobileNumber);
  const [generalInfo, setGeneralInfo] = useState(GeneralInfo);
  const [providerAge, setProviderAge] = useState(AgeOfTheBreadwinner);
  const [providerGender, setProviderGender] = useState(GenderOfTheBreadwinner);
  const [providerEducation, setProviderEducation] = useState(EducationLevelOfTheHeadOfTheFamily);
  const [houseSize, setHouseSize] = useState(HouseSpace);
  const [providerJob, setProviderJob] = useState(WhatIsTheJobOfTheHeadOfTheFamilyIfHeWorks);
  const [providerIncome, setProviderIncome] = useState(FamilyIncomeLevel);
  const dispatch = useDispatch();
  const { pageOne } = useSelector((state: RootState) => state.pages);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  const educationList = [
    {
      label: "غير متعلم",
      value: "1"
    },
    {
      label: "ابتدائي",
      value: "2"
    },
    {
      label: "ثانوي",
      value: "3"
    },
    {
      label: "بكالوريوس",
      value: "4"
    }
  ];
  const incomeList = [
    {
      label: "3500 شيكل أو أقل",
      value: "1"
    },
    {
      label: "حتى 4500 شيكل",
      value: "2"
    },
    {
      label: "حتى 5500 شيكل",
      value: "3"
    }
  ];
  useEffect(() => {
    if (
      nameOfPropertyOwner !== "" &&
      usage !== "" &&
      address !== "" &&
      mobileNo !== "" &&
      generalInfo !== "" &&
      providerAge !== "" &&
      providerGender !== "" &&
      providerEducation !== "" &&
      houseSize !== "" &&
      providerJob !== "" &&
      providerIncome !== ""
    ) {
      if (pageOne !== 2)
        dispatch(
          setPages({
            pageOne: 2
          })
        );
    } else if (
      nameOfPropertyOwner === "" &&
      usage === "" &&
      address === "" &&
      mobileNo === "" &&
      generalInfo === "" &&
      providerAge === "" &&
      providerGender === "" &&
      providerEducation === "" &&
      houseSize === "" &&
      providerJob === "" &&
      providerIncome === ""
    ) {
      if (pageOne !== 0)
        dispatch(
          setPages({
            pageOne: 0
          })
        );
    } else {
      if (pageOne !== 1)
        dispatch(
          setPages({
            pageOne: 1
          })
        );
    }

    dispatch(
      setPagesObj({
        pageOne: {
          SubscriberServiceID: SubscriberServiceID,
          RoleId: RoleID,
          Location: {
            Latitude,
            Longitude
          },
          NameOfTheOccupantOfTheProperty: nameOfPropertyOwner,
          TheUse: usage,
          Address: address,
          MobileNumber: mobileNo,
          GeneralInfo: generalInfo, //
          AgeOfTheBreadwinner: providerAge,
          GenderOfTheBreadwinner: providerGender,
          EducationLevelOfTheHeadOfTheFamily: providerEducation,
          HouseSpace: houseSize,
          WhatIsTheJobOfTheHeadOfTheFamilyIfHeWorks: providerJob,
          FamilyIncomeLevel: providerIncome
        }
      })
    );
  }, [
    address,
    dispatch,
    generalInfo,
    houseSize,
    mobileNo,
    nameOfPropertyOwner,
    pageOne,
    providerAge,
    providerEducation,
    providerGender,
    providerIncome,
    providerJob,
    usage
  ]);

  return (
    <KeyboardAwareScrollView extraScrollHeight={headerHeight} style={{ flex: 1 }}>
      <TextInput
        label={t("name_of_property_owner")}
        value={nameOfPropertyOwner}
        setValue={setNameOfPropertyOwner}
      />
      <TextInput label={t("usage")} value={usage} setValue={setUsage} />
      <TextInput label={t("address")} value={address} setValue={setAddress} />
      <TextInput
        label={t("mobile_no")}
        keyboardType={"numeric"}
        value={mobileNo}
        setValue={setMobileNo}
      />
      <TextInput
        label={t("general_info")}
        value={generalInfo}
        setValue={setGeneralInfo}
      />
      <TextInput
        keyboardType={"numeric"}
        label={t("provider_age")}
        value={providerAge}
        setValue={setProviderAge}
      />
      <Text style={{ paddingHorizontal: 10, color: colors.text, marginTop: 12 }}>
        {t("provider_gender")}
      </Text>
      <RadioGroup onToggle={setProviderGender}>
        <RadioButton label={t("male")} value={"1"} />
        <RadioButton label={t("female")} value={"2"} />
      </RadioGroup>
      <DropDown
        label={t("provider_education")}
        mode={"outlined"}
        inputProps={{
          style: {
            borderColor: "#c1c1c1",
            marginTop: 12,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 14,
            padding: 0
          }
        }}
        theme={{ colors: { text: colors.text, placeholder: colors.gray } }}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={providerEducation}
        setValue={setProviderEducation}
        list={educationList}
      />
      <TextInput
        keyboardType={"numeric"}
        label={t("house_size")}
        value={houseSize}
        setValue={setHouseSize}
      />
      <TextInput
        label={t("provider_job")}
        value={providerJob}
        setValue={setProviderJob}
      />
      <DropDown
        label={t("provider_income")}
        mode={"outlined"}
        inputProps={{
          style: {
            borderColor: "#c1c1c1",
            marginTop: 12,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 14,
            padding: 0
          }
        }}
        theme={{ colors: { text: colors.text, placeholder: colors.gray } }}
        visible={showDropDown2}
        showDropDown={() => setShowDropDown2(true)}
        onDismiss={() => setShowDropDown2(false)}
        value={providerIncome}
        setValue={setProviderIncome}
        list={incomeList}
      />
      <Button
        onPress={() => navigation.navigate("Settings2")}
        style={{
          borderTopWidth: 0.5,
          borderTopColor: "#111",
          marginTop: 12
        }}
      >
        {t("next")}
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default EvaluationPageScreen1;
