import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import HomeworkContainer from '../../container/Homework';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressStackScreen from './Progress/ProgressStackScreen';
import ScheduleStackScreen from './Schedule/ScheduleStackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStackScreen from './MainStackScreen';

const Tab = createBottomTabNavigator();
const TabName = [
  {name: '메인', component: MainStackScreen, options: {
    tabBarLabel: '메인', 
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person" color={color} size={size} />
    )
  }},
  {name: '일정', component: ScheduleStackScreen, options: {
    tabBarLabel: '일정',
    tabBarIcon: ({ color, size }) => (
      <Foundation name="calendar" color={color} size={size} />
    ),
  }},
  {name: '진도', component: ProgressStackScreen, options: {
    tabBarLabel: '진도',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons
        name="progress-check"
        color={color}
        size={size}
      />
    ),
  }},
  {name: '과제', component: HomeworkContainer, options: {
    tabBarLabel: '과제',
    tabBarIcon: ({ color, size }) => (
      <FontAwesome name="book" color={color} size={size} />
    ),
  }},
]

function Tabs(props) {
  const student = props.route.params;
  const TabScreen = TabName.map(tab => <Tab.Screen key={tab.name} name={tab.name} component={tab.component} initialParams={student} options={tab.options} />)
  return (
    <Tab.Navigator initialRouteName="메인" tabBarOptions={{activeTintColor: '#e91e63',}}>
      {TabScreen}
    </Tab.Navigator>
  );
}
export default Tabs;
