import { connect } from 'react-redux';
import DrawerContent from './DrawerContent';
import React, { useEffect } from 'react';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StudentType } from '../types/student';
import CreateStudentScreen from '../screens/CreateStudentScreen';
import database from '@react-native-firebase/database';
import InitialScreen from '../screens/InitialScreen';

const db = database();
const Drawer = createDrawerNavigator();

interface DrawerScreenProps {
  studentArray: Array<StudentType>;
  changeStudent: Function;
  dataToTutorState: Function;
  dataToTagState: Function;
}

function DrawerNavigator({
  studentArray,
  changeStudent,
  dataToTutorState,
  dataToTagState,
}: DrawerScreenProps) {
  useEffect(() => {

    db.ref(`tutor_1`).on('value', (snapshot) => {
      // console.log('db changed');
      // console.log(snapshot.val());
      dataToTutorState('TUTORSTATE_SETUP', snapshot.val());
      dataToTagState('TAG_SETUP', snapshot.val().tagArray);
    });
  }, []);
  const initialDrawerScreen = (
    <Drawer.Screen
      key="학생추가"
      name="학생추가"
      component={CreateStudentScreen}
      options={{
        drawerLabel: () => null,
      }}
    />
  );
  var drawerScreens = [];
  studentArray.map((student) => {
    drawerScreens.push(
      <Drawer.Screen
        key={student.key}
        name={student.info.name + ' 학생'}
        component={Tabs}
        listeners={{
          focus: () => {
            console.log('focused: ', student.info.name);
            changeStudent('STUDENT_CHANGE', {
              ...student.info,
              id: student.key,
            });
          },
        }}
      />,
    );
  });

  drawerScreens = [...drawerScreens, initialDrawerScreen];

  return drawerScreens.length === 1 ? (
    <InitialScreen />
  ) : (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#2e0613',
        activeBackgroundColor: '#f6a5c0',
      }}>
      {drawerScreens}
    </Drawer.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    studentArray: state.tutorReducer.studentArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataToTutorState: (type, data) => {
      dispatch({ type, data });
    },
    changeStudent: (type, info) => {
      dispatch({ type, info });
    },
    dataToTagState: (type, tags) => {
      dispatch({ type, tags });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
