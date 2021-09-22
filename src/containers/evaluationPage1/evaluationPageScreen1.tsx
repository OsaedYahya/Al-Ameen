import React, { RefObject, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";

import { Button } from "react-native-paper";

import TextInput from "~/components/TextInput/TextInput";

const EvaluationPageScreen1 = () => {
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
  );
};

export default EvaluationPageScreen1;
