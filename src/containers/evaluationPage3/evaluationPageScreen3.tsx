import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, Text, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";

import { applicationsAPI } from "~/api/";
import { RadioButton } from "~/components/common/RadioButton";
import { RadioGroup } from "~/components/common/RadioGroup";
import TextInput from "~/components/TextInput/TextInput";
import { setPages } from "~/redux/reducers/pages.reducer";
import { RootState } from "~/redux/store";
const houseAgeList = [
  {
    label: "اقل من 50 سنة",
    value: "1"
  },
  {
    label: "50-80 سنة",
    value: "2"
  },
  {
    label: "اعلى من 80 سنة",
    value: "3"
  }
];

const EvaluationPageScreen3 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pageThree } = useSelector((state: RootState) => state.pages);
  const { colors } = useTheme();
  const { pageOne, pageTwo } = useSelector((state: RootState) => state.pagesObj);

  const [showDropDown, setShowDropDown] = useState(false);
  const [houseWasRenovatedIn, setHouseWasRenovatedIn] = useState("");
  const [houseAge, setHouseAge] = useState("");
  const [spacesCount, setSpacesCount] = useState("");
  const [fullSize, setFullSize] = useState("");
  const [coveringSize, setCoveringSize] = useState("");
  const [dilf, setDilf] = useState("");
  const [dilfNotes, setDilfNotes] = useState("");
  const [humidity, setHumidity] = useState("");
  const [humidityNotes, setHumidityNotes] = useState("");
  const [sanitaryExtensions, setSanitaryExtensions] = useState("");
  const [sanitaryExtensionsNotes, setSanitaryExtensionsNotes] = useState("");
  const [faultyFloorType, setFaultyFloorType] = useState("");
  const [typeOfPlastering, setTypeOfPlastering] = useState("");
  const [palsteringCondition, setPlasteringCondition] = useState("");
  const [kehlaCondition, setKehlaCondition] = useState("");
  const [typeOfKehla, setTypeOfKehla] = useState("");
  const [faultyCeiling, setFaultyCeiling] = useState("");
  const [faultyCeilingNotes, setFaultyCeilingNotes] = useState("");
  const [doorsAndWindows, setDoorsAndWindows] = useState("");
  const [kitchenCondition, setKitchenCondition] = useState("");
  const [bathroomCondition, setBathroomCondition] = useState("");
  const [sanitary, setSanitary] = useState("");
  const [unsanitary, setUnsanitary] = useState("");
  const [bathroomNotes, setBathroomNotes] = useState("");
  const [structuralIssues, setStructuralIssues] = useState("");
  const [describeIssues, setDescribeIssues] = useState("");
  const [infrastructure, setInfrastructure] = useState("");
  const [water, setWater] = useState("");
  const [sewerage, setSewerage] = useState("");
  const [electricity, setElectricity] = useState("");
  const [specificIssues, setSpecificIssues] = useState("");
  const [leakage, setLeakage] = useState("");
  const [Extensions, setExtensions] = useState("");
  const [generalCondition, setGeneralCondition] = useState("");
  const [lawsuits, setLawsuits] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();
  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (
      houseWasRenovatedIn !== "" &&
      houseAge !== "" &&
      spacesCount !== "" &&
      fullSize !== "" &&
      coveringSize !== "" &&
      dilf !== "" &&
      dilfNotes !== "" &&
      humidity !== "" &&
      humidityNotes !== "" &&
      sanitaryExtensions !== "" &&
      sanitaryExtensionsNotes !== "" &&
      faultyFloorType !== "" &&
      palsteringCondition !== "" &&
      kehlaCondition !== "" &&
      typeOfPlastering !== "" &&
      typeOfKehla !== "" &&
      faultyCeiling !== "" &&
      faultyCeilingNotes !== "" &&
      doorsAndWindows !== "" &&
      kitchenCondition !== "" &&
      bathroomCondition !== "" &&
      sanitary !== "" &&
      unsanitary !== "" &&
      bathroomNotes !== "" &&
      structuralIssues !== "" &&
      describeIssues !== "" &&
      infrastructure !== "" &&
      water !== "" &&
      sewerage !== "" &&
      electricity !== "" &&
      specificIssues !== "" &&
      leakage !== "" &&
      Extensions !== "" &&
      generalCondition !== "" &&
      lawsuits !== "" &&
      recommendation !== ""
    ) {
      if (pageThree !== 2)
        dispatch(
          setPages({
            pageThree: 2
          })
        );
    } else if (
      houseWasRenovatedIn === "" &&
      houseAge === "" &&
      spacesCount === "" &&
      fullSize === "" &&
      coveringSize === "" &&
      dilf === "" &&
      dilfNotes === "" &&
      humidity === "" &&
      humidityNotes === "" &&
      sanitaryExtensions === "" &&
      sanitaryExtensionsNotes === "" &&
      faultyFloorType === "" &&
      palsteringCondition === "" &&
      kehlaCondition === "" &&
      typeOfPlastering === "" &&
      typeOfKehla === "" &&
      faultyCeiling === "" &&
      faultyCeilingNotes === "" &&
      doorsAndWindows === "" &&
      kitchenCondition === "" &&
      bathroomCondition === "" &&
      sanitary === "" &&
      unsanitary === "" &&
      bathroomNotes === "" &&
      structuralIssues === "" &&
      describeIssues === "" &&
      infrastructure === "" &&
      water === "" &&
      sewerage === "" &&
      electricity === "" &&
      specificIssues === "" &&
      leakage === "" &&
      Extensions === "" &&
      generalCondition === "" &&
      lawsuits === "" &&
      recommendation === ""
    ) {
      if (pageThree !== 0)
        dispatch(
          setPages({
            pageThree: 0
          })
        );
    } else {
      if (pageThree !== 1)
        dispatch(
          setPages({
            pageThree: 1
          })
        );
    }
  }, [
    houseWasRenovatedIn,
    houseAge,
    spacesCount,
    fullSize,
    coveringSize,
    dilf,
    dilfNotes,
    humidity,
    humidityNotes,
    sanitaryExtensions,
    sanitaryExtensionsNotes,
    faultyFloorType,
    palsteringCondition,
    kehlaCondition,
    typeOfPlastering,
    typeOfKehla,
    faultyCeiling,
    faultyCeilingNotes,
    doorsAndWindows,
    kitchenCondition,
    bathroomCondition,
    sanitary,
    unsanitary,
    bathroomNotes,
    structuralIssues,
    describeIssues,
    infrastructure,
    water,
    sewerage,
    electricity,
    specificIssues,
    leakage,
    Extensions,
    generalCondition,
    lawsuits,
    recommendation,
    pageThree,
    dispatch
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
        <TextInput
          keyboardType={"numeric"}
          label={t("house_was_renovated_in")}
          value={houseWasRenovatedIn}
          setValue={setHouseWasRenovatedIn}
        />
        <DropDown
          label={t("house_age")}
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
          value={houseAge}
          setValue={setHouseAge}
          list={houseAgeList}
        />
        <TextInput
          keyboardType={"numeric"}
          label={t("spaces_count")}
          value={spacesCount}
          setValue={setSpacesCount}
        />
        <TextInput label={t("full_size")} value={fullSize} setValue={setFullSize} />
        <TextInput
          label={t("covering_size")}
          value={coveringSize}
          setValue={setCoveringSize}
        />
        <Text>{t("dilf")}</Text>
        <RadioGroup onToggle={setDilf}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput label={t("dilf_notes")} value={dilfNotes} setValue={setDilfNotes} />
        <Text>{t("humidity")}</Text>
        <RadioGroup onToggle={setHumidity}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput
          label={t("humidity_notes")}
          value={humidityNotes}
          setValue={setHumidityNotes}
        />
        <Text>{t("sanitary_extensions")}</Text>
        <RadioGroup onToggle={setSanitaryExtensions}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput
          label={t("sanitary_extensions_notes")}
          value={sanitaryExtensionsNotes}
          setValue={setSanitaryExtensionsNotes}
        />
        <Text>{t("faulty_floor_type")}</Text>
        <RadioGroup onToggle={setFaultyFloorType}>
          <RadioButton label={t("Good")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("Bad")} value={"3"} />
        </RadioGroup>
        <Text>{t("type_of_plastering")}</Text>
        <RadioGroup onToggle={setTypeOfPlastering}>
          <RadioButton label={t("cement")} value={"1"} />
          <RadioButton label={t("limestone")} value={"2"} />
        </RadioGroup>
        <Text>{t("plastering_condition")}</Text>
        <RadioGroup onToggle={setPlasteringCondition}>
          <RadioButton label={t("Good")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("Bad")} value={"3"} />
        </RadioGroup>
        <Text>{t("type_of_kehla")}</Text>
        <RadioGroup onToggle={setTypeOfKehla}>
          <RadioButton label={t("cement")} value={"1"} />
          <RadioButton label={t("limestone")} value={"2"} />
        </RadioGroup>
        <Text>{t("kehla_condition")}</Text>
        <RadioGroup onToggle={setKehlaCondition}>
          <RadioButton label={t("Good")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("Bad")} value={"3"} />
        </RadioGroup>
        <TextInput
          label={t("faulty_ceiling")}
          value={faultyCeiling}
          setValue={setFaultyCeiling}
        />
        <TextInput
          label={t("faulty_ceiling_notes")}
          value={faultyCeilingNotes}
          setValue={setFaultyCeilingNotes}
        />
        <TextInput
          label={t("doors_and_windows")}
          value={doorsAndWindows}
          setValue={setDoorsAndWindows}
        />
        <TextInput
          label={t("kitchen_condition")}
          value={kitchenCondition}
          setValue={setKitchenCondition}
        />
        <Text>{t("bathroom_condition")}</Text>
        <RadioGroup onToggle={setBathroomCondition}>
          <RadioButton label={t("sanitary")} value={"1"} />
          <RadioButton label={t("unsanitary")} value={"2"} />
        </RadioGroup>
        <TextInput
          label={t("bathroom_notes")}
          value={bathroomNotes}
          setValue={setBathroomNotes}
        />
        <Text>{t("structural_issues")}</Text>
        <RadioGroup onToggle={setStructuralIssues}>
          <RadioButton label={t("safe")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("dangerous")} value={"3"} />
        </RadioGroup>
        <TextInput
          label={t("describe_issues")}
          value={describeIssues}
          setValue={setDescribeIssues}
        />
        <Text style={{ marginTop: 20 }}>{t("infrastructure")}</Text>
        <TextInput label={t("water")} value={water} setValue={setWater} />
        <TextInput label={t("leakage")} value={leakage} setValue={setLeakage} />
        <TextInput label={t("sewerage")} value={sewerage} setValue={setSewerage} />
        <TextInput
          label={t("electricity")}
          value={electricity}
          setValue={setElectricity}
        />
        <TextInput
          label={t("specific_issues")}
          value={specificIssues}
          setValue={setSpecificIssues}
        />
        <TextInput label={t("extensions")} value={Extensions} setValue={setExtensions} />
        <TextInput
          label={t("general_condition")}
          value={generalCondition}
          setValue={setGeneralCondition}
        />
        <TextInput label={t("lawsuits")} value={lawsuits} setValue={setLawsuits} />
        <TextInput
          label={t("recommendation")}
          value={recommendation}
          setValue={setRecommendation}
        />
        <Button
          onPress={() => {

            const form = { ...pageOne, ...pageTwo,
              YearRenovation: houseWasRenovatedIn,
              BuildingAge: houseAge,
              NumberOfBlanks: spacesCount,
              TotalArea: fullSize,
              Coverage: coveringSize,
              IsThereHumidityInTheHouse: humidity,
              HumidityNotes: humidityNotes,
              AreTherePlumbingFixtures: sanitaryExtensions,
              PlumbingNotes: sanitaryExtensionsNotes,
              GroundDamagedCase: faultyFloorType,
              DamagedPlasterCase: palsteringCondition,
              WhatTypeOfPlasterIsDamaged: typeOfPlastering,
              DamagedKohlCase: kehlaCondition,
              WhatTypeOfKohlIsDamaged: typeOfKehla,
              DamagedSurfaces: faultyCeiling,
              DamagedSurfaceNotes: faultyCeilingNotes,
              DoorsAndWindows: doorsAndWindows,
              KitchenCase: kitchenCondition,
              BathroomCase: bathroomCondition,
              BathroomNotes: bathroomNotes,
              AreThereConstructionProblems: structuralIssues,
              DescribeTheSymptomsOfTheProblem: describeIssues,
              WaterProblemsMentionedByTheBeneficiary: infrastructure,
              EffectsOfLeakageOrImminentDamageToTheNetwork :leakage,
              SanitationProblemsMentionedByTheBeneficiary: sewerage,
              ElectricityProblemsMentionedByTheBeneficiary: electricity,
              InternalAndExternalExtensions: Extensions,
              GeneralCaseOfTheBuilding: generalCondition,
              AdditionalIssuesAndNotes: specificIssues,
              ConclusionAndRecommendations: recommendation
            };
            applicationsAPI.AddApplicationForm(
              pageOne.SubscriberServiceID,
              userToken,
              form
            );
            navigation.goBack();
            navigation.goBack();
          }}
          style={{
            borderTopWidth: 0.5,
            borderTopColor: "#111",
            marginTop: 12
          }}
        >
          {t("save")}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EvaluationPageScreen3;
