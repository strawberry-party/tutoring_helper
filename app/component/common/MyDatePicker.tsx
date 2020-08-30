import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

interface MyDatePickerProps {
  day: dayjs.Dayjs;
  onConfirm: (date: Date) => void;
  msg: string;
}

export default function MyDatePicker({
  onConfirm,
  day,
  msg,
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
    <Pressable style={styles.dateContainer} onPress={showDatePicker}>
      <Text style={styles.dateHeadline}> {msg} </Text>
      <Text style={styles.dateHeadline}>
        {day.format('MM월 DD일').toString()}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
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
    fontWeight: '700',
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
    backgroundColor: '#bbb',
    marginBottom: 10,
    height: 40,
  },
});
