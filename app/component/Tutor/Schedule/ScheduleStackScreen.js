import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Schedule from './Schedule';
import DetailInfo from './DetailInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import headerOptions from '../../headerOptions'
import { Text, StyleSheet } from 'react-native';

const ScheduleStack = createStackNavigator();

const ScheduleStackScreen = (props) => {
  const student = props.route.params;

  return (
    <ScheduleStack.Navigator initialRouteName='일정관리'>
      <ScheduleStack.Screen 
        name='일정관리'
        component={Schedule}
        options={{...headerOptions, title: '일정관리',
          headerLeft: () => (
            <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => { 
              props.navigation.openDrawer() 
            }} />
          ),
          headerRight: () => (
            <Text style={styles.studentNameText}>{student.name+' 학생'}</Text>
          )
        }}
      />
      <ScheduleStack.Screen 
        name='상세정보'
        component={DetailInfo}
        options={{...headerOptions, title: '상세정보',
          headerLeft: () => (
            <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => { 
              props.navigation.openDrawer() 
            }} />
          ),
          headerRight: () => (
            <HeaderBackButton tintColor='white' backgroundColor='#e91e63' onPress={() => {
              props.navigation.navigate('일정관리')
            }} />
          )}}
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

export default ScheduleStackScreen;