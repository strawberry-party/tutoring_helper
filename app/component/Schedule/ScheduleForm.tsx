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
  if (new Set(Object.keys(time)).has('scheduleUnit')) {
    return Object.assign({ repeatType: 'true' }, time as RepeatedScheduleInfo);
  } else
    return Object.assign(
      {
        repeatType: 'false',
        days: 'none',
        scheduleUnit: 'none',
      },
      time as LessonTime,
    );
}

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const dayChips = dayList.map((day, index) => (
  <TouchableHighlight
    underlayColor="#bbb"
    style={{
      alignItems: 'center',
      margin: 3,
      width: 40,
      backgroundColor: '#ddd',
      borderRadius: 20,
      padding: 5,
    }}
    onPress={() => {
      console.warn('hi');
    }}
    key={index}>
    <View>
      <Text
        style={{
          textAlign: 'center',
        }}>
        {day}
      </Text>
    </View>
  </TouchableHighlight>
));

function DayDatePicker({onConfirm}) {
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
        alignContent: 'center',
        marginVertical: 5,
      }}>
      <View
        style={{
          alignItems: 'center',
          marginRight: 10,
          width: 40,
          backgroundColor: '#ddd',
          borderRadius: 20,
          padding: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          {day}
        </Text>
      </View>

      <DayDatePicker onConfirm={() => {}} />

      <Text> ~ </Text>
      <MyDatePicker
        onConfirm={() => {}}
        day={dayjs()}
        mode="time"
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignContent: 'center',
        }}
        dateTextStyle={{ fontSize: 15, color: 'black' }}
      />
    </View>
  ));

  return dayTimePicker;
  // return <View> {dayTimePicker} </View>;
}

export default function ScheduleForm({ selectedSchedule }) {
  const { text, studentId, tagId, time, memo } = selectedSchedule;

  const { start, end, repeatType, days, scheduleUnit } = parseTime(time);

  const [newText, setText] = useState(text);
  const [selectedStudentId, selectStudent] = useState(studentId);
  const [selectedTagId, selectTag] = useState(tagId);

  const [newStart, setStart] = useState(start);
  const [newEnd, setEnd] = useState(end);
  const [repeat, setRepeat] = useState(repeatType);

  const [newDays, setDays] = useState(days);
  const [newScheduleUnit, setScheduleUnit] = useState(scheduleUnit);

  const [endAfterNumWeek, setEndAfterNumWeek] = useState(0);
  const [endAfterNumTimes, setEndAfterNumTimes] = useState(0);

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
  const onConfirmstart = (date: Date) => {
    setStart(dayjs(date));
  };

  function getTagComponents(style = {}) {
    var tagComponents: JSX.Element[] = [];

    return <Text> TagSelector </Text>;
  }

  const onChangeTitle = (text) => {
    setText(text);
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
              <Picker.Item label="김태형" value="student_1" />
              <Picker.Item label="최상아" value="student_2" />
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
              <Picker.Item label="수학" value="tag_1" />
              <Picker.Item label="과학" value="tag_2" />
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
                onConfirm={onConfirmstart}
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
            <View style={[styles.inputContainer]}>
              <Text style={styles.headline}> 반복 종료 시점 </Text>
              <View>
                <Pressable
                  onPress={() => {
                    setScheduleUnit('false');
                  }}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="week"
                      status={
                        newScheduleUnit === 'week' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setScheduleUnit('week')}
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
                      disabled={!(newScheduleUnit === 'week')}
                      maxLength={2}
                    />

                    <Text style={[styles.inputText, { marginTop: 6 }]}>
                      주 후
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setScheduleUnit('times');
                  }}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="times"
                      status={
                        newScheduleUnit === 'times' ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        setScheduleUnit('times');
                      }}
                    />
                    <TextInput
                      mode="outlined"
                      style={{ height: 25, marginRight: 10 }}
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setEndAfterNumTimes(Number(text));
                      }}
                      value={
                        endAfterNumTimes !== 0
                          ? endAfterNumTimes.toString()
                          : ''
                      }
                      disabled={!(newScheduleUnit === 'times')}
                      maxLength={2}
                    />
                    <Text style={[styles.inputText, { marginTop: 6 }]}>
                      회 후
                    </Text>
                  </View>
                </Pressable>
              </View>

              <Text style={styles.headline}> 요일 </Text>
              <View style={styles.tagContainer}>{dayChips}</View>
              <Text style={styles.headline}> 요일별 수업 시간 </Text>
              {getDays(dayList)}
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: 'transparent' },
            ]}>
            <Text style={styles.headline}> 메모 </Text>
            <TextInput
              value={newText}
              onChangeText={onChangeTitle}
              style={[styles.inputText, styles.memoContainer]}
              multiline
            />
          </View>
        </View>
      </ScrollView>
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
