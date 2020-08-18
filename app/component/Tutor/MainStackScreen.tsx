import { StyleSheet, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import React from 'react';
import { StudentType } from '../../types/root';
import { createStackNavigator } from '@react-navigation/stack';
import headerOptions from '../headerOptions';

const MainStack = createStackNavigator();
interface MainStackProps {
  student: StudentType;
  navigation: any;
}

function MainStackScreen({ student, navigation }: MainStackProps) {
  return (
    <MainStack.Navigator initialRouteName="메인">
      <MainStack.Screen
        name="메인"
        options={{
          ...headerOptions,
          title: '메인',
          headerLeft: () => (
            <Ionicons.Button
              name="menu"
              size={35}
              backgroundColor="#e91e63"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <Text style={styles.studentNameText}>{student.name + ' 학생'}</Text>
          ),
        }}>
        {props => <Main student={student} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  studentNameText: {
    paddingRight: 20,
    color: 'white',
    fontSize: 20,
  },
});

export default MainStackScreen;
