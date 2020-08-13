import React, { Component } from 'react';

import {Calendar} from 'react-native-calendars';
import {Schedule} from '../../../types/schedule'

interface CalendarProps extends Schedule {
  onAddSchedule: () => void;
    
}
class StudentCalendar extends Component {
  render() {
    return (
      <Calendar
        current={'2020-07-20'}
        minDate={'2020-01-01'}
        maxDate={'2030-12-31'}
        monthFormat={'yyyy년 MM월'}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
      />
    );
  }
}

export default StudentCalendar;