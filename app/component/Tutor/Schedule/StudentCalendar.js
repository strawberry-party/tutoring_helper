import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import { IconButton } from 'react-native-paper';
import { KR_LOCAL_CONFIG } from '../../../utils/calendarConfig';
import { LocaleConfig } from 'react-native-calendars';

// TODO: 타입 오류 있는 Agenda 분리, 기타 컴포넌트에는 타입 적용
const testIDs = 'testId'

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
  //   const calendarParams = {
  //     current: '2020-08-11',
  //     minDate: '2020-01-01',
  //     maxDate: '2030-12-31',
  //     monthFormat:'yyyy년 MM월',
  //     markedDates:{{
  //       '2020-08-25': {
  //         dots: [vacation],
  //       },
  //     }},
  //     markingType:{'multi-dot'},
  // };

  return (
    <View>
      <Text> 헬로 월드 </Text>
      {calendarExample}
      <AgendaScreen />
    </View>
  );
}

export default StudentCalendar;

const calendarExample = (
  <Calendar
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
    renderArrow={(direction) => {
      return (
        <IconButton
          icon={
            direction === 'left' ? 'arrow-left-circle' : 'arrow-right-circle'
          }
          color="#aec6df"
        />
      );
    }}
    // renderHeader={(date) => {
    //   /*Return JSX*/
    //   <Text> Header </Text>
    // }}

    markedDates={{
      '2020-08-25': {
        dots: [vacation],
        // selected: true,
        // selectedColor: 'red',
      },
      '2020-08-26': { dots: [massage, workout] },
    }}
    markingType={'multi-dot'}
  />
);


const items =
{
  '2020-08-22': [{ name: 'item 1 - any js object' }],
  '2020-08-23': [{ name: 'item 2 - any js object', height: 80 }],
  '2020-08-24': [],
  '2020-08-25': [
    { name: 'item 3 - any js object' },
    { name: 'any js object' },
  ],
};

export class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: items
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2020-08-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={'period'}
        markedDates={{
          '2020-08-08': { textColor: '#43515c' },
          '2020-08-09': { textColor: '#43515c' },
          '2020-08-14': { startingDay: true, endingDay: true, color: 'blue' },
          '2020-08-21': { startingDay: true, color: 'blue' },
          '2020-08-22': { endingDay: true, color: 'gray' },
          '2020-08-24': { startingDay: true, color: 'gray' },
          '2020-08-25': { color: 'gray' },
          '2020-08-26': { endingDay: true, color: 'gray' }
        }}
        // monthFormat={'yyyy'}
        theme={{ calendarBackground: 'red', agendaKnobColor: 'green' }}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        style={{ borderWidth: 3, borderColor: 'blue' }}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
