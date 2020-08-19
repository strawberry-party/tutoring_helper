import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import HomeworkContainer from '../../container/Homework';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStackScreen from './MainStackScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressStackScreen from './Progress/ProgressStackScreen';
import React from 'react';
import ScheduleStackScreen from './Schedule/ScheduleStackScreen';
import { StudentType } from '../../types/root';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

interface TabProps {
  student: StudentType;
}
function Tabs({ student }: TabProps) {
  return (
    <Tab.Navigator
      initialRouteName="메인"
      tabBarOptions={{ activeTintColor: '#e91e63' }}>
      <Tab.Screen key={'메인'} name={'메인'} options={mainOptions}>
        {(props) => <MainStackScreen student={student} {...props} />}
      </Tab.Screen>

      <Tab.Screen key={'일정'} name={'일정'} options={calendarOptions}>
        {(props) => <ScheduleStackScreen student={student} {...props} />}
      </Tab.Screen>

      <Tab.Screen key={'진도'} name={'진도'} options={progressOptions}>
        {(props) => <ProgressStackScreen student={student} {...props} />}
      </Tab.Screen>

      <Tab.Screen key={'과제'} name={'과제'} options={assignOptions}>
        {(props) => <HomeworkContainer student={student} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default Tabs;

const mainOptions = {
  tabBarLabel: '메인',
  tabBarIcon: ({ color, size }) => (
    <Ionicons name="person" color={color} size={size} />
  ),
};

const calendarOptions = {
  tabBarLabel: '일정',
  tabBarIcon: ({ color, size }) => (
    <Foundation name="calendar" color={color} size={size} />
  ),
};

const progressOptions = {
  tabBarLabel: '진도',
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="progress-check" color={color} size={size} />
  ),
};

const assignOptions = {
  tabBarLabel: '과제',
  tabBarIcon: ({ color, size }) => (
    <FontAwesome name="book" color={color} size={size} />
  ),
};