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
import { retrieveItem, storeItem } from "~/services/";

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

const EvaluationPageScreen3 = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pageThree } = useSelector((state: RootState) => state.pages);
  const { colors } = useTheme();
  const { pageOne, pageTwo } = useSelector((state: RootState) => state.pagesObj);
  const { order } = route.params;
  const currentForm = order?.EvaluationForm || {};

  const {
    YearRenovation = "",
    BuildingAge = "",
    NumberOfBlanks = "",
    TotalArea = "",
    Coverage = "",
    IsThereHumidityInTheHouse = "",
    HumidityNotes = "",
    AreTherePlumbingFixtures = "",
    PlumbingNotes = "",
    GroundDamagedCase = "",
    DamagedPlasterCase = "",
    TheVisionOfTheBeneficiariesOfTheRequiredWork: vision = "",
    WhatTypeOfPlasterIsDamaged = "",
    DamagedKohlCase = "",
    WhatTypeOfKohlIsDamaged = "",
    DamagedSurfaces = "",
    DamagedSurfaceNotes = "",
    DoorsAndWindows = "",
    KitchenCase = "",
    BathroomCase = "",
    BathroomNotes = "",
    AreThereConstructionProblems = "",
    DescribeTheSymptomsOfTheProblem = "",
    WaterProblemsMentionedByTheBeneficiary: waterProblems = "",
    EffectsOfLeakageOrImminentDamageToTheNetwork = "",
    SanitationProblemsMentionedByTheBeneficiary = "",
    ElectricityProblemsMentionedByTheBeneficiary = "",
    InternalAndExternalExtensions = "",
    GeneralCaseOfTheBuilding = "",
    AdditionalIssuesAndNotes = "",
    ConclusionAndRecommendations = ""
  } = currentForm;

  const [showDropDown, setShowDropDown] = useState(false);
  const [houseWasRenovatedIn, setHouseWasRenovatedIn] = useState(YearRenovation);
  const [houseAge, setHouseAge] = useState(BuildingAge);
  const [spacesCount, setSpacesCount] = useState(NumberOfBlanks || "");
  const [fullSize, setFullSize] = useState(TotalArea || "");
  const [coveringSize, setCoveringSize] = useState(Coverage || "");
  const [dilf, setDilf] = useState(IsThereHumidityInTheHouse || "");
  const [dilfNotes, setDilfNotes] = useState(HumidityNotes || "");
  const [humidity, setHumidity] = useState(IsThereHumidityInTheHouse);
  const [humidityNotes, setHumidityNotes] = useState(HumidityNotes);
  const [sanitaryExtensions, setSanitaryExtensions] = useState(
    AreTherePlumbingFixtures || ""
  );
  const [sanitaryExtensionsNotes, setSanitaryExtensionsNotes] = useState(
    PlumbingNotes || ""
  );
  const [faultyFloorType, setFaultyFloorType] = useState(GroundDamagedCase);
  const [typeOfPlastering, setTypeOfPlastering] = useState(WhatTypeOfPlasterIsDamaged);
  const [palsteringCondition, setPlasteringCondition] = useState(DamagedPlasterCase);
  const [kehlaCondition, setKehlaCondition] = useState(DamagedKohlCase);
  const [typeOfKehla, setTypeOfKehla] = useState(WhatTypeOfKohlIsDamaged);
  const [faultyCeiling, setFaultyCeiling] = useState(DamagedSurfaces);
  const [faultyCeilingNotes, setFaultyCeilingNotes] = useState(DamagedSurfaceNotes);
  const [doorsAndWindows, setDoorsAndWindows] = useState(DoorsAndWindows);
  const [kitchenCondition, setKitchenCondition] = useState(KitchenCase);
  const [bathroomCondition, setBathroomCondition] = useState(BathroomCase);
  const [bathroomNotes, setBathroomNotes] = useState(BathroomNotes);
  const [structuralIssues, setStructuralIssues] = useState(AreThereConstructionProblems);
  const [describeIssues, setDescribeIssues] = useState(DescribeTheSymptomsOfTheProblem);
  const [sewerage, setSewerage] = useState(SanitationProblemsMentionedByTheBeneficiary);
  const [
    WaterProblemsMentionedByTheBeneficiary,
    setWaterProblemsMentionedByTheBeneficiary
  ] = useState(waterProblems);
  const [
    TheVisionOfTheBeneficiariesOfTheRequiredWork,
    setTheVisionOfTheBeneficiariesOfTheRequiredWork
  ] = useState(vision);
  const [electricity, setElectricity] = useState(ElectricityProblemsMentionedByTheBeneficiary);
  const [specificIssues, setSpecificIssues] = useState(AdditionalIssuesAndNotes);
  const [leakage, setLeakage] = useState(EffectsOfLeakageOrImminentDamageToTheNetwork);
  const [Extensions, setExtensions] = useState(InternalAndExternalExtensions);
  const [generalCondition, setGeneralCondition] = useState(GeneralCaseOfTheBuilding);
