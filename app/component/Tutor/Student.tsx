import React, { Component } from 'react';
import { View } from 'react-native';
import Progress from './Progress/Progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TutoringHelper from '../../container/TutoringHelper';
import ScheduleStackScreen from './Schedule/ScheduleStackScreen';

const Tab = createBottomTabNavigator();

function Student() {
  return (
    <Tab.Navigator
      initialRouteName="메인"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="메인"
        component={ScheduleStackScreen}
        options={{
          tabBarLabel: '메인',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="일정"
        component={ScheduleStackScreen}
        options={{
          tabBarLabel: '일정',
          tabBarIcon: ({ color, size }) => (
            <Foundation name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="진도"
        component={Progress}
        options={{
          tabBarLabel: '진도',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="progress-check" color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="과제"
        component={TutoringHelper}
        options={{
          tabBarLabel: '과제',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// TODO: student 관리 탭이므로 Homework 추가

export default Student;
