/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

if (__DEV__) {
    import("./src/ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

AppRegistry.registerComponent(appName, () => App);
