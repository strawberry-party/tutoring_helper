import * as dayjs from 'dayjs';

import { AgendaList, Calendar, CalendarList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, DataTable, Icon, IconButton, ToggleButton } from 'react-native-paper';
import React, { useState } from 'react';
import { lightThemeColor, themeColor } from './scheduleThemeProvider'

import AgendaCard from './AgendaCard'
import { KR_LOCAL_CONFIG } from '../../utils/calendarConfig';
import { LocaleConfig } from 'react-native-calendars';
import { ScheduleType } from '../../types/schedule';
import _ from 'lodash';
import { getTheme } from './scheduleThemeProvider';
import sortIntoDailyAgendas from './scheduleUtils/sortIntoDailyAgendas';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용
LocaleConfig.locales['kr'] = KR_LOCAL_CONFIG;
LocaleConfig.defaultLocale = 'kr';

const studentDotColors = { student_1: 'red', student_2: 'blue', student_3: 'green' };

export default function StudentCalendar({ repeatInfos, selectedSchedule, onPressSchedule, schedules, selectedScheduleId, dailyAgendas }) {
  const [state, setState] = useState({});
  const [calendarStatus, setCalendarStatus] = useState('expanded');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [horizontal, setHorizontal] = useState(true);

  function renderItem({ item, index }) {
    return (
      <AgendaCard schedule={item}
        scheduleId={index}
        onPressAgendaCard={() => onPressSchedule(item, index)} />
    );
  }

  function getDottedDates(selectedDate, schedules) {
    const marked = {};
    dailyAgendas.forEach(item => {
      // NOTE: only mark dates with data
      var dots = [];
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        const schedules = item.data;
        schedules.forEach((schedule) => {

          let studentId = schedule.studentId
          dots.push({ key: item.data.text, color: studentDotColors[studentId] });
        });

        marked[item.title] = { dots };

      } else {
        marked[item.title] = { disabled: true };
      }
    })


    marked[selectedDate] = Object.assign({
      selected: true, disableTouchEvent: true,
      selectedColor: '#bbbe',
    }, marked[selectedDate])
    return marked;

  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <CalendarProvider
      date={calendarDate.toDate()}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: themeColor
      }}
    >

      <ScrollView>
        <View>
          <ToggleButton.Row onValueChange={value => setCalendarStatus(value)} value={calendarStatus} style={{ width: 40, }}>
            <ToggleButton icon="calendar"
              disabled={calendarStatus === 'expanded'}
              value="expanded"
              color={calendarStatus === 'expanded' ? 'blue' : 'black'}
              style={styles.button} />
            <ToggleButton icon="format-list-text" value="collapsed"
              disabled={calendarStatus === 'collapsed'}
              color={calendarStatus === 'collapsed' ? 'blue' : 'black'} style={styles.button} />
          </ToggleButton.Row>

          <View style={{ margin: 10, justifyContent: 'center', }}>
            <View style={{ borderRadius: 30, overflow: 'hidden' }}>
              {calendarStatus === 'expanded' &&
                <Calendar
                  style={{
                    overflow: 'hidden',
                    flexGrow: 1,
                  }}
                  current={calendarDate.format('YYYY-MM-DD').toString()}
                  calendarWidth={300}
                  calendarHeight={200}
                  onDayPress={onDayPress}
                  markingType={'multi-dot'}
                  markedDates={getDottedDates(selectedDate, schedules)}
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
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold'

  },
  titleCell: {
    marginRight: 30,
  },
  cell: {
    borderRightColor: 'black',
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tempStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 4,
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
