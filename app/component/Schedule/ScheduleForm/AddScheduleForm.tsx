import {
  EndAfterNTimes,
  EndAfterThisDay,
  EndAfterType,
  FormWorkScheduleType,
  LessonOrNone,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  Week,
  WeeklyScheduleType,
} from '../../../types/schedule';
import { MemoBox, TitleInput } from './TextInputs';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StudentPicker, SubjectTagPicker } from './Pickers';
import Tag, { TagForm } from '../../common/Tag';
import weeklyScheduleParser, {
  getWeeklySchedule,
} from '../DailyScheduleSelector/weeklyScheduleParser';

import DailyScheduleSelector from '../DailyScheduleSelector/index';
import EndPointSelector from './EndPointSelector';
import { Header } from './etc';
import { LessonTimePicker } from './TimePickers';
import { Reminder } from './Reminder';
import { RepeatSelector } from './RepeatSelector';
import SubmitOptionModal from './SubmitOptionModal';
import { TagType } from '../../../types/root';
import dayjs from 'dayjs';
import { repeatedScheduleInfoList } from '../../../common/scheduleMockData';
import styles from './styles';

interface AddScheduleFormProps {
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

export function generateWeek(item: dayjs.Dayjs): Week {
  return [item, item, item, item, item, item, item];
}

export default function AddScheduleForm({
  addSchedule,
  addRepeatInfo,
  hideModal,
}) {
  // create schedule
  const [text, setText] = useState('제목');
  const [selectedStudentId, selectStudent] = useState('student_1');
  const [selectedTagId, selectTag] = useState('tag_1');

  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const [memo, setMemo] = useState('');

  // create  repeatedScheduleInfo

  const [repeat, setRepeat] = useState(false);

  const [endPointMode, setEndPointMode] = useState('lastDay');

  const [endAfterNumTimes, setEndAfterNumTimes] = useState(5);
  const [lastDay, setLastDay] = useState(dayjs().add(20, 'day'));

  const [reminder, setReminder] = useState(30); // remind this schedule before x minutes
  const now2Hour = dayjs().add(2, 'hour');
  const now = dayjs();

  const nows = generateWeek(dayjs());
  console.log('now: ' + now.format('YYYY-MM-DD HH:mm'));
  console.log('now2Hour: ' + now2Hour.format('YYYY-MM-DD HH:mm'));

  const [startTimes, setStartTimes] = useState(generateWeek(now));
  const [endTimes, setEndTimes] = useState(generateWeek(now2Hour));
  const [selectedDays, selectDays] = useState(new Array<number>());

  const getFormWorkSchedule = () => {
    return new FormWorkScheduleType(
      text,
      selectedStudentId,
      selectedTagId,
      new LessonTime(start, end),
      memo,
    );
  };

  const getEndAfter = () => {
    var endAfter: EndAfterType =
      endPointMode === 'lastDay'
        ? ({ endDay: lastDay } as EndAfterThisDay)
        : ({ numOfTimes: endAfterNumTimes } as EndAfterNTimes);
    return endAfter;
  };

  const handleSubmit = () => {
    if (!repeat) {
      addSchedule(getFormWorkSchedule());
      hideModal();
    } else {
      addRepeatInfo(
        getFormWorkSchedule(),
        getEndAfter(),
        start,
        getWeeklySchedule(startTimes, endTimes, selectedDays),
      );
      hideModal();
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
    setStartTimes(generateWeek(start));
    setEndTimes(generateWeek(end));
  };

  return (
    <View style={styles.container}>
      <Header handleSubmit={handleSubmit} />
      <ScrollView style={styles.formContainer}>
        <View>
          <TitleInput value={text} onChangeText={onChangeTitle} />

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
            newEnd={end}
            newStart={start}
          />

          {repeat && (
            <View>
              <DailyScheduleSelector
                onChangeEndTimes={onChangeEndTimes}
                onChangeStartTimes={onChangeStartTimes}
                endTimes={endTimes}
                startTimes={startTimes}
                setAllSameTime={setAllSameTime}
                selectedDays={selectedDays}
                selectDays={selectDays}
              />
              <EndPointSelector
                setEndPoint={setEndPointMode}
                newEndPoint={endPointMode}
                endAfterNumTimes={endAfterNumTimes}
                setEndAfterNumTimes={setEndAfterNumTimes}
                newLastDay={lastDay}
                onConfirmLastDay={onConfirmLastDay}
              />
            </View>
          )}

          <Reminder
            defaultReminder={reminder}
            onSubmitDialog={(minute: number) => setReminder(minute)}
          />

          <MemoBox newMemo={memo} onChangeMemo={onChangeMemo} />
        </View>
      </ScrollView>
    </View>
  );
}
