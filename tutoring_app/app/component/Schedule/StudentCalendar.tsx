import React, { Component } from 'react';
import {Calendar} from 'react-native-calendars';

class StudentCalendar extends Component {
  render() {
    return (
      <Calendar
        current={'2020-07-20'}
        minDate={'2020-01-01'}
        maxDate={'2030-12-31'}
        onDayPress={(day) => {console.log('selected day', day)}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        monthFormat={'yyyy년 MM월'}
        onMonthChange={(month) => {console.log('month changed', month)}}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
      />
    );
  }
}

export default StudentCalendar;