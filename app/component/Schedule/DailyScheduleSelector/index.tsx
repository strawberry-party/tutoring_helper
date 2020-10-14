import { Button, Checkbox, HelperText } from 'react-native-paper';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
}) {
  const onPressDay = (dayId: number) => {
    if (selectedDays.includes(dayId))
      selectDays(selectedDays.filter((id) => id !== dayId));
    else selectDays([...selectedDays, dayId]);
  };
  const [isAllSameTime, setAllSameTime] = React.useState(false);

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

  const hasErrors = () => {
    return selectedDays.length === 0;
  };
  return (
    <View style={[styles.inputContainer]}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.headline}> 요일별 수업 시간 </Text>
        <Text style={{ color: '#aaa' }}> 모두 같은 시간으로 </Text>
        <Checkbox
          status={isAllSameTime ? 'checked' : 'unchecked'}
          onPress={() => {
            setAllSameTime(!isAllSameTime);
          }}
        />
      </View>
      <HelperText type="error" visible={hasErrors()}>
        하나 이상의 요일을 선택해 주세요!
      </HelperText>
      <View style={styles.tagContainer}>{dayChipList}</View>

      {
        isAllSameTime && <Text> 여기에 타임피커 </Text>
      }
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
  const [mockStart, setMockStart] = useState(start);
  const [mockEnd, setMockEnd] = useState(end);

  const hasErrors = () => {
    return mockStart.isAfter(mockEnd);
  };
  return (
    <View key={id} style={styles.dayScheduleSelectorContainer}>
      <Text style={styles.dayScheduleSelectorText}> {dayList[id]} </Text>
      <DayDatePicker
        onConfirm={(date) => {
          setMockStart(dayjs(date));
          onChangeStartTimes(id, dayjs(date));
        }}
        value={start}
        error={hasErrors()}
      />
      <Text style={{ marginRight: 15 }}> 부터 </Text>
      <DayDatePicker
        onConfirm={(date) => {
          setMockEnd(dayjs(date));
          onChangeEndTimes(id, dayjs(date));
        }}
        value={end}
        error={false}
      />
      <Text> 까지 </Text>
    </View>
  );
}

function DayDatePicker({ onConfirm, value, error }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    onConfirm(date);
  };

  return (
    <TouchableOpacity onPress={showDatePicker}>
      <Text style={error ? styles.errorText : styles.dateText}>
        {value.format('HH시 mm분').toString()}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'time'}
        date={value.toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}
