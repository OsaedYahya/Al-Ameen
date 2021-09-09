import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { ICredentials } from "@aws-amplify/core";
import {
  CognitoUser,
  ISignUpResult,
  CognitoUserSession
} from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

import { logError } from "~/utils/";

const signIn = async (
  username: string,
  password: string
): Promise<CognitoUser | undefined> => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    logError(`error AWS amplify signing in ${error}`);
  }
};

const signOut = async (): Promise<void> => {
  try {
    await Auth.signOut();
  } catch (error) {
    logError(`error AWS amplify signOut ${error}`);
  }
};

const authenticateCurrentUser = async (): Promise<CognitoUser | undefined> => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (error) {
    logError(`error AWS amplify signing in ${error}`);
  }
};

const federatedSignIn = async (
  provider: CognitoHostedUIIdentityProvider
): Promise<ICredentials | undefined> => {
  try {
    const user = await Auth.federatedSignIn({ provider });
    console.log("federatedSignIn user ", user);
    return user;
  } catch (error) {
    logError(`error AWS amplify signing in ${error}`);
  }
};

const signUp: (
  firstName: string,
  lastName: string,
  mobile: string,
  password: string
) => Promise<ISignUpResult | undefined> = async (
  firstName,
  lastName,
  mobile,
  password
) => {
  try {
    return await Auth.signUp({
      username: mobile,
      password,
      attributes: {
        phone_number: mobile,
        given_name: firstName,
        family_name: lastName
      }
    });
  } catch (error) {
    logError(`error AWS amplify signUp  ${error}`);
  }
};

const changePassword = (
  user: CognitoUser | any,
  oldPassword: string,
  newPassword: string
): Promise<"SUCCESS"> | undefined => {
  try {
    return Auth.changePassword(user, oldPassword, newPassword);
  } catch (error) {
    logError(`error AWS amplify changePassword  ${error}`);
  }
};

const forgetPassword = (username: string): Promise<any> | undefined => {
  try {
    return Auth.forgotPassword(username);
  } catch (error) {
    logError(`error AWS amplify forgetPassword  ${error}`);
  }
};
/** This method will automatically refresh the accessToken and idToken if tokens are expired and a valid refreshToken presented.
 *  So you can use this method to refresh the session if needed. */
const refreshToken = (): Promise<CognitoUserSession> | undefined => {
  try {
    return Auth.currentSession();
  } catch (error) {
    logError(`error AWS amplify refreshToken  ${error}`);
  }
};

export {
  signIn,
  signOut,
  signUp,
  authenticateCurrentUser,
  federatedSignIn,
  changePassword,
  forgetPassword,
  refreshToken
};
