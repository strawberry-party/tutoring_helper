import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Student from '../component/Tutor/Student';
import { navigationRef } from '../component/RootNavigation';
import store from '../common/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../component/DrawerContent';

const Drawer = createDrawerNavigator();
const drawerOptions = {
  activeTintColor: '#e91e63'
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator initialRouteName="김태형 학생" drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="김태형 학생" component={Student} />
          <Drawer.Screen name="최상아 학생" component={Student} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  ); // TODO: 리팩토링할 때 TutoringHelper 내용물 Tutor/Homework로 다 옮기기
}
