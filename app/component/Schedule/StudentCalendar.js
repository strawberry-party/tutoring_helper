import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import { AgendaList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, IconButton } from 'react-native-paper';
import React, { Component } from 'react';

import { KR_LOCAL_CONFIG } from '../../utils / calendarConfig';
import { LocaleConfig } from 'react-native-calendars';
import _ from 'lodash';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용

LocaleConfig.locales['kr'] = KR_LOCAL_CONFIG;
LocaleConfig.defaultLocale = 'kr';

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };
const workout2 = { key: 'workout2', color: 'green' };
const workout3 = { key: 'workout3', color: 'green' };
const workout4 = { key: 'workout5', color: 'green' };
const workout5 = { key: 'workout6', color: 'green' };

function StudentCalendar() {
  return <ExpandableCalendarScreen />
}

export default StudentCalendar;


const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const d = [
  { title: dates[0], data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }] },
  { title: dates[1], data: [{ hour: '4pm', duration: '1h', title: 'Pilates ABC' }, { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }] },
  { title: dates[2], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
  { title: dates[3], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[4], data: [{}] },
  { title: dates[5], data: [{ hour: '9pm', duration: '1h', title: 'Middle Yoga' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
  { title: dates[6], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[7], data: [{}] },
  { title: dates[8], data: [{ hour: '9pm', duration: '1h', title: 'Pilates Reformer' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
  { title: dates[9], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
  { title: dates[10], data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }] }
];

export class ExpandableCalendarScreen extends Component {

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>일정이 없어요</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}
      >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    d.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  }

  getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 }
    };
  }

  render() {
    return (
      <CalendarProvider
        date={d[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        theme={{
          todayButtonTextColor: themeColor
        }}
      >
        {this.props.weekView ?
          <WeekCalendar
            firstDay={1}
            markedDates={this.getMarkedDates()}
          /> :
          <ExpandableCalendar
            initialPosition={ExpandableCalendar.positions.OPEN}
            calendarStyle={styles.calendar}
            headerStyle={styles.calendar} // for horizontal only
            theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()}
            hideKnob
          />
        }
        <AgendaList
          sections={d}
          extraData={this.state}
          renderItem={this.renderItem}
          hideKnob
          sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignd: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});
