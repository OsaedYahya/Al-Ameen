import { PermissionsAndroid, Platform } from "react-native";

import Geolocation, { GeoPosition } from "react-native-geolocation-service";

const getLocation = (
  callback: (pos: GeoPosition) => void,
  enableHighAccuracy = true,
  timeout = 15000,
  maximumAge = 10000
) => {
  Geolocation.getCurrentPosition(
    position => {
      callback(position);
    },
    err => {
      console.log(err);
    },
    { enableHighAccuracy, timeout, maximumAge }
  );
};

const requestLocationPermissions = () => {
  if (Platform.OS === "ios") return Geolocation.requestAuthorization("whenInUse");
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
};

const checkLocationPermissions = async () => {
  try {
    if (Platform.OS === "ios") {
      const status = await Geolocation.requestAuthorization("whenInUse");
      return status === "granted";
    }
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  } catch {
    return false;
  }
};

export { getLocation, requestLocationPermissions, checkLocationPermissions };
