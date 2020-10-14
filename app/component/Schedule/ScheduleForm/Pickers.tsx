import { Text, TouchableHighlight, View } from 'react-native';

import { Chip } from 'react-native-paper';
import MyDatePicker from '../../common/MyDatePicker';
import { Picker } from '@react-native-community/picker';
import React from 'react';
import { ScheduleType } from '../../../types/schedule';
import { TagType } from '../../../types/root';
import dayjs from 'dayjs';
import styles from './styles';

/// student picker
/// subject tag picker
/// day picker

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
        itemStyle={{ fontSize: 16 }}
        style={{ width: 150 }}>
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
        itemStyle={{ fontSize: 16 }}
        style={{ width: 150 }}>
        {extractAllPickerItems(tagList)}
      </Picker>
    </View>
  );
}
