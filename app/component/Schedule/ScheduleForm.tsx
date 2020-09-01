import { Button, Input, Item } from 'native-base';
import { Chip, FAB, RadioButton, TextInput } from 'react-native-paper';
import {
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
} from '../../types/schedule';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Tag, { TagForm } from '../common/Tag';

import AlarmDialog from '../common/AlarmDialog';
import MyDatePicker from '../common/MyDatePicker';
import { Picker } from '@react-native-community/picker';
import { TagType } from '../../types/root';
import dayjs from 'dayjs';

type AddSchedule = (assign: ScheduleType) => void;
type EditSchedule = (id: string, assign: ScheduleType) => void;
type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

type AddModal = 'AddModal';
type EditModal = 'EditModal';

interface ScheduleFormProps {
  selectedSchedule: ScheduleType;

  hideModal: () => void;

  onSubmit: AddSchedule | EditSchedule;
  modalType: AddModal | EditModal;
  selectedScheduleId: string;
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

function parseTime(time: LessonTime | RepeatedScheduleInfo) {
  if (new Set(Object.keys(time)).has('endPoint')) {
    return Object.assign({ repeatType: 'true' }, time as RepeatedScheduleInfo);
  } else
    return Object.assign(
      {
        repeatType: 'false',
        dailyScheduleMap: new Map<Days, LessonTime>(),
        endPoint: 'none',
      },
      time as LessonTime,
    );
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

const studentList = [
  { id: 'student_1', name: '김태형' },
  { id: 'student_2', name: '최상아' },
];

const tagList = [
  { id: 'tag_1', name: '수학' },
  { id: 'tag_2', name: '과학' },
];

function extractPickerItem({ id, name }, key) {
  return <Picker.Item label={name} value={id} key={key} />;
}

function extractAllPickerItems(studentList) {
  return studentList.map((info, index) => extractPickerItem(info, index));
}

export default function ScheduleForm({ selectedSchedule }) {
  const { text, studentId, tagId, time, memo } = selectedSchedule;

  const { start, end, repeatType, dailyScheduleMap, endPoint } = parseTime(
    time,
  );

  const [newText, setText] = useState(text);
  const [selectedStudentId, selectStudent] = useState(studentId);
  const [selectedTagId, selectTag] = useState(tagId);

  const [newStart, setStart] = useState(start);
  const [newEnd, setEnd] = useState(end);
  const [newMemo, setMemo] = useState(memo);

  const [repeat, setRepeat] = useState(repeatType);

  const [newEndPoint, setEndPoint] = useState(endPoint);

  const [endAfterNumWeek, setEndAfterNumWeek] = useState(0);
  const [endAfterNumTimes, setEndAfterNumTimes] = useState(0);

  const [newDailyScheduleMap, setDailyScheduleMap] = useState(dailyScheduleMap);

  const handleSubmit = () => {
    const newTime: LessonTime = new LessonTime(newStart, newEnd);

    const newSchedule: ScheduleType = {
      ...selectedSchedule,
      time: newTime,
      tagId: selectedTagId,
    };

    console.warn('schedule submit');
  };

  const onConfirmEnd = (date: Date) => {
    setEnd(dayjs(date));
  };
  const onConfirmStart = (date: Date) => {
    setStart(dayjs(date));
  };

  const onChangeTitle = (text) => {
    setText(text);
  };

  const onChangeMemo = (text) => {
    setMemo(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}> 수업 일정 만들기 </Text>

        <FAB
          style={styles.button}
          onPress={handleSubmit}
          icon="content-save"
          label="저장하기"></FAB>
      </View>

      <ScrollView style={styles.formContainer}>
        <View>
          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: 'transparent' },
            ]}>
            <TextInput
              value={newText}
              onChangeText={onChangeTitle}
              style={[styles.inputText, { fontSize: 20 }]}
              placeholder={'제목 추가'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 학생 </Text>
            <Picker
              selectedValue={selectedStudentId}
              style={{
                borderRadius: 60,
                width: '50%',
                borderWidth: 10,
                borderColor: 'blue',
              }}
              onValueChange={(itemValue, itemIndex) => selectStudent(itemValue)}
              mode="dropdown"
              itemStyle={{ fontSize: 16 }}>
              {extractAllPickerItems(studentList)}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 과목 태그 </Text>
            <Picker
              selectedValue={selectedTagId}
              style={{
                borderRadius: 60,
                width: '50%',
                borderWidth: 10,
                borderColor: 'blue',
              }}
              onValueChange={(itemValue, itemIndex) => selectTag(itemValue)}
              mode="dropdown"
              itemStyle={{ fontSize: 16 }}>
              {extractAllPickerItems(tagList)}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 시간 & 리마인더 </Text>
            <View style={{ padding: 5 }}>
              <MyDatePicker
                onConfirm={onConfirmEnd}
                day={newEnd}
                msg={'시작'}
                mode={'datetime'}
              />
              <MyDatePicker
                onConfirm={onConfirmStart}
                day={newStart}
                msg={'종료'}
                mode={'datetime'}
              />

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AlarmDialog text="안녕" />
                <Text> 리마인더를 설정해보세요 </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: 'transparent' },
            ]}>
            <View>
              <Pressable
                onPress={() => {
                  setRepeat('false');
                }}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="false"
                    status={repeat === 'false' ? 'checked' : 'unchecked'}
                    onPress={() => setRepeat('false')}
                  />
                  <Text style={styles.inputText}>한 번만</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setRepeat('true');
                }}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="true"
                    status={repeat === 'true' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setRepeat('true');
                    }}
                  />
                  <Text style={styles.inputText}>반복하기</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {repeat === 'true' && (
            <View>
              <EndPointSelector
                setEndPoint={setEndPoint}
                newEndPoint={newEndPoint}
                endAfterNumWeek={endAfterNumWeek}
                setEndAfterNumWeek={setEndAfterNumWeek}
                endAfterNumTimes={endAfterNumTimes}
                setEndAfterNumTimes={setEndAfterNumTimes}
              />
              <DailyScheduleSelector />
            </View>
          )}

          <MemoBox newMemo={newMemo} onChangeMemo={onChangeMemo} />
        </View>
      </ScrollView>
    </View>
  );
}

