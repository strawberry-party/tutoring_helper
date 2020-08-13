import React from 'react';
import WeeklyProgress from './WeeklyProgress';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProgressStack = createStackNavigator();

export default function Progress ({navigation}) {
  return (
    <ProgressStack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#e91e63',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <Ionicons.Button name='menu' size={35} backgroundColor='#e91e63' onPress={() => { 
          navigation.openDrawer() 
        }} />
      ),
    }}>
      <ProgressStack.Screen name='진도관리' component={WeeklyProgress} />
    </ProgressStack.Navigator>
  );
}