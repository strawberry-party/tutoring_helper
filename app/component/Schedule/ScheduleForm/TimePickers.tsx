import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import MyDatePicker from '../../common/MyDatePicker';
import styles from './styles';

export function LessonTimePicker({
  onConfirmEnd,
  onConfirmStart,
  newEnd,
  newStart,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.headline}> 시간 </Text>
      <View style={{ padding: 5 }}>
        <MyDatePicker
          onConfirm={onConfirmStart}
          day={newStart}
          msg={'시작'}
          mode={'datetime'}
        />
        <MyDatePicker
          onConfirm={onConfirmEnd}
          day={newEnd}
          msg={'종료'}
          mode={'datetime'}
        />
      </View>
    </View>
  );
}
