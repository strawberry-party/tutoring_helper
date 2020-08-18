import React from 'react';
import DrawerContent from '../component/DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../component/RootNavigation';

const Drawer = createDrawerNavigator();

function RootContainer(props) {
  const students = props.students;
  const drawerItem = students.map((student) => (
    <Drawer.Screen
      key={student.name}
      name={student.name + ' 학생'}
      component={Tabs}
      initialParams={student}
    />
  ));
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="김태형 학생"
        drawerContent={(props) => <DrawerContent {...props} />}>
        {drawerItem}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default connect(function (state) {
  return {
    students: state.studentReducer.studentArray,
  };
}, null)(RootContainer);
