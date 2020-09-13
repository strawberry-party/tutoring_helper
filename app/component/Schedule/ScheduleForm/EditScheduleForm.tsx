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
  generateWeek,
} from '../../../types/schedule';
import { MemoBox, TitleInput } from './TextInputs';
import React, { useEffect, useState } from 'react';
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

interface EditScheduleFormProps {
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

const defaultEndAfter = ({ numOfTimes: 5 } as EndAfterNTimes) as EndAfterType;
const defaultWeeklySchedule = new WeeklyScheduleType();

const ALL = 'ALL' as const;
const ONLY_THIS = 'ONLY_THIS' as const;

// 4 modes of submit
const EDIT_REPEAT = 'EDIT_REPEAT';
const ADD_REPEAT = 'ADD_REPEAT';
const REMOVE_REPEAT = 'REMOVE_REPEAT';
const NOTHING_WITH_REPEAT = 'NOTHING_WITH_REPEAT';

export default function EditScheduleForm({
  selectedSchedule,
  editSchedule,
  removeSchedule,
  onHide,
  addRepeatInfo,
  editRepeatInfo,
  removeRepeatInfo,
  repeatedScheduleInfo,
  addSchedule,
}) {
  const {
    id,
    text,
    studentId,
    tagId,
    time,
    memo,
    linkedRepeatedScheduleInfoId,
  } = selectedSchedule;

  const handleSubmit = () => {
    const hasLinked: boolean =
      selectedSchedule.linkedRepeatedScheduleInfoId !== 'none';

    // 기존의 스케줄에 연결된 반복정보가 있고, 그 반복정보를 변경한 경우
    if (repeat && hasLinked) {
      onShowSubmitOptionModal();
      return;
    }

    // 기존의 스케줄에 연결된 반복정보가 있고, 반복정보를 제거하는 경우
    if (!repeat && hasLinked) {
      handle_REMOVE_REPEAT();
      return;
    }

    // 기존의 스케줄에 연결된 반복정보가 없고, 반복정보를 생성하는 경우
    if (repeat && !hasLinked) {
      handle_ADD_REPEAT();
      return;
    }

    // 기존의 스케줄에 연결된 반복정보가 없고, 반복정보를 추가하지 않아 반복정보 관련 작업을 수행하지 않는 경우
    if (!repeat && !hasLinked) {
      handle_NOTHING_WITH_REPEAT();
    }
  };

  // const handle_EDIT_REPEAT = () => {
  //   switch (submitOption) {
  //     case 'ONLY_THIS': // TODO: 이 일정: 이 일정만 수정
  //       handle_NOTHING_WITH_REPEAT();
  //       break;
  //     case 'ALL': // TODO: 모든 일정: 일정 수정, 반복 정보 수정
  //       editRepeatInfo(
  //         new RepeatedScheduleInfo(
  //           linkedRepeatedScheduleInfoId,
  //           getFormWorkSchedule(),
  //           getEndAfter(),
  //           newStart,
  //           getWeeklySchedule(startTimes, endTimes, selectedDays),
  //         ),
  //       );
  //       onHide();
  //       break;

  //     case 'FORWARD': // TODO: 이 일정 및 향후 일정
  //       console.warn('어서 일해라');
  //       onHide();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handle_ADD_REPEAT = () => {
    const newId: string = addRepeatInfo(
      getFormWorkSchedule(),
      getEndAfter(),
      newStart,
      getWeeklySchedule(startTimes, endTimes, selectedDays),
    );
    removeSchedule(id);
    // editSchedule(new ScheduleType(id, newId, getFormWorkSchedule()));
    onHide();
  };

  const handle_REMOVE_REPEAT = () => {
    // 반복정보 삭제, 이 일정을 제외한 반복일정 모두 삭제, 기존 스케줄 수정
    removeRepeatInfo(linkedRepeatedScheduleInfoId);
    editSchedule(getFormWorkSchedule(), id);
    onHide();
  };

