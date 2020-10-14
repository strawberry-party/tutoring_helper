import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressStackScreen from '../../screens/ProgressStackScreen';
import React from 'react';
import { connect } from 'react-redux';
import ScheduleContainer from '../../container/Schedule';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeworkStackScreen from '../../screens/HomeworkStackScreen';
import InitialScreen from '../../screens/InitialScreen';
import StatisticScreen from '../../screens/StatisticScreen';
import OthersScreen from '../../screens/OthersScreen';

const Tab = createBottomTabNavigator();

function Tabs() {

  return (
    <Tab.Navigator
      initialRouteName="일정"
      tabBarOptions={{ activeTintColor: '#e91e63' }}>
      {/* <Tab.Screen
        key={'메인'}
        name={'메인'}
        options={mainOptions}
        component={MainStackScreen}
      /> */}
      <Tab.Screen
        key={'일정'}
        name={'일정'}
        options={calendarOptions}
        component={ScheduleContainer}
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
      <Tab.Screen
        key={'성취도 분석'}
        name={'성취도 분석'}
        options={statisticOptions}
        component={StatisticScreen}
      />
      <Tab.Screen
        key={'기타'}
        name={'기타'}
        options={othersOptions}
        component={OthersScreen}
      />
    </Tab.Navigator>
  );
}

// const mainOptions = {
//   tabBarLabel: '메인',
//   tabBarIcon: ({ color, size }) => (
//     <Ionicons name="person" color={color} size={size} />
//   ),
// };

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

const statisticOptions = {
  tabBarLabel: '성취도 분석',
  tabBarIcon: ({ color, size }) => (
    <Octicons name="graph" color={color} size={size} />
  ),
};

const othersOptions = {
  tabBarLabel: '기타',
  tabBarIcon: ({ color, size }) => (
    <Entypo name="dots-three-horizontal" color={color} size={size} />
  ),
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return{};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

