import {
  EndAfterNTimes,
  EndAfterThisDay,
  LessonOrNone,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  Week,
  generateWeek,
} from '../../../types/schedule';
import { MemoBox, TitleInput } from './TextInputs';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StudentPicker, SubjectTagPicker } from './Pickers';
import Tag, { TagForm } from '../../common/Tag';

import { Button } from 'react-native-paper';
import DailyScheduleSelector from '../DailyScheduleSelector/index';
import EndPointSelector from './EndPointSelector';
import { Header } from './etc';
import { LessonTimePicker } from './TimePickers';
import { Reminder } from './Reminder';
import { RepeatSelector } from './RepeatSelector';
import { TagType } from '../../../types/root';
import dayjs from 'dayjs';
import { repeatedScheduleInfoMap } from '../../../common/scheduleMockData';
import styles from './styles';
import weeklyScheduleParser from '../scheduleUtils/weeklyScheduleParser';

interface ScheduleFormProps {
  selectedSchedule: ScheduleType;
  hideModal: () => void;
  selectedScheduleId: string;
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

const studentList = [
  { id: 'student_1', name: '김태형' },
  { id: 'student_2', name: '최상아' },
];

const tagList = [
  { id: 'tag_1', name: '수학' },
  { id: 'tag_2', name: '과학' },
];

export default function ScheduleForm({ selectedSchedule, onSubmit }) {
  const {
    text,
    studentId,
    tagId,
    time,
    memo,
    linkedRepeatedScheduleInfoId,
  } = selectedSchedule;

  // create / edit schedule
  const { start, end } = time;
  const [newText, setText] = useState(text);
  const [selectedStudentId, selectStudent] = useState(studentId);
  const [selectedTagId, selectTag] = useState(tagId);

  const [newStart, setStart] = useState(start);
  const [newEnd, setEnd] = useState(end);
  const [newMemo, setMemo] = useState(memo);

  // create / edit repeatedScheduleInfo
  const [repeat, setRepeat] = useState('false');

  const repeatedScheduleInfo =
    linkedRepeatedScheduleInfoId === 'none'
      ? new RepeatedScheduleInfo()
      : repeatedScheduleInfoMap.get(linkedRepeatedScheduleInfoId);

  const { endAfter, weeklySchedule } = repeatedScheduleInfo;

  var lastDay = (endAfter as EndAfterThisDay).endDay;
  var endNumTimes = (endAfter as EndAfterNTimes).numOfTimes;

  const [newEndPoint, setEndPoint] = useState(lastDay ? 'lastDay' : 'times');
  const [endAfterNumTimes, setEndAfterNumTimes] = useState(
    endNumTimes ? endNumTimes : 0,
  );
  const [newLastDay, setLastDay] = useState(lastDay ? lastDay : dayjs());

  const [newWeeklySchedule, setWeeklySchedule] = useState(weeklySchedule);
  const [reminder, setReminder] = useState(30); // remind this schedule before x minutes

  const [startTimes, setStartTimes] = useState(
    weeklyScheduleParser(weeklySchedule).startTimes,
  );
  const [endTimes, setEndTimes] = useState(
    weeklyScheduleParser(weeklySchedule).endTimes,
  );

  const handleSubmit = () => {
    console.warn('schedule submit' + repeat);
    const newTime: LessonTime = new LessonTime(newStart, newEnd);
    if (repeat === 'false') {
      const newSchedule: ScheduleType = {
        ...selectedSchedule,
        text: newText,
        studentId: selectedStudentId,
        tagId: selectedTagId,

        time: newTime,
        linkedRepeatedScheduleInfoId: 'none',

        memo: newMemo,
      };

      onSubmit(newSchedule);
    } else {
      console.warn('어서 일해라');
    }
  };

  const onConfirmEnd = (date: Date) => {
    setEnd(dayjs(date));
  };
  const onConfirmStart = (date: Date) => {
    setStart(dayjs(date));
  };

  const onConfirmLastDay = (date: Date) => {
    setLastDay(dayjs(date));
  };

  const onChangeTitle = (text) => {
    setText(text);
  };

  const onChangeMemo = (text) => {
    setMemo(text);
  };

  const onChangeStartTimes = (id: number, startTime: dayjs.Dayjs) => {
    setStartTimes(
      startTimes.map((item, index) => {
        if (id === index) return startTime;
        else return item;
      }) as Week,
    );
  };

  const onChangeEndTimes = (id: number, endTime: dayjs.Dayjs) => {
    setEndTimes(
      endTimes.map((item, index) => {
        if (id === index) return endTime;
        else return item;
      }) as Week,
    );
  };

  const setAllSameTime = () => {
    setStartTimes(generateWeek(newStart));
    setEndTimes(generateWeek(newEnd));
  };

  return (
    <View style={styles.container}>
      <Header handleSubmit={handleSubmit} />
      <ScrollView style={styles.formContainer}>
        <View>
          <TitleInput value={newText} onChangeText={onChangeTitle} />

          <StudentPicker
            selectedStudentId={selectedStudentId}
            studentList={studentList}
            onSelectStudent={selectStudent}
          />

          <SubjectTagPicker
            selectedTagId={selectedTagId}
            tagList={tagList}
            onSelectTag={selectTag}
          />
          <RepeatSelector repeat={repeat} setRepeat={setRepeat} />

          <LessonTimePicker
            onConfirmEnd={onConfirmEnd}
            onConfirmStart={onConfirmStart}
            newEnd={newEnd}
            newStart={newStart}
          />

          {repeat === 'true' && (
            <View>
              <DailyScheduleSelector
                onChangeEndTimes={onChangeEndTimes}
                onChangeStartTimes={onChangeStartTimes}
                endTimes={endTimes}
                startTimes={startTimes}
                setAllSameTime={setAllSameTime}
              />
              <EndPointSelector
                setEndPoint={setEndPoint}
                newEndPoint={newEndPoint}
                endAfterNumTimes={endAfterNumTimes}
                setEndAfterNumTimes={setEndAfterNumTimes}
                newLastDay={newLastDay}
                onConfirmLastDay={onConfirmLastDay}
              />
            </View>
          )}

          <Reminder
            defaultReminder={reminder}
            onSubmitDialog={(minute: number) => setReminder(minute)}
          />
          <MemoBox newMemo={newMemo} onChangeMemo={onChangeMemo} />
        </View>
      </ScrollView>
    </View>
  );
}
