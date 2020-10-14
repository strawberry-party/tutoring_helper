import { StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerOptions from '../component/headerOptions';
import { connect } from 'react-redux';
import Homework from '../container/Homework';

const HomeworkStack = createStackNavigator();

interface HomeworkStackProps {
  studentName: string;
  navigation: any;
}

function HomeworkStackScreen({ studentName, navigation }: HomeworkStackProps) {
  return (
    <HomeworkStack.Navigator
      initialRouteName="숙제 관리"
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
      <HomeworkStack.Screen name="숙제 관리" component={Homework} />
    </HomeworkStack.Navigator>
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
}, null)(HomeworkStackScreen);
