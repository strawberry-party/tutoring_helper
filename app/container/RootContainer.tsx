import { connect, useSelector } from 'react-redux';
import DrawerContent from '../component/DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { RootState } from '../states';
import { StudentType } from '../types/root';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../component/RootNavigation';
import database from '@react-native-firebase/database'
import _ from 'lodash';

const db = database();
const Drawer = createDrawerNavigator();
const databaseToStore = (database) => {
  
}

function RootContainer({studentState, studentMap, isFocus, lessonMap}) {
  
  const drawerItem = Array();
  studentMap.forEach((value, key) => {
    drawerItem.push(
    <Drawer.Screen
      key={key}
      name={value.name + ' 학생'}
      component={Tabs}
      initialParams={{studentId: key}}
      listeners={{
        focus: () => {
          isFocus('STUDENT_CHANGE', key)
        },
      }}
    />)
  });
  // console.log(studentState);
  // console.log([...lessonMap]);
  
  
  useEffect(() => {
      // var dbData;
      // db.ref('tutor_1/studentMap').once('value', snapshot => {
      //   dbData = snapshot.val()
      //   console.log(dbData)
      // })
    })
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="김태형 학생"
        drawerContent={props => <DrawerContent {...props} />}>
        {drawerItem}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    studentState: state.lessonReducer,
    studentMap: state.lessonReducer.studentMap,
    lessonMap: state.lessonReducer.studentMap.get('student_1').lessonMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    isFocus: (type, studentId) => {
      dispatch({type, studentId})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
