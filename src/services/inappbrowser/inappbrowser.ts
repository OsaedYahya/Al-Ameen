import { Linking, Platform } from "react-native";

import InAppBrowser from "react-native-inappbrowser-reborn";

import { DEFAULTS } from "~/constants/";
import { LightTheme } from "~/theme/";
import { logError } from "~/utils/";

const urlAuthOpener = async (url: string, redirectUrl: string): Promise<void> => {
  try {
    const isRebornInBrowserAvailable = await InAppBrowser.isAvailable();

    if (!isRebornInBrowserAvailable) {
      return Linking.openURL(url);
    }
    const openAuthRes = await InAppBrowser.openAuth(url, redirectUrl, {
      // iOS Properties
      dismissButtonStyle: "cancel",
      preferredBarTintColor: LightTheme.colors.primary,
      preferredControlTintColor: "white",
      // Android Properties
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      showInRecents: true
    });

    if (openAuthRes.type === "success" && !!openAuthRes.url) {
      const { url: newUrl } = openAuthRes;
      Linking.openURL(newUrl);
    }
  } catch (error) {
    logError(`inappbrowser-reborn urlAuthOpener error ${error}`);
  }
};

const getDeepLink = (path = ""): string => {
  const scheme = DEFAULTS.SCHEME;
  const prefix = Platform.OS === "android" ? `${scheme}://my-host/` : `${scheme}://`;
  return prefix + path;
};

export { urlAuthOpener, getDeepLink };
