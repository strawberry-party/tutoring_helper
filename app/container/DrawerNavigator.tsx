import { connect } from 'react-redux';
import DrawerContent from './DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../common/RootNavigation';
import initialScreen from '../component/initialScreen';
import { StudentType } from '../types/student';
import database from '@react-native-firebase/database'
import CreateStudent from '../component/CreateStudent';

const db = database();
const Drawer = createDrawerNavigator();

interface DrawerScreenProps {
  studentArray: Array<StudentType>;
  changeStudent: Function;
  dataToTutorState: Function;
}

function DrawerNavigator({studentArray, changeStudent, dataToTutorState}: DrawerScreenProps) {

  useEffect(() => {
    db.ref('tutor_1').on('value', snapshot => {
      // console.log('db changed');
      dataToTutorState('TUTORSTATE_SETUP', snapshot.val());
    })
  }, [])
  const drawerItem = [<Drawer.Screen key='학생추가' name='학생추가' component={CreateStudent}/>];

  studentArray.map((student) => {
    
    drawerItem.push(
    <Drawer.Screen
      key={student.key}
      name={student.info.name + ' 학생'}
      component={Tabs}
      listeners={{
        focus: () => {
          console.log('focused: ', student.info.name);
          changeStudent('STUDENT_CHANGE', student.key)
          // dataToLessonState('LESSONSTATE_SETUP', student.info.lessonArray)
        },
      }}
    />
    )
  });
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="김태형 학생"
        drawerContent={props => <DrawerContent {...props} />}>
        {drawerItem.length === 0 ? <Drawer.Screen key='initial' name='학생추가' component={initialScreen} /> : drawerItem}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    studentArray: state.tutorReducer.studentArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    dataToTutorState: (type, data) => {
      dispatch({type, data});
    },
    changeStudent: (type, studentId) => {
      dispatch({type, studentId})
    },
    // dataToLessonState: (type, data) => {
    //   dispatch({type, data})
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
