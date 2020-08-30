import React, {useState, Fragment} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';

const testIDs = require('../testIDs');


const CalendarsScreen = () => {

  const [selected, setSelected] = useState('');

  const onDayPress = (day) => {
    setSelected(day.dateString);
  };

  const getDisabledDates = (startDate, endDate, daysToDisable) => {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(endDate);
    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (_.includes(daysToDisable, m.weekday())) {
        disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
      }
    }
    return disabledDates;
  };

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with selectable date</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          current={'2020-02-02'}
          style={styles.calendar}
          hideExtraDays
          onDayPress={onDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
              selectedTextColor: 'red'
            }
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithWeekNumbers = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with week numbers</Text>
        <Calendar
          style={styles.calendar}
          hideExtraDays
          showWeekNumbers
        />
      </Fragment>
    );
  };

  const renderCalendarWithMarkedDatesAndHiddenArrows = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          maxDate={'2012-05-29'}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={{
            '2012-05-23': {selected: true, marked: true, disableTouchEvent: true},
            '2012-05-24': {selected: true, marked: true, dotColor: 'red'},
            '2012-05-25': {marked: true, dotColor: 'red'},
            '2012-05-26': {marked: true},
            '2012-05-27': {disabled: true, activeOpacity: 0, disableTouchEvent: false}
          }}
          hideArrows={true}
          // disabledByDefault={true}
        />
      </Fragment>
    );
  };

  const renderCalendarWithPeriodMarkingAndSpinner = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with period marking and spinner</Text>
        <Calendar
          // style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          displayLoadingIndicator
          markingType={'period'}
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            textSectionTitleDisabledColor: 'gray',
            dayTextColor: 'red',
            todayTextColor: 'white',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
          markedDates={{
            '2012-05-17': {disabled: true},
            '2012-05-08': {textColor: 'pink'},
            '2012-05-09': {textColor: 'pink'},
            '2012-05-14': {startingDay: true, color: 'green', endingDay: true},
            '2012-05-21': {startingDay: true, color: 'green'},
            '2012-05-22': {endingDay: true, color: 'gray'},
            '2012-05-24': {startingDay: true, color: 'gray'},
            '2012-05-25': {color: 'gray'},
            '2012-05-26': {endingDay: true, color: 'gray'}
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithPeriodMarkingAndDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with period marking and dot marking</Text>
        <Calendar
          current={'2012-05-16'}
          minDate={'2012-05-01'}
          disabledDaysIndexes={[0, 6]}
          markingType={'period'}
          markedDates={{
            '2012-05-15': {marked: true, dotColor: '#50cebb'},
            '2012-05-16': {marked: true, dotColor: '#50cebb'},
            '2012-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
            '2012-05-22': {
              color: '#70d7c7',
              customTextStyle: {
                color: '#FFFAAA',
                fontWeight: '700'
              }},
            '2012-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
            '2012-05-24': {color: '#70d7c7', textColor: 'white'},
            '2012-05-25': {endingDay: true, color: '#50cebb', textColor: 'white',
              customContainerStyle: {
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5
              }},
            ...getDisabledDates('2012-05-01', '2012-05-30', [0, 6])
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-dot marking</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          markingType={'multi-dot'}
          markedDates={{
            '2012-05-08': {
              selected: true,
              dots: [
                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'white'}
              ]
            },
            '2012-05-09': {
              disabled: true,
              dots: [
                {key: 'vacation', color: 'green', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'green'}
              ]
            }
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithMultiPeriodMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with multi-period marking</Text>
        <Calendar
          style={styles.calendar}
          current={'2012-05-16'}
          markingType={'multi-period'}
          markedDates={{
            '2012-05-16': {
              periods: [
                {startingDay: true, endingDay: false, color: 'green'},
                {startingDay: true, endingDay: false, color: 'orange'}
              ]
            },
            '2012-05-17': {
              periods: [
                {startingDay: false, endingDay: true, color: 'green'},
                {startingDay: false, endingDay: true, color: 'orange'},
                {startingDay: true, endingDay: false, color: 'pink'}
              ]
            },
            '2012-05-18': {
              periods: [
                {startingDay: true, endingDay: true, color: 'orange'},
                {color: 'transparent'},
                {startingDay: false, endingDay: false, color: 'pink'}
              ]
            }
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithCustomMarkingType = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Custom calendar with custom marking type</Text>
        <Calendar
          style={styles.calendar}
          onDayLongPress={this.onDayLongPress}
          hideExtraDays
          current={'2018-03-01'}
          minDate={'2018-03-01'}
          markingType={'custom'}
          markedDates={{
            '2018-03-01': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'red'
                }
              }
            },
            '2018-03-08': {
              selected: true
            },
            '2018-03-09': {
              customStyles: {
                container: {
                  backgroundColor: 'red',
                  elevation: 4
                },
                text: {
                  color: 'white'
                }
              }
            },
            '2018-03-14': {
              customStyles: {
                container: {
                  backgroundColor: 'green'
                },
                text: {
                  color: 'white'
                }
              }
            },
            '2018-03-15': {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                  elevation: 2
                },
                text: {
                  color: 'yellow'
                }
              }
            },
            '2018-03-21': {
              disabled: true
            },
            '2018-03-28': {
              customStyles: {
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                }
              }
            },
            '2018-03-30': {
              customStyles: {
                container: {
                  backgroundColor: 'pink',
                  elevation: 4,
                  borderColor: 'purple',
                  borderWidth: 5
                },
                text: {
                  marginTop: 3,
                  fontSize: 11,
                  color: 'black'
                }
              }
            },
            '2018-03-31': {
              customStyles: {
                container: {
                  backgroundColor: 'orange',
                  borderRadius: 0
                }
              }
            }
          }}
        />
      </Fragment>
    );
  };

  const renderCalendarWithCustomDay = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Calendar with custom day component</Text>
        <Calendar
          testID={testIDs.calendars.LAST}
          style={[
            styles.calendar,
            {
              height: 250,
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey'
            }
          ]}
          dayComponent={({date, state}) => {
            return (
              <View>
                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                  {date.day}
                </Text>
              </View>
            );
          }}
        />
      </Fragment>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
      {renderCalendarWithSelectableDate()}
      {renderCalendarWithWeekNumbers()}
      {renderCalendarWithMarkedDatesAndHiddenArrows()}
      {renderCalendarWithPeriodMarkingAndSpinner()}
      {renderCalendarWithPeriodMarkingAndDotMarking()}
      {renderCalendarWithMultiDotMarking()}
      {renderCalendarWithMultiPeriodMarking()}
      {renderCalendarWithCustomMarkingType()}
      {renderCalendarWithCustomDay()}
    </ScrollView>
  );

};

export default CalendarsScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  }
});
