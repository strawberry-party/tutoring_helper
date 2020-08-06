import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Student from '../component/Tutor/Student';
import Tutor from '../component/Tutor/Tutor';
import TutoringHelper from './TutoringHelper';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../component/RootNavigation';
import store from '../common/store';

// import DetailInfo from '../component/Tutor/Schedule/DetailInfo';

type RootStackParamList = {
  Tutor: undefined;
  Root: undefined;
  Student: undefined;
  DetailInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Tutor">
          <Stack.Screen name="Tutor" component={Tutor} />
          <Stack.Screen name="Student" component={Student} />
          {/* <Stack.Screen name="DetailInfo" component={DetailInfo} /> */}
        </Stack.Navigator>
      </NavigationContainer>

      {/* <TutoringHelper /> */}
    </Provider>
  ); // TODO: 리팩토링할 때 TutoringHelper 내용물 Tutor/Homework로 다 옮기기
}
