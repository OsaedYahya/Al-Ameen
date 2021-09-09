import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import { NetworkConsumer } from "react-native-offline";
import { useSelector } from "react-redux";

import { RouterProps } from "./Router.types";

import {
  AppStack,
  OfflineStack,
  ForceUpdateStack,
  MaintenanceStack,
  AuthStack
} from "./";

import SplashScreen from "~/components/splashScreen";
import { FETCH_CACHE_TIME } from "~/constants/";
import { AxiosInterceptor } from "~/containers/";
import { RootState } from "~/redux/store";
import {
  initializeSentry,
  fetchAllRemoteConfig,
  setRemoteConfigSettings,
  setRemoteConfigDefaults
} from "~/services/";
import { compareVersions, logError } from "~/utils/";

const Router = ({ theme }: RouterProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isForceUpdate, setIsForceUpdate] = useState(false);

  const { isUnderMaintainance, userToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const initializeSafarway = async () => {
      try {
        await initializeSentry();
        await setRemoteConfigSettings({
          minimumFetchIntervalMillis: FETCH_CACHE_TIME
        });
        await setRemoteConfigDefaults({
          shouldForceCodePush: false
        });
        const allRemoteConfigValues = await fetchAllRemoteConfig();
        const { shouldForceCodePush, minimumForceUpdate } = allRemoteConfigValues || {};

        /** must be handled later */
        // if (shouldForceCodePush.asBoolean()) {
        // 	checkCodePush(false);
        // }

        const forceUpdateValStr = minimumForceUpdate.asString();

        const forceUpdatePlatforms = JSON.parse(forceUpdateValStr);
        const { version, build, enabled } = forceUpdatePlatforms[Platform.OS];
        if (!enabled) {
          return;
        }

        const validVersion = compareVersions(version, DeviceInfo.getVersion());
        const validBuildNumber = build > DeviceInfo.getBuildNumber();
        setIsForceUpdate(validVersion || validBuildNumber);
      } catch (error) {
        logError(error);
      } finally {
        /** setTimeout is for testing purposes must be removed future */
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    initializeSafarway();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AxiosInterceptor />
      {isLoading ? (
        <SplashScreen isLoading={isLoading} />
      ) : (
        <NetworkConsumer>
          {({ isConnected }) =>
            isConnected ? (
              isForceUpdate ? (
                <ForceUpdateStack />
              ) : isUnderMaintainance ? (
                <MaintenanceStack />
              ) : userToken ? (
                <AppStack />
              ) : (
                <AuthStack />
              )
            ) : (
              <OfflineStack />
            )
          }
        </NetworkConsumer>
      )}
    </NavigationContainer>
  );
};

export default Router;
