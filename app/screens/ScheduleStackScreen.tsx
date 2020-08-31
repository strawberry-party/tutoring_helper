import {
  HeaderBackButton,
  createStackNavigator,
} from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import DetailInfo from '../component/Tutor/Schedule/DetailInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Schedule from '../component/Tutor/Schedule/Schedule';
import headerOptions from '../component/headerOptions';
import { connect } from 'react-redux';

const ScheduleStack = createStackNavigator();

interface ScheduleStackProps {
  studentName: string;
  navigation: any;
}

const ScheduleStackScreen = ({
  studentName,
  navigation,
}: ScheduleStackProps) => {
  return (
    <ScheduleStack.Navigator
      initialRouteName="일정관리"
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
      <ScheduleStack.Screen name="일정관리" component={Schedule} />
      <ScheduleStack.Screen
        name="상세정보"
        component={DetailInfo}
        options={{
          headerRight: () => (
            <HeaderBackButton
              tintColor="white"
              onPress={() => {
                navigation.navigate('일정관리');
              }}
            />
          ),
        }}
      />
    </ScheduleStack.Navigator>
  );
};
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
}, null)(ScheduleStackScreen);
