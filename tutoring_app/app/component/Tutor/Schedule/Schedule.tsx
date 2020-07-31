import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EditButton from './EditButton';
import Calender from './Calender';
import StudentInfo from './StudentInfo';

class Schedule extends Component {
  render() {
    return (
      <View>
        <EditButton />
        <Calender />
        <StudentInfo />
      </View>
    );
  }
}

export default Schedule;