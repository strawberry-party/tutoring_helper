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
import StudentCalendar from '../component/Schedule/StudentCalendar';
import _ from 'lodash';
import formWorkScheduleGenerator from '../component/Schedule/scheduleUtils/formWorkScheduleGenerator';

// import { FilterButton } from '../component/Schedule/FilterSorter';
// import FilterModal from '../component/Schedule/FilterModal';

type ScheduleContainerProps = any; // TODO: 타입 정의, any 대체하기

// type ScheduleContainerProps = any;
function ScheduleContainer({}: ScheduleContainerProps) {
  // const schedules: Map<string, AssignType> = useSelector(
  //   (state: RootState) => state.assignReducer.assignMap,
  // );

  // const selectedScheduleId: string = useSelector(
  //   (state: RootState) => state.assignModalReducer.selectedAssignId,
  // );

  // const filter = useSelector(
  //   (state: RootState) => state.assignFilterSorterReducer.filter,
  // );

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const [detailVisible, setDetailVisible] = useState(false);

  const [schedules, setSchedules] = useState(initialSchedules);
  const [repeatInfos, setRepeatInfos] = useState(repeatedScheduleInfoList);

  const [selectedScheduleId, setSelectedScheduleId] = useState('none');

  const [mode, setMode] = useState('INITIAL');

  const makeSchedule = (
    formWork: FormWorkScheduleType,
    linkedRepeatedScheduleInfoId: string,
  ) => {
    var newId: string = _.uniqueId('schedule_');
    return new ScheduleType(newId, linkedRepeatedScheduleInfoId, formWork);
  };

  const addSchedule = (
    formWork: FormWorkScheduleType,
    linkedRepeatedScheduleInfoId: string = 'none',
  ) => {
    setSchedules([
      ...schedules,
      makeSchedule(formWork, linkedRepeatedScheduleInfoId),
    ]);
  };

  // 더 생각해봐야할듯
  const editSchedule = (newSchedule: ScheduleType) => {
    setSchedules(
      schedules.map((item: ScheduleType) =>
        item.id === newSchedule.id ? newSchedule : item,
      ),
    );
  };

  const removeSchedule = (scheduleId: string) => {
    setSelectedScheduleId('none');
    setSchedules(
      schedules.filter((item: ScheduleType) => item.id !== scheduleId),
    );
  };

  const makeRepeatInfo = (
    formWork: FormWorkScheduleType,
    endAfter,
    newStart,
    weeklySchedule,
  ) => {
    var newId = _.uniqueId('repeat_');
    return {
      item: new RepeatedScheduleInfo(
        newId,
        formWork,
        endAfter,
        newStart,
        weeklySchedule,
      ),
      id: newId,
    };
  };

  const addRepeatInfo = (
    formWork: FormWorkScheduleType,
    endAfter,
    newStart,
    weeklySchedule,
  ) => {
    // var newId = _.uniqueId('repeat_');
    // var repeatInfo = new RepeatedScheduleInfo(
    //   newId,
    //   formWork,
    //   endAfter,
    //   newStart,
    //   weeklySchedule,
    // );
    // repeatInfo.print();
    const { item, id } = makeRepeatInfo(
      formWork,
      endAfter,
      newStart,
      weeklySchedule,
    );

    item.print();

    setRepeatInfos([...repeatInfos, item]);
    setMode('ADD_REPEAT');
    return id;
  };

  const editRepeatInfo = (repeatInfo: RepeatedScheduleInfo) => {
    setMode('EDIT_REPEAT');
    const {
      formWorkSchedule,
      endAfter,
      startPoint,
      weeklySchedule,
    } = repeatInfo;

    const newRepeatInfo = makeRepeatInfo(
      formWorkSchedule,
      endAfter,
      startPoint,
      weeklySchedule,
    ).item;

    setRepeatInfos(
      repeatInfos
        .filter((item: RepeatedScheduleInfo) => item.id !== repeatInfo.id)
        .concat([newRepeatInfo]),
    );
    // setSchedules(
    //   schedules.filter(
    //     (item: ScheduleType) =>
    //       item.linkedRepeatedScheduleInfoId !== repeatInfo.id,
    //   ),
    // );
    // setSelectedScheduleId('none');
    // setMode('ADD_NEW_SCHEDULES');
    console.log('============EDIT_REPEAT===============');
    console.log(weeklySchedule);
    console.log('====================================');
  };

  useEffect(() => {
    console.log('==========CHANGED repeatInfos ====');
    repeatInfos.map((item: RepeatedScheduleInfo) => item.print());
    console.log('====================================');

    if (mode === 'ADD_REPEAT') {
      var item = repeatInfos[repeatInfos.length - 1];
      var formWorks = formWorkScheduleGenerator(item);
      var newSchedules: ScheduleType[] = [];
      for (let i = 0; i < formWorks.length; i++) {
        formWorks[i].print();
        newSchedules.push(makeSchedule(formWorks[i], item.id));
      }
      setSchedules(schedules.concat(newSchedules));
    } else if (mode === 'REMOVE_REPEAT') {
      console.log('====================================');
      console.log('REMOVING LINKED SCHEDULES');
      console.log('====================================');

      if (getSchedule() === 'none')
        console.error('[ERROR] REMOVE_REPEAT: NO SCHEDULE');
      else {
        var schedule = getSchedule() as ScheduleType;
        setSchedules(
          schedules.filter(
            (item: ScheduleType) =>
              item.linkedRepeatedScheduleInfoId !==
              schedule.linkedRepeatedScheduleInfoId,
          ),
        );
        setSelectedScheduleId('none');
      }
    } else if (mode === 'EDIT_REPEAT') {
      if (getSchedule() === 'none')
        console.error('[ERROR] EDIT_REPEAT: NO SCHEDULE');
      else {
        // var schedule = getSchedule() as ScheduleType;
        // setSchedules(
        //   schedules.filter(
        //     (item: ScheduleType) =>
        //       item.linkedRepeatedScheduleInfoId !==
        //       schedule.linkedRepeatedScheduleInfoId,
        //   ),
        // );
        // setSelectedScheduleId('none');
        var newRepeatInfo = repeatInfos[repeatInfos.length - 1];
        formWorkScheduleGenerator(newRepeatInfo).forEach((item) => {
          console.log('ITEM ADDED IN EDIT REPEAT INFO');
          item.print();
          addSchedule(item, newRepeatInfo.id);
        });
      }
    }
  }, [repeatInfos]);

  useEffect(() => {
    console.log('==========CHANGED SCHEDULES==============');
    schedules.forEach((item: ScheduleType) => item.print());
    console.log('====================================');
  }, [schedules]);

  useEffect(() => {
    if (selectedScheduleId === 'none') setDetailVisible(false);
  }, [selectedScheduleId]);

  const removeRepeatInfo = (repeatInfoId: string, callBack = () => {}) => {
    setRepeatInfos(repeatInfos.filter((item) => item.id !== repeatInfoId));
    setMode('REMOVE_REPEAT');
    callBack();
  };

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

        <StudentCalendar
          selectedSchedule={getSchedule()}
          selectedScheduleId={selectedScheduleId}
          onPressSchedule={(schedule: ScheduleType) => {
            setSelectedScheduleId(schedule.id);
            setDetailVisible(true);
          }}
          schedules={schedules}
        />

        <View style={styles.mock}>
          <AddScheduleModal
            modalVisible={addFormVisible}
            hideModal={() => {
              setAddFormVisible(false);
            }}
            addSchedule={addSchedule}
            addRepeatInfo={addRepeatInfo}
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
            addRepeatInfo={addRepeatInfo}
            editRepeatInfo={editRepeatInfo}
            repeatedScheduleInfo={getRepeatInfo()}
            removeRepeatInfo={removeRepeatInfo}
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
    tags: state.tagReducer.tags,
    filter: state.assignFilterSorterReducer.filter,
  };
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