/*  const [lawsuits, setLawsuits] = useState("");*/
  const [recommendation, setRecommendation] = useState(ConclusionAndRecommendations);
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
      bathroomNotes !== "" &&
      structuralIssues !== "" &&
      describeIssues !== "" &&
      sewerage !== "" &&
      electricity !== "" &&
      specificIssues !== "" &&
      leakage !== "" &&
      Extensions !== "" &&
      generalCondition !== "" &&
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
      bathroomNotes === "" &&
      structuralIssues === "" &&
      describeIssues === "" &&
      sewerage === "" &&
      electricity === "" &&
      specificIssues === "" &&
      leakage === "" &&
      Extensions === "" &&
      generalCondition === "" &&
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
    bathroomNotes,
    structuralIssues,
    describeIssues,
    sewerage,
    electricity,
    specificIssues,
    leakage,
    Extensions,
    generalCondition,
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
          dropDownItemSelectedTextStyle={{
            color: colors.primary
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
        <RadioGroup defaultValue={dilf} onToggle={setDilf}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput label={t("dilf_notes")} value={dilfNotes} setValue={setDilfNotes} />
        <Text>{t("humidity")}</Text>
        <RadioGroup defaultValue={humidity} onToggle={setHumidity}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput
          label={t("humidity_notes")}
          value={humidityNotes}
          setValue={setHumidityNotes}
        />
        <Text>{t("sanitary_extensions")}</Text>
        <RadioGroup defaultValue={sanitaryExtensions} onToggle={setSanitaryExtensions}>
          <RadioButton label={t("Yes")} value={"true"} />
          <RadioButton label={t("No")} value={"false"} />
        </RadioGroup>
        <TextInput
          label={t("sanitary_extensions_notes")}
          value={sanitaryExtensionsNotes}
          setValue={setSanitaryExtensionsNotes}
        />
        <Text>{t("faulty_floor_type")}</Text>
        <RadioGroup defaultValue={faultyFloorType} onToggle={setFaultyFloorType}>
          <RadioButton label={t("Good")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("Bad")} value={"3"} />
        </RadioGroup>
        <Text>{t("type_of_plastering")}</Text>
        <RadioGroup defaultValue={typeOfPlastering} onToggle={setTypeOfPlastering}>
          <RadioButton label={t("cement")} value={"1"} />
          <RadioButton label={t("limestone")} value={"2"} />
        </RadioGroup>
        <Text>{t("plastering_condition")}</Text>
        <RadioGroup defaultValue={palsteringCondition} onToggle={setPlasteringCondition}>
          <RadioButton label={t("Good")} value={"1"} />
          <RadioButton label={t("average")} value={"2"} />
          <RadioButton label={t("Bad")} value={"3"} />
        </RadioGroup>
        <Text>{t("type_of_kehla")}</Text>
        <RadioGroup defaultValue={typeOfKehla} onToggle={setTypeOfKehla}>
          <RadioButton label={t("cement")} value={"1"} />
          <RadioButton label={t("limestone")} value={"2"} />
        </RadioGroup>
        <Text>{t("kehla_condition")}</Text>
        <RadioGroup defaultValue={kehlaCondition} onToggle={setKehlaCondition}>
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
        <RadioGroup defaultValue={bathroomCondition} onToggle={setBathroomCondition}>
          <RadioButton label={t("sanitary")} value={"1"} />
          <RadioButton label={t("unsanitary")} value={"2"} />
        </RadioGroup>
        <TextInput
          label={t("bathroom_notes")}
          value={bathroomNotes}
          setValue={setBathroomNotes}
        />
        <Text>{t("structural_issues")}</Text>
        <RadioGroup defaultValue={structuralIssues} onToggle={setStructuralIssues}>
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
        <TextInput label={t("leakage")} value={leakage} setValue={setLeakage} />
        <TextInput label={t("sewerage")} value={sewerage} setValue={setSewerage} />
        <TextInput
          label={t("WaterProblemsMentionedByTheBeneficiary")}
          value={WaterProblemsMentionedByTheBeneficiary}
          setValue={setWaterProblemsMentionedByTheBeneficiary}
        />
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
        {/*<TextInput label={t("lawsuits")} value={lawsuits} setValue={setLawsuits} />*/}
        <TextInput
          label={t("TheVisionOfTheBeneficiariesOfTheRequiredWork")}
          value={TheVisionOfTheBeneficiariesOfTheRequiredWork}
          setValue={setTheVisionOfTheBeneficiariesOfTheRequiredWork}
        />
        <TextInput
          label={t("recommendation")}
          value={recommendation}
          setValue={setRecommendation}
        />
        <Button
          onPress={async () => {
            const form = {
              ...pageOne,
              ...pageTwo,
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
              ConstructionProblems: 1,
              DamagedGroundType: 1,
              SubscriberServiceID: pageOne.SubscriberServiceID,
              TheVisionOfTheBeneficiariesOfTheRequiredWork,
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
              WaterProblemsMentionedByTheBeneficiary,
              EffectsOfLeakageOrImminentDamageToTheNetwork: leakage,
              SanitationProblemsMentionedByTheBeneficiary: sewerage,
              ElectricityProblemsMentionedByTheBeneficiary: electricity,
              InternalAndExternalExtensions: Extensions,
              GeneralCaseOfTheBuilding: generalCondition,
              AdditionalIssuesAndNotes: specificIssues,
              ConclusionAndRecommendations: recommendation
            };

            let orders = []
            await retrieveItem("Orders").then(res => {
              orders = res || [];
            })

            const currentOrderIndex = orders.findIndex(item => item.SubscriberServiceID === pageOne.SubscriberServiceID);

            const newOrder = {
              ...order,
              SubscriberServiceID: pageOne.SubscriberServiceID,
              userId: userToken,
              EvaluationForm: form,
              Location: pageOne.Location
            };

            const tempOrders = orders;
            tempOrders[currentOrderIndex] = newOrder;
            await storeItem("Orders", tempOrders);
            navigation.goBack();
            navigation.goBack();
            /*            applicationsAPI.AddApplicationForm(
              pageOne.SubscriberServiceID,
              userToken,
              form,
              pageOne.RoleId,
              pageOne.Location,
              []
            );*/
/*
            navigation.goBack();
*/
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
