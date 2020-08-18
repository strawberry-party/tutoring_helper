import { connect, useSelector } from 'react-redux';

import DrawerContent from '../component/DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootState } from '../states';
import { StudentType } from '../types/root';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../component/RootNavigation';

const Drawer = createDrawerNavigator();

function RootContainer(props) {
  const selectedStudent: StudentType = useSelector((state: RootState) => {
    // console.warn(
    //   state.lessonReducer.studentMap.get(state.tutorReducer.selectedStudentId)
    //     .name,
    // );

    return state.lessonReducer.studentMap.get(
      state.tutorReducer.selectedStudentId,
    );
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="김태형 학생"
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          key={selectedStudent.name}
          name={selectedStudent.name + ' 학생'}>
          {(props) => <Tabs student={selectedStudent} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    studentMap: state.lessonReducer.studentMap,
    selectedStudentId: state.tutorReducer.selectedStudentId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
