import { Agenda, Calendar } from 'react-native-calendars';
import React, { Component } from 'react';

import { IconButton } from 'react-native-paper';

class StudentCalendar extends Component {
  render() {
    return (
      <Calendar
        current={'2020-08-11'}
        minDate={'2020-01-01'}
        maxDate={'2030-12-31'}
        monthFormat={'yyyy년 MM월'}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        // hideArrows={true}
        renderArrow={(direction: string) => {
            return (
              <IconButton
                icon={
                  direction === 'left'
                    ? 'arrow-left-circle'
                    : 'arrow-right-circle'
                }
                color="#aec6df"
                onPress={() => console.warn("왜 안넘어감")}
              />
            );
        }}
      />
    );
  }
}

export default StudentCalendar;

const a = (
  <Calendar
    // Initially visible month. Default = Date()
    current={'2012-03-01'}
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate={'2012-05-10'}
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate={'2012-05-30'}
    // Handler which gets executed on day press. Default = undefined

    // Handler which gets executed on day long press. Default = undefined
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    monthFormat={'yyyy MM'}
    // Handler which gets executed when visible month changes in calendar. Default = undefined
    onMonthChange={(month) => {
      console.log('month changed', month);
    }}
    // Hide month navigation arrows. Default = false
    hideArrows={true}
    // Replace default arrows with custom ones (direction can be 'left' or 'right')
    renderArrow={(direction) => <Button />}
    // Do not show days of other months in month page. Default = false
    hideExtraDays={true}
    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
    // day from another month that is visible in calendar page. Default = false
    disableMonthChange={true}
    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
    firstDay={1}
    // Hide day names. Default = false
    hideDayNames={true}
    // Show week numbers to the left. Default = false
    showWeekNumbers={true}
    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    onPressArrowLeft={(subtractMonth) => subtractMonth()}
    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    onPressArrowRight={(addMonth) => addMonth()}
    // Disable left arrow. Default = false
    disableArrowLeft={true}
    // Disable right arrow. Default = false
    disableArrowRight={true}
    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
    disableAllTouchEventsForDisabledDays={true}
    /** Replace default month and year title with custom one. the function receive a date as parameter. */
    renderHeader={(date) => {
      /*Return JSX*/
    }}
  />
);
