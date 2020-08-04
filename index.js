/**
 * @format
 */

import 'react-native-gesture-handler';

import App from './app/container/App';
import { AppRegistry } from 'react-native';
import { name as tutoringHelper } from './app.json';

AppRegistry.registerComponent(tutoringHelper, () => App);