function EndPointSelector({
  setEndPoint,
  newEndPoint,
  endAfterNumWeek,
  setEndAfterNumWeek,
  endAfterNumTimes,
  setEndAfterNumTimes,
}) {
  return (
    <View style={[styles.inputContainer]}>
      <Text style={styles.headline}> 반복 종료 시점 </Text>
      <View>
        <Pressable
          onPress={() => {
            setEndPoint('false');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="week"
              status={newEndPoint === 'week' ? 'checked' : 'unchecked'}
              onPress={() => setEndPoint('week')}
            />
            <TextInput
              mode="outlined"
              style={{
                height: 25,
                marginRight: 10,
                alignItems: 'center',
              }}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                setEndAfterNumWeek(Number(text));
              }}
              value={endAfterNumWeek.toString()}
              disabled={!(newEndPoint === 'week')}
              maxLength={2}
            />

            <Text style={[styles.inputText, { marginTop: 6 }]}>주 후</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setEndPoint('times');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="times"
              status={newEndPoint === 'times' ? 'checked' : 'unchecked'}
              onPress={() => {
                setEndPoint('times');
              }}
            />
            <TextInput
              mode="outlined"
              style={{ height: 25, marginRight: 10 }}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setEndAfterNumTimes(Number(text));
              }}
              value={endAfterNumTimes !== 0 ? endAfterNumTimes.toString() : ''}
              disabled={!(newEndPoint === 'times')}
              maxLength={2}
            />
            <Text style={[styles.inputText, { marginTop: 6 }]}>회 후</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function DailyScheduleSelector() {
  return (
    <View style={[styles.inputContainer]}>
      <Text style={styles.headline}> 요일 </Text>
      <View style={styles.tagContainer}>{dayChips}</View>
      <Text style={styles.headline}> 요일별 수업 시간 </Text>
      {getDays(dayList)}
    </View>
  );
}

function MemoBox({ newMemo, onChangeMemo }) {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
      <Text style={styles.headline}> 메모 </Text>
      <TextInput
        value={newMemo}
        onChangeText={onChangeMemo}
        style={[styles.inputText, styles.memoContainer]}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignContent: 'center',
  },
  memoContainer: {
    minHeight: 50,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    padding: 3,
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#eeef',
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  tagContainer: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    flexGrow: 1,
    borderColor: 'pink',
    // borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  formContainer: {
    borderColor: 'skyblue',
    // borderWidth: 2,
    width: '90%',
    marginBottom: 100,
  },
  inputContainer: {
    marginBottom: 15,
    justifyContent: 'flex-start',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
  },

  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#bbb',
    flex: 1,
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 15,
  },

  button: {
    justifyContent: 'center',
    backgroundColor: '#aec6df',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});