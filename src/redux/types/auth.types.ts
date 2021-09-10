export const SLICE_NAME = "auth";

export interface UserProfile {
  providerName: string;
  providerType: string;
  givenName: string;
  familyName: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
}

export interface AuthInterface {
  isLoading?: boolean;
  isSignout?: boolean;
  needsVerfication?: boolean;
  userToken?: string | null;
  refreshToken?: string | null;
  isUnderMaintainance?: boolean;
  isUnderForceUpgrade?: boolean;
  user: UserProfile | undefined;
  userID?: string;
}
