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
import {
  schedules as initialSchedules,
  repeatedScheduleInfoList,
} from '../common/scheduleMockData';

import AddButton from '../component/common/AddButton';
import AlarmDialog from '../component/common/AlarmDialog';
import PushMaker from '../component/common/PushMaker';
import { RootState } from '../states';
import ScheduleDetailModal from '../component/Schedule/ScheduleDetailModal';
import ScheduleTester from '../component/Schedule/ScheduleTester';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import _ from 'lodash';
import formWorkScheduleGenerator from '../component/Schedule/scheduleUtils/formWorkScheduleGenerator';
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
}: ScheduleContainerProps) {
  const schedules = useSelector((state) => state.scheduleReducer.schedules);
  const repeatInfos = useSelector((state) => state.scheduleReducer.repeatInfos);
  const selectedScheduleId = useSelector(
    (state) => state.scheduleReducer.selectedScheduleId,
  );

  const dailyAgendas = sortIntoDailyAgendas(schedules);

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);

  // useEffect(() => {
  //   console.log('==========CHANGED repeatInfos ====');
  //   repeatInfos.map((item: RepeatedScheduleInfo) => item.print());
  //   console.log('====================================');
  // }, [repeatInfos]);

  // useEffect(() => {
  //   console.log('==========CHANGED SCHEDULES==============');
  //   schedules.forEach((item: ScheduleType) => item.print());
  //   console.log('====================================');
  // }, [schedules]);

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
          {/* <AlarmDialog text="알림" /> */}
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
            addSchedule={addSchedule}
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
            removeSchedule={removeSchedule}
            addSchedule={addSchedule}
          />
        </View>

        <View style={styles.mock}>
          <ScheduleDetailModal
            selectedSchedule={getSchedule()}
            showModal={() => setDetailVisible(true)}
            modalVisible={detailVisible}
            hideModal={() => setDetailVisible(false)}
            removeSchedule={removeSchedule}
            repeatedScheduleInfos={repeatInfos}
            selectedScheduleId={selectedScheduleId}
            showFormModal={() => setEditFormVisible(true)}
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
  };
}

const mapDispatchToProps = Object.assign({}, scheduleActions);

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
