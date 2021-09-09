import React, { useEffect } from "react";
import { View } from "react-native";

import { useDispatch } from "react-redux";

import axiosInstance from "~/apiServices/axiosService";
// import { deleteItem } from "../services/deviceStorage";
import {
  UNAUTHENTICATION_ERROR,
  BAD_GATEWAY_ERROR,
  SERVICE_UNAVAILABLE_ERROR
} from "~/constants/errorCodes";
import { setMaintenanceMode } from "~/redux/reducers/auth.reducer";
import { generalErrorHandler } from "~/utils/errorHandler";

const AxiosInterceptor = (): JSX.Element => {
  const dispatch = useDispatch();
  // Dispatch<MaintenanceAction | SettingsAction>
  const signOut = async () => {
    try {
      //   await deleteItem("loginBy");
      //   await deleteItem("id_token");
      //   authContext.signOut();
    } catch (error) {
      generalErrorHandler(error);
    }
  };

  useEffect(() => {
    const initiateInterceptor = () => {
      axiosInstance.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          // Your Interceptor code to do something with response error
          // case 401 then unauthorized so basically logout
          if (error.response && error.response.status === UNAUTHENTICATION_ERROR) {
            // return signOut();
          }
          if (error.response && error.response.status === BAD_GATEWAY_ERROR) {
            // dispatch(setMaintenanceMode({ isUnderMaintainance: true }));
          }
          if (error.response && error.response.status === SERVICE_UNAVAILABLE_ERROR) {
            // dispatch(setMaintenanceMode({ isUnderMaintainance: true }));
          }
          // Return error
          return Promise.reject(error);
        }
      );
    };
    initiateInterceptor();
  }, []);

  return <View />;
};

export default AxiosInterceptor;
