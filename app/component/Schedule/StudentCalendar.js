import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import { AgendaList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, IconButton } from 'react-native-paper';
import React, { Component, useState } from 'react';
import { lightThemeColor, themeColor } from './scheduleThemeProvider'

import { KR_LOCAL_CONFIG } from '../../utils/calendarConfig';
import { LocaleConfig } from 'react-native-calendars';
import { ScheduleType } from '../../types/schedule';
import _ from 'lodash';
import { agendaSections, } from './parseDateData'
import { getTheme } from './scheduleThemeProvider';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용

LocaleConfig.locales['kr'] = KR_LOCAL_CONFIG;
LocaleConfig.defaultLocale = 'kr';

function renderEmptyItem() {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>일정이 없어요</Text>
    </View>
  );
}


export default function StudentCalendar(props) {
  const [state, setState] = useState({});


  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  function buttonPressed() {
    Alert.alert('show more');
  }

  function itemPressed(id) {
    Alert.alert(id);
  }

  function renderItem({ item }) {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }
    return (
      <TouchableOpacity
        onPress={() => itemPressed(item.title)}
        style={styles.item}
      >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  }


  function getMarkedDates() {
    const marked = {};
    agendaSections.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  }


  return (
    <CalendarProvider
      date={agendaSections[0].title}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: themeColor
      }}
    >
      {props.weekView ?
        <WeekCalendar
          firstDay={1}
          markedDates={getMarkedDates()}
        /> :
        <ExpandableCalendar
          initialPosition={ExpandableCalendar.positions.OPEN}
          calendarStyle={styles.calendar}
          headerStyle={styles.calendar} // for horizontal only
          theme={getTheme()}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={getMarkedDates()}
          hideKnob
        />
      }

      <ScrollView
        style={{
          borderColor: 'skyblue',
          // borderWidth: 3,
        }}>
        <View
          style={{
            borderColor: 'blue',
            // borderWidth: 3,
          }}>
          <AgendaList
            sections={agendaSections}
            extraData={state}
            renderItem={renderItem}
            hideKnob
            sectionStyle={styles.section}
          />
        </View>
      </ScrollView>


    </CalendarProvider>


  );
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
    alignItems: 'flex-end'
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
