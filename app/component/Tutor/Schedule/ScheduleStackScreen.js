import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Schedule from './Schedule';
import DetailInfo from './DetailInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScheduleStack = createStackNavigator();
const headerOptions = {
  title: '일정관리',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#e91e63',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const ScheduleStackScreen = ({navigation}) => {
  return (
    <ScheduleStack.Navigator initialRouteName='일정관리'>
      <ScheduleStack.Screen 
        name='일정관리'
        component={Schedule}
        options={{...headerOptions, 
          headerLeft: () => (
            <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => { 
              navigation.openDrawer() 
            }} />
          )}}
      />
      <ScheduleStack.Screen 
        name='상세정보'
        component={DetailInfo}
        options={{...headerOptions, title: '상세정보', headerLeft: () => (
          <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => { 
            navigation.openDrawer() 
          }} />
        ), headerRight: () => (
          <HeaderBackButton tintColor='white' backgroundColor='#e91e63' onPress={() => {
            navigation.navigate('일정관리')
          }} />
        )}}
      />
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackScreen;