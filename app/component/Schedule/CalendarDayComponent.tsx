import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

// 출처: https://medium.com/swlh/how-i-built-horizontal-as-well-as-grid-calendar-in-react-native-using-react-native-calendars-eb7a2edcc5db
const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DayCompStyle {
  content: { backgroundColor: string; borderRadius: number };
  text: { color: string };
}

interface CalendarDayComponentProps {
  state: 'today' | any;
  marking: any;
  date: { dateString: string; weekDay: number };
  current: string;
  onPress: (date) => void;
  horizontal: boolean;
  text: string;
}

function CalendarDayComponent({
  state,
  marking,
  date,
  current,
  onPress,
  horizontal,
  text,
}) {
  function getContentStyle() {
    const style = {
      content: {},
      text: {
        color: 'red',
      },
    };

    // if (marking.soldOut) {
    //     style.text.color = '#fff';
    //     style.content.backgroundColor = '#e35052';
    //     style.content.borderRadius = 50;
    //   } else if (marking.blocked) {
    //     style.text.color = '#fff';
    //     style.content.backgroundColor = '#c1c2c1';
    //     style.content.borderRadius = 50;
    //   } else if (state === 'disabled') {
    //     style.text.color = '#c1c2c1';
    //   } else if (state === 'today') {
    //     style.text.color = '#fff';
    //     style.content.backgroundColor = '#216bc9';
    //     style.content.borderRadius = 50;
    //   } else if (current === date.dateString) {
    //     style.content.borderRadius = 50;
    //     style.content.borderWidth = 1;
    //     style.content.borderColor = '#216bc9';
    //   }

    return style;
  }

  function onDayPress() {
    onPress(date);
  }

  const contentStyle = getContentStyle();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {horizontal ? (
          <Text style={styles.weekName} numberOfLines={1}>
            {/* {weekDaysNames[date.weekDay]} */}
            화요일
          </Text>
        ) : (
          <Text>
            no week day
            {console.log('no week day')}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.content, contentStyle.content]}
        onPress={onDayPress}>
        <Text style={[styles.contentText, contentStyle.text]}>{text}</Text>
      </TouchableOpacity>

      {/* <View>
          <Text style={this.getFooterTextStyle()}>
            {this.getInventoryCount()}
          </Text>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7,
  },
  weekName: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#7c7c7c',
  },
  content: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 10,
  },
});

export default CalendarDayComponent;
