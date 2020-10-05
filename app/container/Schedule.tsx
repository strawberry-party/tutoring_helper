import 'react-native-gesture-handler';

import {
  AddScheduleModal,
  EditScheduleModal,
} from '../component/Schedule/ScheduleFormModal';
import {
  FormWorkScheduleType,
  RepeatedScheduleInfo,
  ScheduleType,
} from '../types/schedule';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import AddButton from '../component/common/AddButton';
import { Button } from 'react-native-paper';
import { FilterButton } from '../component/common/Buttons';
import FilterModal from '../component/Schedule/FilterModal';
import PushMaker from '../component/common/PushMaker';
import { RootState } from '../states';
import ScheduleDetailModal from '../component/Schedule/ScheduleDetailModal';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import _ from 'lodash';
import dayjs from 'dayjs';
import { actions as reminderActions } from '../states/reminderState';
import { actions as scheduleActions } from '../states/scheduleState';
import sortIntoDailyAgendas from '../component/Schedule/scheduleUtils/sortIntoDailyAgendas';

// import { FilterButton } from '../component/Schedule/FilterSorter';
// import FilterModal from '../component/Schedule/FilterModal';

type ScheduleContainerProps = any; // TODO: 타입 정의, any 대체하기

// type ScheduleContainerProps = any;
function ScheduleContainer({
  selectSchedule,
  addSchedule,
  removeSchedule,
  editSchedule,

  addRepetition,
  removeRepetition,
  editRepetition,

  addReminder,
  removeReminder,
}: ScheduleContainerProps) {
  const subjectTags = useSelector(
    (state: RootState) => state.tagReducer.subjectTags,
  );
  const bookTags = useSelector((state: RootState) => state.tagReducer.bookTags);
  const reminders = useSelector((state) => state.scheduleReducer.reminders);

  const schedules = useSelector((state) => state.scheduleReducer.schedules);
  const repeatInfos = useSelector((state) => state.scheduleReducer.repeatInfos);
  const selectedScheduleId = useSelector(
    (state) => state.scheduleReducer.selectedScheduleId,
  );

  const dailyAgendas = sortIntoDailyAgendas(schedules);

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const [activeFilter, setActiveFilter] = useState({
    type: 'some' as 'all' | 'none' | 'some',
    students: ['student_1'],
    tags: ['tag_1'],
    durationStart: dayjs(),
    durationEnd: dayjs(),
  });

  const onAddSchedule = (
    formWorkSchedule,
    linkedRepeatedScheduleInfoId = 'none',
  ) => {
    addSchedule(formWorkSchedule, linkedRepeatedScheduleInfoId);

    // var myPromise = new Promise(function (resolve, reject) {
    //   addSchedule(formWorkSchedule, linkedRepeatedScheduleInfoId);
    //   setTimeout(function () {
    //     resolve();
    //   }, 200);
    // });

    // const formworkReminder = {
    //   title:
    //     formWorkSchedule.text + ` 시작 ${formWorkSchedule.reminder}분 전입니다`,
    //   message:
    //     formWorkSchedule.time.start.format('H시 m분') +
    //     ' 부터 ' +
    //     formWorkSchedule.time.end.format('H시 m분') +
    //     ' 까지',
    //   date: formWorkSchedule.time.start
    //     .subtract(formWorkSchedule.reminder, 'm')
    //     .toDate(),
    // };
    // myPromise.then(() => addReminder(formworkReminder, selectedScheduleId));
    // // addReminder(formworkReminder, selectedScheduleId);
  };

  const onRemoveSchedule = (id: string) => {
    console.log('onRemoveSchedule: ' + id);
    removeSchedule(id);
    // removeReminder(id);
  };

  useEffect(() => {
    if (selectedScheduleId === 'none') setDetailVisible(false);
  }, [selectedScheduleId]);

  function getRepeatInfo(): RepeatedScheduleInfo {
    const selectedSchedule = getSchedule();
    if (selectedSchedule === 'none') return new RepeatedScheduleInfo('none');
    else
      return repeatInfos.find(
        (item) => item.id === selectedSchedule.linkedRepeatedScheduleInfoId,
      );
  }

  function getSchedule(): ScheduleType | 'none' {
    const selectedSchedule = schedules.find(
      (item) => item.id === selectedScheduleId,
    );
    return selectedSchedule ? selectedSchedule : 'none';
  }

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        borderColor: 'grey',
        // borderWidth: 3,
        padding: 10,
      }}>
      <Text style={styles.titleText}>일정 관리</Text>
      <View style={{ borderColor: 'green', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <PushMaker />
          <Button
            onPress={() => {
              console.log('Reminder: ');
              reminders.forEach((reminder) => console.log(reminder));
            }}>
            리마인더 출력하기
          </Button>
          <FilterButton showFilterModal={() => setFilterVisible(true)} />
        </View>

        {/* <Text> 헬로 월드 </Text> */}

        {/* <ScrollView>
          <View>
            <ScheduleTester
              repeatInfos={repeatInfos}
              schedules={schedules}
              dailyAgendas={dailyAgendas}
            /> */}
        <StudentCalendar
          selectedSchedule={getSchedule()}
          selectedScheduleId={selectedScheduleId}
          onPressSchedule={(schedule: ScheduleType) => {
            selectSchedule(schedule.id);
            setDetailVisible(true);
          }}
          schedules={schedules}
          repeatInfos={repeatInfos}
          dailyAgendas={dailyAgendas}
        />
        {/* </View>
        </ScrollView> */}
        <View style={styles.mock}>
          <AddScheduleModal
            modalVisible={addFormVisible}
            hideModal={() => {
              setAddFormVisible(false);
            }}
            addSchedule={onAddSchedule}
            addRepeatInfo={addRepetition}
          />
        </View>

        <View style={styles.mock}>
          <EditScheduleModal
            modalVisible={editFormVisible}
            hideModal={() => {
              setEditFormVisible(false);
            }}
            selectedSchedule={getSchedule()}
            editSchedule={editSchedule}
            addRepeatInfo={addRepetition}
            editRepeatInfo={editRepetition}
            repeatedScheduleInfo={getRepeatInfo()}
            removeRepeatInfo={removeRepetition}
            removeSchedule={onRemoveSchedule}
            addSchedule={addSchedule}
          />
        </View>

        <View style={styles.mock}>
          <ScheduleDetailModal
            selectedSchedule={getSchedule()}
            showModal={() => setDetailVisible(true)}
            modalVisible={detailVisible}
            hideModal={() => setDetailVisible(false)}
            removeSchedule={onRemoveSchedule}
            repeatedScheduleInfos={repeatInfos}
            selectedScheduleId={selectedScheduleId}
            showFormModal={() => setEditFormVisible(true)}
          />
        </View>

        <View style={styles.mock}>
          <FilterModal
            modalVisible={filterVisible}
            hideModal={() => setFilterVisible(false)}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            data={{
              tags: new Map([
                ['tag_1', '수학'],
                ['tag_2', '과학'],
              ]),
              students: new Map([
                ['student_1', '김태형'],
                ['student_2', '최상아'],
              ]),
            }}
            // duration={{start: '2020-09-10', end:'2020-10-10'}}
          />
        </View>
      </View>

      <AddButton
        visible={addFormVisible}
        show={() => setAddFormVisible(true)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 100, // 하단바 높이에 따라 조절
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },

  mock: {
    borderColor: 'pink',
    // borderWidth: 3,
    height: 2,
  },
});

function mapStateToProps(state) {
  return {
    schedules: state.scheduleReducer.schedules,
    repeatInfos: state.scheduleReducer.repeatInfos,
    selectedScheduleId: state.scheduleReducer.selectedScheduleId,
    reminders: state.reminderReducer.reminders,
  };
}

const mapDispatchToProps = Object.assign({}, scheduleActions, reminderActions);

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
