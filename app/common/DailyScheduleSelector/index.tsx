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

import { LessonTime } from '../../types/schedule';
import MyDatePicker from '../MyDatePicker';
import dayjs from 'dayjs';
import styles from './styles';

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export default function DailyScheduleSelector({
  onChangeEndTimes,
  onChangeStartTimes,
  endTimes,
  startTimes,
  setAllSameTime,  
}) {
  const [selectedDays, selectDays] = useState(new Array<number>());

  const onPressDay = (dayId: number) => {
    if (selectedDays.includes(dayId))
      selectDays(selectedDays.filter((id) => id !== dayId));
    else selectDays([...selectedDays, dayId]);
  };

  const dayChipList = dayList.map((day, index) => {
    return (
      <DayChip
        key={index}
        onPress={() => onPressDay(index)}
        isSelected={selectedDays.includes(index)}
        id={index}
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
const dayList = ['일', '월', '화', '수', '목', '금', '토'];

function getDayScheduleSelector(id, visible) {}

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
              end={endTimes[id] === 'none' ? dayjs() : endTimes[id]}
              start={startTimes[id] === 'none' ? dayjs() : startTimes[id]}
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
        {dayList[id]}
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
      <Text style={{ marginRight: 20 }}> 부터 </Text>
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
    <Chip style={{ alignItems: 'center', justifyContent: 'center' }}>
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
    </Chip>
  );
}
