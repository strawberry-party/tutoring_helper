/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Body from './components/Tutor/Homework/Body';
import Homework from './components/Tutor/Homework/Homework';
import React from 'react';
import Root from './components/Root';

const App: () => React.ReactElement = () => {
  return (
    <View style={styles.container}>
      <Body/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 80,
  },
});

export default App;
