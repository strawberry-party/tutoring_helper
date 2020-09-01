import AgendaCard, { EmptyCard } from './AgendaCard'
import { AgendaList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { lightThemeColor, themeColor } from './scheduleThemeProvider'

import { KR_LOCAL_CONFIG } from '../../utils/calendarConfig';
import { LocaleConfig } from 'react-native-calendars';
import { ScheduleType } from '../../types/schedule';
import _ from 'lodash';
import { dailyAgendas, } from './parseDateData'
import { getTheme } from './scheduleThemeProvider';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용

LocaleConfig.locales['kr'] = KR_LOCAL_CONFIG;
LocaleConfig.defaultLocale = 'kr';


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
    return <EmptyCard />
  }
  return (
    <AgendaCard item={item} itemPressed={itemPressed} buttonPressed={buttonPressed} />
  );
}


export default function StudentCalendar({ weekView }) {
  const [state, setState] = useState({});


  function getMarkedDates() {
    const marked = {};
    dailyAgendas.forEach(item => {
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
      date={dailyAgendas[0].title}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: themeColor
      }}
      style={{ backgroundColor: 'red', padding: 10 }}
    >

      {/* <Calendar
        current={calendarDate}
        horizontal={horizontal}

        dayComponent={CalendarDayComponent}
        calendarHeaderComponent={CalendarHeaderComponent}
        headerData={{
          calendarDate: calendarDate.format('DD MMM, YYYY')
        }}
        style={{
          paddingLeft: 0, paddingRight: 0
        }}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
        onPressListView={onPressListView}
        onPressGridView={onPressGridView}
        markedDates={getMarkedDates()}
        onDayPress={onDayPress}
      /> */}

      {/* {weekView ?
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
        } */}

      <ScrollView>
        <View>
          <AgendaList
            sections={dailyAgendas}
            extraData={state}
            renderItem={renderItem}
            hideKnob
            sectionStyle={styles.section}
            sectionTextStyle={styles.sectionTextStyle}
          />
        </View>
      </ScrollView>
    </CalendarProvider>

  );
}


const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'blue'
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    alignItems: 'flex-start',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },

  sectionTextStyle: {
    fontSize: 15,
  }

});
