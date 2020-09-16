import { connect } from 'react-redux';
import DrawerContent from './DrawerContent';
import React, { useEffect, useState } from 'react';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StudentType } from '../types/student';
import CreateStudentScreen from '../screens/CreateStudentScreen';
import database from '@react-native-firebase/database';
import UpdateStudent from '../component/UpdateStudent';
import UpdateTutorInfo from '../component/Tutor/UpdateTutorInfo';

const db = database();
const Drawer = createDrawerNavigator();

interface DrawerScreenProps {
  studentArray: Array<StudentType>;
  changeStudent: Function;
  dataToTutorState: Function;
  dataToTagState: Function;
  dataToBookState: Function;
  userId: string;
}

interface User {
  email?: string;
  name?: string;
  studentNum?: number;
  studentArray?: Array<StudentType>
  subjectTagArray?: object;
  bookTagArray?: object;
}

function DrawerNavigator({
  studentArray,
  changeStudent,
  dataToTutorState,
  dataToTagState,
  dataToBookState,
  userId,
}: DrawerScreenProps) {
  useEffect(() => {
    db.ref('tutors').on(`value`, (snapshot) => {
      var userData;
      var subjectTags;
      var bookTags;

      Object.entries(snapshot.val()).forEach(([key, b]) => {
        const user: User = b;
        if (key === userId) {
          userData = {
            uid: key,
            name: user.name,
            studentNum: user.studentNum,
            studentArray: user.studentArray,
          };
          subjectTags = user.subjectTagArray;
          bookTags = user.bookTagArray;
        }
      });
      dataToTutorState('TUTORSTATE_SETUP', userData);
      dataToTagState('TAG_SETUP', subjectTags, bookTags);
    });
    database().ref('books').on('value', snapshot => {
      dataToBookState('BOOK_SETUP', snapshot.val())
    })
  }, []);

  const initialDrawerScreen = [
    <Drawer.Screen
      key="학생추가"
      name="학생추가"
      component={CreateStudentScreen}
      options={{
        drawerLabel: () => null,
      }}
    />,
    <Drawer.Screen
      key="학생정보 수정"
      name="학생정보 수정"
      component={UpdateStudent}
      options={{
        drawerLabel: () => null,
      }}
    />,
    <Drawer.Screen
      key="선생님정보 수정"
      name="선생님정보 수정"
      component={UpdateTutorInfo}
      options={{
        drawerLabel: () => null,
      }}
    />
  ]
  var drawerScreens = [];
  studentArray.forEach((student) => {
    drawerScreens.push(
      <Drawer.Screen
        key={student.key}
        name={student.key}
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
      <Drawer.Screen
        key={student.key+ "_U"}
        name={student.key+ "_U"}
        component={UpdateStudent}
        initialParams={{key: student.key}}
        options={{
          drawerLabel: () => null,
        }}
      />
    );
  });

  drawerScreens = [...drawerScreens, initialDrawerScreen];
  
  return (
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
    dataToTagState: (type, subjectTags, bookTags) => {
      dispatch({ type, subjectTags, bookTags });
    },
    dataToBookState: (type, books) => {
      dispatch({ type, books })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
