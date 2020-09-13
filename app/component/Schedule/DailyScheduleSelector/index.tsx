import { Button, Chip, FAB, RadioButton, TextInput } from 'react-native-paper';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { LessonTime } from '../../../types/schedule';
import MyDatePicker from '../../common/MyDatePicker';
import dayjs from 'dayjs';
import styles from './styles';

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export default function DailyScheduleSelector({
  selectedDays,
  selectDays,
  onChangeEndTimes,
  onChangeStartTimes,
  endTimes,
  startTimes,
  setAllSameTime,
}) {
  const onPressDay = (dayId: number) => {
    if (selectedDays.includes(dayId))
      selectDays(selectedDays.filter((id) => id !== dayId));
    else selectDays([...selectedDays, dayId]);
  };

  const dayChipList = dayList.map((day, index) => {
    return (
      <DayChip
        onPress={() => onPressDay(index)}
        isSelected={selectedDays.includes(index)}
        id={index}
        key={index}
      />
    );
  });

  return (
    <View style={[styles.inputContainer]}>
      <Text style={styles.headline}> 요일별 수업 시간 </Text>
      <View style={styles.tagContainer}>{dayChipList}</View>
      <Button onPress={setAllSameTime}> 모두 같은 시간으로 </Button>

      <DayScheduleSelectorContainer
        selectedDays={selectedDays}
        endTimes={endTimes}
        startTimes={startTimes}
        onChangeEndTimes={onChangeEndTimes}
        onChangeStartTimes={onChangeStartTimes}
      />
    </View>
  );
}
export const dayList = ['일', '월', '화', '수', '목', '금', '토'];

function DayScheduleSelectorContainer({
  selectedDays,
  onChangeEndTimes,
  onChangeStartTimes,
  endTimes,
  startTimes,
}) {
  return (
    <View style={styles.dayScheduleSelectorListContainer}>
      {dayList.map((day, id) => {
        if (selectedDays.includes(id))
          return (
            <DayScheduleSelector
              key={id}
              id={id}
              start={startTimes[id]}
              end={endTimes[id]}
              onChangeEndTimes={onChangeEndTimes}
              onChangeStartTimes={onChangeStartTimes}
            />
          );
      })}
    </View>
  );
}

function DayChip({ onPress, isSelected, id }) {
  return (
    <Pressable onPress={onPress} key={id} style={styles.dayChip}>
      <Text
        style={
          isSelected
            ? [styles.dayChipText, styles.selectedDay]
            : [styles.dayChipText, styles.unselectedDay]
        }>
        {dayList[id].toString()}
      </Text>
    </Pressable>
  );
}

function DayScheduleSelector({
  id,
  onChangeEndTimes,
  onChangeStartTimes,
  start,
  end,
}) {
  return (
    <View key={id} style={styles.dayScheduleSelectorContainer}>
      <Text style={styles.dayScheduleSelectorText}> {dayList[id]} </Text>
      <DayDatePicker
        onConfirm={(date) => {
          onChangeStartTimes(id, dayjs(date));
          console.warn('confirm id');
        }}
        value={start}
      />
      <Text style={{ marginRight: 15 }}> 부터 </Text>
      <DayDatePicker
        onConfirm={(date) => {
          onChangeEndTimes(id, dayjs(date));
        }}
        value={end}
      />
      <Text> 까지 </Text>
    </View>
  );
}

function DayDatePicker({ onConfirm, value }) {
  return (
    <MyDatePicker
      onConfirm={onConfirm}
      day={value}
      mode="time"
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
      }}
      dateTextStyle={{ fontSize: 15, color: 'black' }}
    />
  );
}
