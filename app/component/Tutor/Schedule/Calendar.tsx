import React, { Component } from 'react';

import {Calendar} from 'react-native-calendars';

class StudentCalendar extends Component {
  render() {
    return (
      <Calendar
        current={'2020-08-11'}
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