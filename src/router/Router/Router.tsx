import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import RNBootSplash from "react-native-bootsplash";
import DeviceInfo from "react-native-device-info";
import { NetworkConsumer } from "react-native-offline";
import { useDispatch, useSelector } from "react-redux";

import { RouterProps } from "./Router.types";

import {
  AppStack,
  OfflineStack,
  ForceUpdateStack,
  MaintenanceStack,
  AuthStack
} from "./";

import SplashScreen from "~/components/splashScreen";
import { FETCH_CACHE_TIME, USER_ID } from "~/constants/";
import { AxiosInterceptor } from "~/containers/";
import { setUser } from "~/redux/reducers/auth.reducer";
import { RootState } from "~/redux/store";
import {
  fetchAllRemoteConfig,
  setRemoteConfigSettings,
  setRemoteConfigDefaults,
  retrieveItem
} from "~/services/";
import { compareVersions, logError } from "~/utils/";

const Router = ({ theme }: RouterProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setID] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeSafarway = async () => {
      try {
        const x = await retrieveItem(USER_ID);
        setID(x);
        dispatch(
          setUser({
            userToken: x
          })
        );
        RNBootSplash.hide({ fade: true });
        setIsLoading(false);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {isLoading ? (
          <SplashScreen isLoading={isLoading} />
        ) : <AuthStack initial={!id && "Login"} />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Router;
