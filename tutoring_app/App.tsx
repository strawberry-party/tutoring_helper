/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Root from './components/Root';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Student from './components/Tutor/Student';
import { navigationRef } from './components/RootNavigation';
import Tutor from './components/Tutor/Tutor';
import DetailInfo from './components/Tutor/Schedule/DetailInfo';

type RootStackParamList = {
  Tutor: undefined;
  Root: undefined;
  Student: undefined;
  DetailInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: () => React.ReactElement = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Tutor">
        <Stack.Screen name="Tutor" component={Tutor} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="DetailInfo" component={DetailInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
