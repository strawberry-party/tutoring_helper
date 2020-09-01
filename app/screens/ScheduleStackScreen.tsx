import { HeaderBackButton, createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';

import DetailInfo from '../component/Schedule/DetailInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Schedule from '../component/Schedule/Schedule';
import { StudentInfoType } from '../types/student';
import { connect } from 'react-redux';
import headerOptions from '../component/headerOptions'

const ScheduleStack = createStackNavigator();

interface ScheduleStackProps {
  currentStudentInfo: StudentInfoType;
  navigation: any;
}

const ScheduleStackScreen = ({currentStudentInfo, navigation}: ScheduleStackProps) => {
  return (
    <ScheduleStack.Navigator initialRouteName='일정관리'>
      <ScheduleStack.Screen
        name='일정관리'
        component={Schedule}
        options={{
          ...headerOptions, title: '일정관리',
          headerLeft: () => (
            <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => {
              navigation.openDrawer()
            }} />
          ),
          headerRight: () => (
            <Text style={styles.studentNameText}>{currentStudentInfo.name + ' 학생'}</Text>
          )
        }}
      />
      <ScheduleStack.Screen
        name='상세정보'
        component={DetailInfo}
        options={{
          ...headerOptions, title: '상세정보',
          headerLeft: () => (
            <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => {
              navigation.openDrawer()
            }} />
          ),
          headerRight: () => (
            <HeaderBackButton tintColor='white' onPress={() => {
              navigation.navigate('일정관리')
            }} />
          )
        }}
      />
    </ScheduleStack.Navigator>
  );
}
const styles = StyleSheet.create({
  studentNameText: {
    paddingRight: 20,
    color: 'white',
    fontSize: 20,
    // fontWeight: 'bold',
  }
})

export default connect((state) => {
  const currentStudentId = state.currentStudentReducer.selectedStudentId;
  const studentArray = state.tutorReducer.studentArray;
  return {
    currentStudentInfo: studentArray.filter(student => student.key === currentStudentId)[0].info,
  }
}, null)(ScheduleStackScreen);