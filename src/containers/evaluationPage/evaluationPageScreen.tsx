import React, { RefObject, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";
import PagerView from "react-native-pager-view";
import { Button } from "react-native-paper";

import TextInput from "~/components/TextInput/TextInput";

const EvaluationPageScreen = () => {
  const [nameOfPropertyOwner, setNameOfPropertyOwner] = useState("");
  const [usage, setUsage] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [generalInfo, setGeneralInfo] = useState("");
  const [providerAge, setProviderAge] = useState("");
  const [providerGender, setProviderGender] = useState("");
  const [providerEducation, setProviderEducation] = useState("");
  const [houseSize, setHouseSize] = useState("");
  const [providerJob, setProviderJob] = useState("");
  const [providerIncome, setProviderIncome] = useState("");
  const [anotherIncome, setAnotherIncome] = useState("");
  const [location, setLocation] = useState("");
  const [sensitive, setSensitive] = useState("");
  const [insensitive, setInsensitive] = useState("");
  const [benefactors, setBenefactors] = useState("");
  const [residentsAbove18, setResidentsAbove18] = useState("");
  const [residentsUnder18, setResidentsUnder18] = useState("");
  const [residentsWithSpecialNeeds, setResidentsWithSpecialNeeds] = useState("");
  const [benefactorsForJob, setBenefactorsForJob] = useState("");
  const [houseWasRenovated, setHouseWasRenovated] = useState("");
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
  const [condition, setCondition] = useState("");
  const [average, setAverage] = useState("");
  const [bad, setBad] = useState("");
  const [typeOfPlastering, setTypeOfPlastering] = useState("");
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
  const pageView = useRef<any>();
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
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={(Platform.OS === "ios" ? 1 : 1) * (headerHeight + 80)} // adjust the value here if you need more padding
        key="1"
        contentContainerStyle={{
          flex: 1
        }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView keyboardShouldPersistTaps={"never"} style={{ flex: 1 }}>
          <TextInput
            label={t("name_of_property_owner")}
            value={nameOfPropertyOwner}
            setValue={setNameOfPropertyOwner}
          />
          <TextInput label={t("usage")} value={usage} setValue={setUsage} />
          <TextInput label={t("address")} value={address} setValue={setAddress} />
          <TextInput label={t("mobile_no")} value={mobileNo} setValue={setMobileNo} />
          <TextInput
            label={t("general_info")}
            value={generalInfo}
            setValue={setGeneralInfo}
          />
          <TextInput
            label={t("provider_age")}
            value={providerAge}
            setValue={setProviderAge}
          />
          <TextInput
            label={t("provider_gender")}
            value={providerGender}
            setValue={setProviderGender}
          />
          <TextInput
            label={t("provider_education")}
            value={providerEducation}
            setValue={setProviderEducation}
          />
          <TextInput label={t("house_size")} value={houseSize} setValue={setHouseSize} />
          <TextInput
            label={t("provider_job")}
            value={providerJob}
            setValue={setProviderJob}
          />
          <TextInput
            label={t("provider_income")}
            value={providerIncome}
            setValue={setProviderIncome}
          />
          <Button
            onPress={() => pageView.current?.setPageWithoutAnimation(1)}
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
      <KeyboardAvoidingView
        keyboardVerticalOffset={(Platform.OS === "ios" ? 1 : 1) * (headerHeight + 80)} // adjust the value here if you need more padding
        key="2"
        contentContainerStyle={{
          flex: 1
        }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView keyboardShouldPersistTaps={"never"} style={{ flex: 1 }}>
          <TextInput
            label={t("another_income")}
            value={anotherIncome}
            setValue={setAnotherIncome}
          />
          <TextInput label={t("location")} value={location} setValue={setLocation} />
          <TextInput label={t("sensitive")} value={sensitive} setValue={setSensitive} />
          <TextInput
            label={t("insensitive")}
            value={insensitive}
            setValue={setInsensitive}
          />
          <TextInput
            label={t("benefactors")}
            value={benefactors}
            setValue={setBenefactors}
          />
          <TextInput
            label={t("residents_above_18")}
            value={residentsAbove18}
            setValue={setResidentsAbove18}
          />
          <TextInput
            label={t("residents_under_18")}
            value={residentsUnder18}
            setValue={setResidentsUnder18}
          />
          <TextInput
            label={t("residents_with_special_needs")}
            value={residentsWithSpecialNeeds}
            setValue={setResidentsWithSpecialNeeds}
          />
          <TextInput
            label={t("benefactors_for_job")}
            value={benefactorsForJob}
            setValue={setBenefactorsForJob}
          />
          <TextInput
            label={t("house_was_renovated")}
            value={houseWasRenovated}
            setValue={setHouseWasRenovated}
          />
          <TextInput
            label={t("house_was_renovated_in")}
            value={houseWasRenovatedIn}
            setValue={setHouseWasRenovatedIn}
          />
          <TextInput label={t("house_age")} value={houseAge} setValue={setHouseAge} />
          <Button
            onPress={() => pageView.current?.setPageWithoutAnimation(0)}
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
{/*
      <KeyboardAvoidingView
        keyboardVerticalOffset={(Platform.OS === "ios" ? 1 : 1) * (headerHeight + 80)} // adjust the value here if you need more padding
        key="3"
        contentContainerStyle={{
          flex: 1
        }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView keyboardShouldPersistTaps={"never"} style={{ flex: 1 }}>
          <TextInput
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
          <TextInput label={t("dilf")} value={dilf} setValue={setDilf} />
          <TextInput label={t("dilf_notes")} value={dilfNotes} setValue={setDilfNotes} />
          <TextInput label={t("humidity")} value={humidity} setValue={setHumidity} />
          <TextInput
            label={t("humidity_notes")}
            value={humidityNotes}
            setValue={setHumidityNotes}
          />
          <TextInput
            label={t("sanitary_extensions")}
            value={sanitaryExtensions}
            setValue={setSanitaryExtensions}
          />
          <TextInput
            label={t("sanitary_extensions_notes")}
            value={sanitaryExtensionsNotes}
            setValue={setSanitaryExtensionsNotes}
          />
          <TextInput
            label={t("faulty_floor_type")}
            value={faultyFloorType}
            setValue={setFaultyFloorType}
          />
          <TextInput label={t("condition")} value={condition} setValue={setCondition} />
          <TextInput label={t("average")} value={average} setValue={setAverage} />
          <TextInput label={t("bad")} value={bad} setValue={setBad} />
          <TextInput
            label={t("type_of_plastering")}
            value={typeOfPlastering}
            setValue={setTypeOfPlastering}
          />
          <TextInput
            label={t("type_of_kehla")}
            value={typeOfKehla}
            setValue={setTypeOfKehla}
          />
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
          <TextInput
            label={t("bathroom_condition")}
            value={bathroomCondition}
            setValue={setBathroomCondition}
          />
          <TextInput label={t("sanitary")} value={sanitary} setValue={setSanitary} />
          <TextInput
            label={t("unsanitary")}
            value={unsanitary}
            setValue={setUnsanitary}
          />
          <TextInput
            label={t("bathroom_notes")}
            value={bathroomNotes}
            setValue={setBathroomNotes}
          />
          <TextInput
            label={t("structural_issues")}
            value={structuralIssues}
            setValue={setStructuralIssues}
          />
          <TextInput
            label={t("describe_issues")}
            value={describeIssues}
            setValue={setDescribeIssues}
          />
          <TextInput
            label={t("infrastructure")}
            value={infrastructure}
            setValue={setInfrastructure}
          />
          <TextInput label={t("water")} value={water} setValue={setWater} />
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
          <TextInput label={t("leakage")} value={leakage} setValue={setLeakage} />
          <TextInput
            label={t("extensions")}
            value={Extensions}
            setValue={setExtensions}
          />
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
        </ScrollView>
      </KeyboardAvoidingView>
*/}
    </PagerView>
  );
};

export default EvaluationPageScreen;
