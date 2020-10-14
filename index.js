/**
 * @format
 */

import 'react-native-gesture-handler';

import { AppRegistry, Text } from 'react-native';

import App from './app/container/App';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { name as tutoringHelper } from './app.json';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(tutoringHelper, () => Main);
