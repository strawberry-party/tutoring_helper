import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStackScreen from '../../screens/MainStackScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressStackScreen from '../../screens/ProgressStackScreen';
import React from 'react';
import { connect } from 'react-redux';
import ScheduleStackScreen from '../../screens/ScheduleStackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeworkStackScreen from '../../screens/HomeworkStackScreen';

const Tab = createBottomTabNavigator();

function Tabs() {

  return (
    <Tab.Navigator
      initialRouteName="메인"
      tabBarOptions={{ activeTintColor: '#e91e63' }}>
      <Tab.Screen
        key={'메인'}
        name={'메인'}
        options={mainOptions}
        component={MainStackScreen}
      />
      <Tab.Screen
        key={'일정'}
        name={'일정'}
        options={calendarOptions}
        component={ScheduleStackScreen}
      />
      <Tab.Screen
        key={'진도'}
        name={'진도'}
        options={progressOptions}
        component={ProgressStackScreen}
      />
      <Tab.Screen
        key={'과제'}
        name={'과제'}
        options={assignOptions}
        component={HomeworkStackScreen}
      />
    </Tab.Navigator>
  );
}

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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return{};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

