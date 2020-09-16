import { StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StudentInfoType } from '../types/student';
import { createStackNavigator } from '@react-navigation/stack';
import headerOptions from '../component/headerOptions';
import { connect } from 'react-redux';
import Main from '../component/Tutor/Main';

const MainStack = createStackNavigator();

interface MainStackProps {
  studentName: string;
  navigation: any;
}

function MainStackScreen({ studentName, navigation }: MainStackProps) {
  return (
    <MainStack.Navigator
      initialRouteName="메인"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
          <Text style={styles.studentNameText}>{studentName + ' 학생'}</Text>
        ),
      }}>
      <MainStack.Screen name="메인" component={Main} />
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

export default connect((state) => {
  return {
    studentName: state.currentStudentReducer.name,
  };
}, null)(MainStackScreen);
