import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { RadioButton } from "~/components/common/RadioButton";
import { RadioGroup } from "~/components/common/RadioGroup";
import TextInput from "~/components/TextInput/TextInput";
import { setPages } from "~/redux/reducers/pages.reducer";
import { setPagesObj } from "~/redux/reducers/pagesObj.reducer";
import { RootState } from "~/redux/store";

const EvaluationPageScreen2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pageTwo } = useSelector((state: RootState) => state.pages);
  const { params } = useRoute();
  const [anotherIncome, setAnotherIncome] = useState("");
  const [location, setLocation] = useState("");
  const [benefactors, setBenefactors] = useState("");
  const [residentsAbove18Male, setResidentsAbove18Male] = useState("");
  const [residentsAbove18Female, setResidentsAbove18Female] = useState("");
  const [residentsUnder18Male, setResidentsUnder18Male] = useState("");
  const [residentsUnder18Female, setResidentsUnder18Female] = useState("");
  const [residentsWithSpecialNeedsMale, setResidentsWithSpecialNeedsMale] = useState("");
  const [residentsWithSpecialNeedsFemale, setResidentsWithSpecialNeedsFemale] =
    useState("");
  const [benefactorsForJob, setBenefactorsForJob] = useState("");
  const [houseWasRenovated, setHouseWasRenovated] = useState("");
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (
      anotherIncome !== "" &&
      location !== "" &&
      benefactors !== "" &&
      residentsAbove18Male !== "" &&
      residentsAbove18Female !== "" &&
      residentsUnder18Male !== "" &&
      residentsUnder18Female !== "" &&
      residentsWithSpecialNeedsMale !== "" &&
      residentsWithSpecialNeedsFemale !== "" &&
      benefactorsForJob !== "" &&
      houseWasRenovated !== ""
    ) {
      if (pageTwo !== 2)
        dispatch(
          setPages({
            pageTwo: 2
          })
        );
    } else if (
      anotherIncome === "" &&
      location === "" &&
      benefactors === "" &&
      residentsAbove18Male === "" &&
      residentsAbove18Female === "" &&
      residentsUnder18Male === "" &&
      residentsUnder18Female === "" &&
      residentsWithSpecialNeedsMale === "" &&
      residentsWithSpecialNeedsFemale === "" &&
      benefactorsForJob === "" &&
      houseWasRenovated === ""
    ) {
      if (pageTwo !== 0)
        dispatch(
          setPages({
            pageTwo: 0
          })
        );
    } else {
      if (pageTwo !== 1)
        dispatch(
          setPages({
            pageTwo: 1
          })
        );
    }

    dispatch(
      setPagesObj({
        pageTwo: {
          IsThereAnyOtherIncome: anotherIncome,
          LocationSensitivity: location,
          TheBeneficiary: benefactors,
          NumberOfPeopleOver18YearsOld: residentsAbove18Male,
          NumberOfPeopleUnder18YearsOld: residentsUnder18Male,
          NumberOfPeopleWithChronicDiseases: residentsWithSpecialNeedsMale,
          HasThePropertyBeenPreviouslyRenovated: houseWasRenovated
        }
      })
    );
  }, [
    anotherIncome,
    benefactors,
    benefactorsForJob,
    dispatch,
    houseWasRenovated,
    location,
    pageTwo,
    residentsAbove18Male,
    residentsAbove18Female,
    residentsUnder18Male,
    residentsUnder18Female,
    residentsWithSpecialNeedsMale,
    residentsWithSpecialNeedsFemale
  ]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={(Platform.OS === "ios" ? 1 : 1) * (headerHeight + 80)} // adjust the value here if you need more padding
      key="1"
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1
      }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView keyboardShouldPersistTaps={"never"} style={{ flex: 1 }}>
        <Text>{t("another_income")}</Text>
        <RadioGroup onToggle={setAnotherIncome}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <Text>{t("location")}</Text>
        <RadioGroup onToggle={setLocation}>
          <RadioButton label={t("sensitive")} value={"true"} />
          <RadioButton label={t("insensitive")} value={"false"} />
        </RadioGroup>
        <TextInput
          label={t("benefactors")}
          value={benefactors}
          setValue={setBenefactors}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("male_residents_above_18")}
          value={residentsAbove18Male}
          setValue={setResidentsAbove18Male}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("female_residents_above_18")}
          value={residentsAbove18Female}
          setValue={setResidentsAbove18Female}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("male_residents_under_18")}
          value={residentsUnder18Male}
          setValue={setResidentsUnder18Male}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("female_residents_under_18")}
          value={residentsUnder18Female}
          setValue={setResidentsUnder18Female}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("male_residents_with_special_needs")}
          value={residentsWithSpecialNeedsMale}
          setValue={setResidentsWithSpecialNeedsMale}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("female_residents_with_special_needs")}
          value={residentsWithSpecialNeedsFemale}
          setValue={setResidentsWithSpecialNeedsFemale}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("benefactors_for_job")}
          value={benefactorsForJob}
          setValue={setBenefactorsForJob}
        />
        <Text>{t("house_was_renovated")}</Text>
        <RadioGroup onToggle={setHouseWasRenovated}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <Button
          onPress={() => navigation.navigate("Settings3")}
          style={{
            borderTopWidth: 0.5,
            borderTopColor: "#111",
            marginTop: 12
          }}
        >
          {t("next")}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EvaluationPageScreen2;
