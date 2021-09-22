/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from "react";

import NfcManager, { NfcEvents } from "react-native-nfc-manager";
import { NetworkProvider } from "react-native-offline";
import { Provider as ReduxProvider } from "react-redux";

import ProvidersContainer from "~/containers/providers/ProvidersContainer";
import store from "~/redux/store";

const App = (): JSX.Element => {

  return (
    <ReduxProvider store={store}>
      <NetworkProvider
        pingInterval={10000}
        pingInBackground
        httpMethod={"HEAD"}
        pingServerUrl={"https://www.google.com/"}
        shouldPing
      >
        <ProvidersContainer />
      </NetworkProvider>
    </ReduxProvider>
  );
};

export default App;
