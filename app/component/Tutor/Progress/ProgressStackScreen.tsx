import { StyleSheet, Text } from 'react-native';

import CreateProgress from './CreateProgress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StudentType } from '../../../types/root';
import WeeklyProgress from './WeeklyProgress';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

const ProgressStack = createStackNavigator();

// interface ProgressStackScreenProps {
//   student: StudentType;
//   navigation: any;
// }

function ProgressStackScreen(props) {
  const student = props.currentStudent;
  return (
    <ProgressStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <Ionicons.Button
            name="menu"
            size={35}
            backgroundColor="#e91e63"
            onPress={() => {
              props.navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => (
          <Text style={styles.studentNameText}>{student.name + ' 학생'}</Text>
        ),
      }}
      initialRouteName="진도관리">
      <ProgressStack.Screen name="진도관리" component={WeeklyProgress} />
      <ProgressStack.Screen name="진도추가" component={CreateProgress} />
    </ProgressStack.Navigator>
  );
}

const styles = StyleSheet.create({
  studentNameText: {
    paddingRight: 20,
    color: 'white',
    fontSize: 20,
  },
});

export default connect((state) => {
  const currentStudentId = state.tutorReducer.selectedStudentId;
  const studentMap = state.lessonReducer.studentMap;
  return {
    currentStudent: studentMap.get(currentStudentId)
  } 
}, null)(ProgressStackScreen);