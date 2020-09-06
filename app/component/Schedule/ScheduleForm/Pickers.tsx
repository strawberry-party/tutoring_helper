import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { Chip, } from 'react-native-paper';
import MyDatePicker from '../../common/MyDatePicker';
import { Picker } from '@react-native-community/picker';
import React from 'react';
import {
  ScheduleType,
} from '../../../types/schedule';
import { TagType } from '../../../types/root';
import dayjs from 'dayjs';
import styles from './styles'

/// student picker
/// subject tag picker
/// day picker

type AddSchedule = (assign: ScheduleType) => void;
type EditSchedule = (id: string, assign: ScheduleType) => void;
type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface ScheduleFormProps {
  selectedSchedule: ScheduleType;

  hideModal: () => void;

  onSubmit: AddSchedule | EditSchedule;
  selectedScheduleId: string;
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

function getDayTag(day: string, key?, onPress?: () => void) {
  return (
    <View
      style={{
        alignItems: 'center',
        margin: 3,
        width: 40,
        backgroundColor: '#ddd',
        borderRadius: 20,
        padding: 5,
      }}
      key={key}>
      <Text
        style={{
          textAlign: 'center',
        }}>
        {day}
      </Text>
    </View>
  );
}

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const dayChips = dayList.map((day, index) => (
  <TouchableHighlight
    underlayColor="#bbb"
    onPress={() => {
      console.warn('hi');
    }}
    key={index}>
    {getDayTag(day)}
  </TouchableHighlight>
));

function DayDatePicker({ onConfirm }) {
  return (
    <Chip style={{ alignItems: 'center', justifyContent: 'center' }}>
      <MyDatePicker
        onConfirm={onConfirm}
        day={dayjs()}
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

function getDays(days: string[]) {
  const dayTimePicker: JSX.Element[] = days.map((day, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 8,
      }}>
      {getDayTag(day)}
      <DayDatePicker onConfirm={() => {}} />
      <Text style={{ marginRight: 20 }}> 부터 </Text>

      <DayDatePicker onConfirm={() => {}} />
      <Text> 까지 </Text>
    </View>
  ));

  return dayTimePicker;
}

function extractPickerItem({ id, name }, key) {
  return <Picker.Item label={name} value={id} key={key} />;
}

function extractAllPickerItems(itemList) {
  return itemList.map((info, index) => extractPickerItem(info, index));
}

export function StudentPicker({
  studentList,
  onSelectStudent,
  selectedStudentId,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.headline}> 학생 </Text>
      <Picker
        selectedValue={selectedStudentId}
        onValueChange={(itemValue, itemIndex) => onSelectStudent(itemValue)}
        mode="dropdown"
        itemStyle={{ fontSize: 16 }}>
        {extractAllPickerItems(studentList)}
      </Picker>
    </View>
  );
}

export function SubjectTagPicker({ tagList, onSelectTag, selectedTagId }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.headline}> 과목 태그 </Text>
      <Picker
        selectedValue={selectedTagId}
        onValueChange={(itemValue, itemIndex) => onSelectTag(itemValue)}
        mode="dropdown"
        itemStyle={{ fontSize: 16 }}>
        {extractAllPickerItems(tagList)}
      </Picker>
    </View>
  );
}