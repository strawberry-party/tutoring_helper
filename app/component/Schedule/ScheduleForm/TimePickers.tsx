import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MyDatePicker from '../../common/MyDatePicker';
import styles from './styles';

export function LessonTimePicker({
  onConfirmEnd,
  onConfirmStart,
  newEnd,
  newStart,
}) {
  const hasError = () => {
    return newStart.isAfter(newEnd);
  };

  return (
    <View style={[styles.inputContainer, {alignItems: 'flex-start'}]}>
      <Icon
        name="time-outline"
        size={30}
        color="#bbb"
        style={{ marginTop: 10 }}
      />

      <View style={{ padding: 5 }}>
        <View style={styles.datePickerContainer}>
          <MyDatePicker
            onConfirm={onConfirmStart}
            day={newStart}
            mode={'date'}
            dateTextStyle={hasError() ? styles.errorText : styles.dateTextStyle}
          />
          <MyDatePicker
            onConfirm={onConfirmStart}
            day={newStart}
            mode={'time'}
            dateTextStyle={hasError() ? styles.errorText : styles.dateTextStyle}
          />
        </View>

        <View style={styles.datePickerContainer}>
          <MyDatePicker
            onConfirm={onConfirmEnd}
            day={newEnd}
            mode={'date'}
            dateTextStyle={styles.dateTextStyle}
          />
          <MyDatePicker
            onConfirm={onConfirmEnd}
            day={newEnd}
            mode={'time'}
            dateTextStyle={styles.dateTextStyle}
          />
        </View>
      </View>
    </View>
  );
}
