import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EditButton from './EditButton';
import StudentCalendar from './StudentCalendar';
import StudentInfo from './StudentInfo';

class Schedule extends Component {
  render() {
    return (
      <View>
        <EditButton />
        <StudentCalendar />
        <StudentInfo />
      </View>
    );
  }
}

export default Schedule;