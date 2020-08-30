import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

interface MyDatePickerProps {
  day: dayjs.Dayjs;
  onConfirm: (date: Date) => void;
  msg?: string;
  mode?: 'date' | 'time' | 'datetime';
  style?: Object;
  dateTextStyle?: Object;
}

export default function MyDatePicker({
  onConfirm,
  day,
  msg = '',
  mode = 'date',
  style,
  dateTextStyle,
}: MyDatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onConfirm(date);
    hideDatePicker();
  };
  return (
    <Pressable
      style={style ? style : styles.dateContainer}
      onPress={showDatePicker}>
      {msg.length > 0 && <Text style={styles.dateHeadline}> {msg} </Text>}
      <Text style={dateTextStyle ? dateTextStyle : styles.dateHeadline}>
        {mode == 'time'
          ? day.format('HH시 mm분').toString()
          : mode === 'date'
          ? day.format('MM월 DD일').toString()
          : day.format('MM월 DD일 HH시 mm분').toString()}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dateHeadline: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    minWidth: 30,
    alignSelf: 'center',
    marginRight: 15,
  },
  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#bbb',
  },

  dateContainer: {
    minWidth: 150,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 40,
  },
});
