import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { RepeatedScheduleInfo, ScheduleType } from '../types/schedule';
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
import ScheduleFormModal from '../component/Schedule/ScheduleFormModal';
import StudentCalendar from '../component/Schedule/StudentCalendar';

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

  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [repeatInfos, setRepeatInfos] = useState(repeatedScheduleInfoList);
  const [selectedSchedule, setSelectedSchedule] = useState(new ScheduleType());
  const [selectedScheduleId, setSelectedScheduleId]: [
    number | 'none',
    React.Dispatch<React.SetStateAction<number | 'none'>>,
  ] = useState('none');

  const addSchedule = (schedule: ScheduleType) => {
    setSchedules(schedules.concat(schedule));
    setSelectedSchedule(schedule);
    setSelectedScheduleId(schedules.length - 1);
  };

  const editSchedule = (newSchedule: ScheduleType, scheduleId: number) => {
    setSchedules([
      ...schedules.slice(scheduleId),
      newSchedule,
      ...schedules.slice(scheduleId + 1, schedules.length),
    ]);

    setSelectedSchedule(newSchedule);
    setSelectedScheduleId(scheduleId);
  };

  const removeSchedule = (scheduleId: number) => {
    setSelectedSchedule(new ScheduleType());
    setSelectedScheduleId('none');
    setSchedules(schedules.filter((item, id) => id !== scheduleId));
  };

  const addRepeatInfo = (repeatInfo: RepeatedScheduleInfo) => {
    setRepeatInfos(repeatInfos.concat(repeatInfo));
  };

  const editRepeatInfo = (
    repeatInfo: RepeatedScheduleInfo,
    repeatInfoId: number,
  ) => {
    setRepeatInfos([
      ...repeatInfos.slice(repeatInfoId),
      repeatInfo,
      ...repeatInfos.slice(repeatInfoId + 1, repeatInfos.length),
    ]);
  };

  const removeRepeatInfo = (repeatInfoId: number) => {
    setRepeatInfos(repeatInfos.filter((item, id) => id !== repeatInfoId));
  };

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
            // backgroundColor: 'pink',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <PushMaker />
          {/* <AlarmDialog text="알림" /> */}
        </View>

        <StudentCalendar
          selectedSchedule={selectedSchedule}
          selectedScheduleId={selectedScheduleId}
          onPressSchedule={(
            schedule: ScheduleType,
            scheduleId: number | 'none',
          ) => {
            setSelectedSchedule(schedule);
            setSelectedScheduleId(scheduleId);
            setDetailVisible(true);
          }}
          schedules={schedules}
        />

        <View style={styles.mock}>
          <ScheduleFormModal
            modalVisible={formVisible}
            selectedSchedule={selectedSchedule}
            selectedScheduleId={selectedScheduleId}
            hideModal={() => {
              setFormVisible(false);
              setDetailVisible(true);
            }}
            addSchedule={addSchedule}
            editSchedule={editSchedule}
          />
        </View>

        <View style={styles.mock}>
          <ScheduleDetailModal
            showModal={() => setDetailVisible(true)}
            modalVisible={detailVisible}
            selectedSchedule={selectedSchedule}
            hideModal={() => setDetailVisible(false)}
            removeSchedule={removeSchedule}
            repeatedScheduleInfos={repeatInfos}
            selectedScheduleId={selectedScheduleId}
            showFormModal={() => setFormVisible(true)}
          />
        </View>
      </View>

      <AddButton visible={formVisible} show={() => setFormVisible(true)} />
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
