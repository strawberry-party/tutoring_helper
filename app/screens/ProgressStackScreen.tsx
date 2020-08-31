import { StyleSheet, Text } from 'react-native';
import CreateProgress from '../component/Tutor/Progress/CreateProgress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import WeeklyProgress from '../component/Tutor/Progress/WeeklyProgress';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'

const db = database();

const ProgressStack = createStackNavigator();

interface ProgressStackScreenProps {
  studentName: string;
  navigation: any;
}

function ProgressStackScreen({studentName, navigation}: ProgressStackScreenProps) {
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
          <Text style={styles.studentNameText}>{studentName + ' 학생'}</Text>
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
  return {
    studentName: state.currentStudentReducer.name,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressStackScreen)