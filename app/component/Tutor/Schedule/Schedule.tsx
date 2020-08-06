import React, { Component } from 'react';
import EditButton from './EditButton';
import Calendar from './Calendar';
import StudentInfo from './StudentInfo';
import { ScrollView } from 'react-native-gesture-handler';

class Schedule extends Component {
  render() {
    return (
      <ScrollView>
        <EditButton />
        <Calendar />
        <StudentInfo />
      </ScrollView>
    );
  }
}

export default Schedule;