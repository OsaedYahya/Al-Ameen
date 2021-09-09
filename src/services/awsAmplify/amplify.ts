import { Amplify } from "aws-amplify";
import Config from "react-native-config";

import { urlAuthOpener } from "~/services/";

const configureAmplify = () => {
  const oauth = {
    domain: Config.COGNITO_LOGIN,
    scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: "safarway://",
    redirectSignOut: "safarway://",
    responseType: "code",
    urlOpener: urlAuthOpener
  };
  Amplify.configure({
    Auth: {
      identityPoolId: Config.COGNITO_IDENTITYPOOL_ID,
      region: Config.COGNITO_REGION,
      userPoolId: Config.COGNITO_USERPOOL_ID,
      userPoolWebClientId: Config.COGNITO_USERPOOL_WEBCLIENT_ID,
      oauth
    },
    Storage: {
      AWSS3: {
        bucket: Config.AWSS3_STORAGE_BUCKET,
        region: Config.COGNITO_REGION
      }
    }
  });
};

export { configureAmplify };
