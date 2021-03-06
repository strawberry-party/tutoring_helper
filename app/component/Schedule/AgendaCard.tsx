import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import React from 'react';
import { ScheduleType } from '../../types/schedule';

/// Schedule에 대응하는 컴포넌트 props의 타입
export interface AgendaCardType {
  schedule: ScheduleType;
  onPressAgendaCard: (schedule: ScheduleType) => void;
}

/// 일정이 없으면 아무것도 렌더링하지 않는 것으로 결정

function AgendaCard({ schedule, onPressAgendaCard }) {
  const {
    text,
    studentId,
    tagId,
    time,
    linkedRepeatedScheduleInfoId,
    memo,
  } = schedule;

  return (
    <TouchableOpacity onPress={onPressAgendaCard} style={styles.item}>
      <Text style={styles.title}>{text}</Text>
      <Text style={styles.time}>
        {time.start.format('HH:mm') + ' ~ ' + time.end.format('HH:mm')}
      </Text>
      <Text> {linkedRepeatedScheduleInfoId} </Text>
    </TouchableOpacity>
  );
}

export default AgendaCard;

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#c7ceea',
  },
  time: {
    color: '#f8f8f8',
    fontSize: 14,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
  },
  emptyItemText: {
    color: '#bbb',
    fontSize: 14,
  },
});
