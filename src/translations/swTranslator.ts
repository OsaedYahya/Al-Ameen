import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import TRANSLATIONS_AR from "./ar";
import TRANSLATIONS_EN from "./en";

import { DEFAULTS } from "~/constants/";
import { logError } from "~/utils/errorHandler";
import { getSystemLocale } from "~/utils/systemUtil";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULTS.APP_MAIN_LANGUAGE,
    resources: {
      ar: TRANSLATIONS_AR,
      en: TRANSLATIONS_EN
    },
    lng: getSystemLocale()
  })
  .catch(err => {
    logError(`error while initializing react-i18next ${err}`);
  });

const translate = (word: string | string[], options?: Record<string, number>): string => {
  return i18n.t(word, options);
};

export default i18n;
export { translate };
