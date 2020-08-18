import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import headerOptions from '../headerOptions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet } from 'react-native';

const MainStack = createStackNavigator();

function MainStackScreen(props) {
  const student = props.route.params;
  
  return (
    <MainStack.Navigator initialRouteName='메인'>
      <MainStack.Screen 
        name='메인'
        component={Main}
        initialParams={student}
        options={{...headerOptions, 
          title: '메인',
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
    </MainStack.Navigator>
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

export default MainStackScreen;