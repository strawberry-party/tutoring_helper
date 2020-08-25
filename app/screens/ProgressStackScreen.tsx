import { StyleSheet, Text } from 'react-native';
import CreateProgress from '../component/Tutor/Progress/CreateProgress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StudentInfoType } from '../types/student';
import WeeklyProgress from '../component/Tutor/Progress/WeeklyProgress';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'

const db = database();

const ProgressStack = createStackNavigator();

interface ProgressStackScreenProps {
  currentStudentInfo: StudentInfoType;
  navigation: any;
}

function ProgressStackScreen({currentStudentInfo, navigation}: ProgressStackScreenProps) {
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
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => (
          <Text style={styles.studentNameText}>{currentStudentInfo.name + ' 학생'}</Text>
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

const mapStateToProps = (state) => {
  const currentStudentId = state.currentStudentReducer.selectedStudentId;
  const studentArray = state.tutorReducer.studentArray;
  return {
    currentStudentInfo: studentArray.filter(student => student.key === currentStudentId)[0].info,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressStackScreen)