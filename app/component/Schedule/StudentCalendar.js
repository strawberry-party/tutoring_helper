import { AgendaList, Calendar, CalendarList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Icon, IconButton, ToggleButton } from 'react-native-paper';
import React, { useState } from 'react';
import { lightThemeColor, themeColor } from './scheduleThemeProvider'

import AgendaCard from './AgendaCard'
import { KR_LOCAL_CONFIG } from '../../utils/calendarConfig';
import { LocaleConfig } from 'react-native-calendars';
import { ScheduleType } from '../../types/schedule';
import _ from 'lodash';
import { dailyAgendas, } from './parseDateData';
import dayjs from 'dayjs';
import { getTheme } from './scheduleThemeProvider';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용

LocaleConfig.locales['kr'] = KR_LOCAL_CONFIG;
LocaleConfig.defaultLocale = 'kr';

function notYetImplemented() {
  console.warn('어서 일해라');
}

const onDateChanged = (/* date, updateSource */) => {
  // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // fetch and set data for date + week ahead
  console.warn('onDateChanged');
}

const onMonthChange = (/* month, updateSource */) => {
  // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
}

function buttonPressed() {
  Alert.alert('show more');
}





export default function StudentCalendar({ selectedSchedule, onPressSchedule }) {
  const [state, setState] = useState({});

  const [calendarVisible, setCalendarVisible] = useState('expanded');

  function getMarkedDates() {
    const marked = {};
    dailyAgendas.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.date] = { marked: true };
      } else {
        marked[item.date] = { disabled: true };
      }
    });
    return marked;
  }

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));


  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [horizontal, setHorizontal] = useState(true);

  function renderItem({ item }) {
    return (
      <AgendaCard schedule={item} onPressAgendaCard={itemPressed} />
    );
  }
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  function itemPressed(item) {
    onPressSchedule(item);
  }

  return (
    <CalendarProvider
      date={calendarDate.toDate()}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}

      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: themeColor
      }}
    >

      <ScrollView>
        <View>
          <ToggleButton.Row onValueChange={value => setCalendarVisible(value)} value={calendarVisible} style={{ width: 40, }}>
            <ToggleButton icon="calendar" value="expanded" color={calendarVisible ? '#bbb' : 'black'} style={styles.button} />
            {/* <ToggleButton icon="arrow-collapse" value="collapsed" color='black' style={styles.button} /> */}
          </ToggleButton.Row>

          <View style={{ margin: 10, justifyContent: 'center', }}>
            <View style={{ borderRadius: 30, overflow: 'hidden' }}>
              {calendarVisible === 'expanded' &&
                <Calendar
                  style={{
                    overflow: 'hidden',
                    flexGrow: 1,
                  }}
                  current={calendarDate.format('YYYY-MM-DD').toString()}
                  calendarWidth={300}
                  calendarHeight={200}
                  onDayPress={onDayPress}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: 'orange',
                      selectedTextColor: 'red',
                    }, ...getMarkedDates()
                  }}
                />}
            </View>
          </View>

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
  button: {
    borderRadius: 30,

  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
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
