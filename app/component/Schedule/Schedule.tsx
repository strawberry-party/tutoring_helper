import React, { Component } from 'react';
import EditButton from './EditButton';
import StudentCalendar from './StudentCalendar';
import StudentInfo from './StudentInfo';
import { ScrollView } from 'react-native-gesture-handler';

const Schedule = () => {
  return (
    <ScrollView>
      {/* <EditButton /> */}
      <StudentCalendar />
      <StudentInfo />
    </ScrollView>
  );
};

export default Schedule;
