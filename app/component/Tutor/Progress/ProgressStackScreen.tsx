import React from 'react';
import WeeklyProgress from './WeeklyProgress';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet } from 'react-native';

const ProgressStack = createStackNavigator();

export default function ProgressStackScreen (props) {
  const student = props.route.params;
  // console.log(student.progress);
  // console.log(student);
  
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
          props.navigation.openDrawer() 
        }} />
      ),
      headerRight: () => (
        <Text style={styles.studentNameText}>{student.name+' 학생'}</Text>
      )
    }}>
      <ProgressStack.Screen name='진도관리' component={WeeklyProgress} initialParams={student}/>
    </ProgressStack.Navigator>
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
