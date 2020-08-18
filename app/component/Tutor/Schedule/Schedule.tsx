import React, { Component } from 'react';
import EditButton from './EditButton';
import StudentCalendar from './StudentCalendar';
import StudentInfo from './StudentInfo';
import { ScrollView } from 'react-native-gesture-handler';

class Schedule extends Component {
  render() {
    return (
      <ScrollView>
        {/* <EditButton /> */}
        <StudentCalendar />
        <StudentInfo />
      </ScrollView>
    );
  }
}

export default Schedule;