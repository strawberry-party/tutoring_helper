import DrawerContent from '../component/DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import Student from '../component/Tutor/Student';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../component/RootNavigation';
import store from '../common/store';

const Drawer = createDrawerNavigator();

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
  );
}