  const handle_NOTHING_WITH_REPEAT = () => {
    // 기존 스케줄 수정
    editSchedule(getFormWorkSchedule(), id);
    onHide();
  };

  const [submitOptionModalVisible, setSubmitOptionModalVisible] = useState(
    false,
  );

  // create / edit schedule
  const { start, end } = time;
  const [newText, setText] = useState(text);
  const [selectedStudentId, selectStudent] = useState(studentId);
  const [selectedTagId, selectTag] = useState(tagId);

  const [newStart, setStart] = useState(start);
  const [newEnd, setEnd] = useState(end);
  const [newMemo, setMemo] = useState(memo);

  const onHideSubmitOptionModal = () => {
    setSubmitOptionModalVisible(false);
  };

  const onShowSubmitOptionModal = () => {
    setSubmitOptionModalVisible(true);
  };

  // create / edit repeatedScheduleInfo

  const [repeat, setRepeat] = useState(linkedRepeatedScheduleInfoId !== 'none');

  const { endAfter, weeklySchedule } = repeatedScheduleInfo
    ? repeatedScheduleInfo
    : {
        endAfter: defaultEndAfter,
        weeklySchedule: defaultWeeklySchedule,
      };

  var lastDay = (endAfter as EndAfterThisDay).endDay;
  var endNumTimes = (endAfter as EndAfterNTimes).numOfTimes;

  const [endPointMode, setEndPoint] = useState(lastDay ? 'lastDay' : 'times');

  const [endAfterNumTimes, setEndAfterNumTimes] = useState(
    endNumTimes ? endNumTimes : 5,
  );

  const [newLastDay, setLastDay] = useState(
    lastDay ? lastDay : dayjs().add(20, 'day'),
  );

  const [reminder, setReminder] = useState(30); // remind this schedule before x minutes

  const [startTimes, setStartTimes] = useState(
    weeklyScheduleParser(weeklySchedule).startTimes,
  );
  const [endTimes, setEndTimes] = useState(
    weeklyScheduleParser(weeklySchedule).endTimes,
  );
  const [selectedDays, selectDays] = useState(
    weeklyScheduleParser(weeklySchedule).selectedDays,
  );

  // const [submitOption, setSubmitOption] = useState('NONE');

  const getFormWorkSchedule = () => {
    return new FormWorkScheduleType(
      newText,
      selectedStudentId,
      selectedTagId,
      new LessonTime(newStart, newEnd),
      newMemo,
    );
  };

  const getEndAfter = () => {
    var endAfter: EndAfterType =
      endPointMode === 'lastDay'
        ? ({ endDay: lastDay } as EndAfterThisDay)
        : ({ numOfTimes: endAfterNumTimes } as EndAfterNTimes);
    return endAfter;
  };

  const onSaveSubmitOption = (
    value: 'ONLY_THIS' | 'ALL' | 'FORWARD' | 'NONE',
  ) => {
    console.warn('submitOption: ' + value);
    switch (value) {
      case 'ONLY_THIS': // TODO: 이 일정: 이 일정만 수정
        handle_NOTHING_WITH_REPEAT();
        break;
      case 'ALL': // TODO: 모든 일정: 일정 수정, 반복 정보 수정
        editRepeatInfo(
          new RepeatedScheduleInfo(
            linkedRepeatedScheduleInfoId,
            getFormWorkSchedule(),
            getEndAfter(),
            newStart,
            getWeeklySchedule(startTimes, endTimes, selectedDays),
          ),
        );
        onHide();
        break;

      case 'FORWARD': // TODO: 이 일정 및 향후 일정
        console.warn('어서 일해라');
        onHide();
        break;
      default:
        break;
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
                setEndPoint={setEndPoint}
                newEndPoint={endPointMode}
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

          <SubmitOptionModal
            visible={submitOptionModalVisible}
            onSubmit={onSaveSubmitOption}
            onHide={onHideSubmitOptionModal}
          />

          <MemoBox newMemo={newMemo} onChangeMemo={onChangeMemo} />
        </View>
      </ScrollView>
    </View>
  );
}
