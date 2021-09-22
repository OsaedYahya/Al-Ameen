import Config from "react-native-config";

import { showAlert } from "~/components/";
import { BAD_GATEWAY_ERROR, SERVICE_UNAVAILABLE_ERROR } from "~/constants/errorCodes";
import { i18n } from "~/translations/";

export const generalErrorHandler = (
  error: any,
  errorTitle: string = i18n.t("something_went_wrong"),
  errorMsg = `${i18n.t("please_try_again_or_contact")} ${Config.CONTACT_SUPPORT}`
): void => {
  if (
    error.response &&
    error.response.status !== BAD_GATEWAY_ERROR &&
    error.response.status !== SERVICE_UNAVAILABLE_ERROR
  ) {
    showAlert(errorTitle, errorMsg);
  }
};

export const logError = (error: string): void => {
};
