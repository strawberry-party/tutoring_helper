import { StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StudentInfoType } from '../types/student';
import { createStackNavigator } from '@react-navigation/stack';
import headerOptions from '../component/headerOptions';
import { connect } from 'react-redux';
import Main from '../component/Tutor/Main';

const MainStack = createStackNavigator();

interface MainStackProps {
  currentStudentInfo: StudentInfoType;
  navigation: any;
}

function MainStackScreen({currentStudentInfo, navigation}: MainStackProps) {
  
  return (
    <MainStack.Navigator initialRouteName="메인">
      <MainStack.Screen
        name="메인"
        component={Main}
        options={{
          ...headerOptions,
          title: '메인',
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
      />
    </MainStack.Navigator>
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
  const currentStudentId = state.currentStudentReducer.selectedStudentId;
  const studentArray = state.tutorReducer.studentArray;
  return {
    currentStudentInfo: studentArray.filter(student => student.key === currentStudentId)[0].info,
  }
  
}, null)(MainStackScreen);
