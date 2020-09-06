import 'react-native-gesture-handler';

import React, { useState } from 'react';
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
import ScheduleModal from '../component/Schedule/ScheduleModal';
import { ScheduleType } from '../types/schedule';
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
  const [schedules, setSchedules] = useState(initialSchedules);
  const [repeatInfos, setRepeatInfos] = useState(repeatedScheduleInfoList);
  const [selectedSchedule, setSelectedSchedule] = useState(new ScheduleType());

  const addSchedule = (schedule: ScheduleType) => {
    setSchedules([...schedules, schedule])
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
            // backgroundColor: 'pink',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <PushMaker />
          {/* <AlarmDialog text="알림" /> */}
        </View>

        <StudentCalendar
          selectedSchedule={selectedSchedule}
          onPressSchedule={(schedule) => {
            // setSelectedSchedule(schedule);
            console.warn(schedule.text);
          }}
          schedules={schedules}
        />

        <View style={styles.mock}>
          <ScheduleModal
            modalVisible={formVisible}
            selectedSchedule={selectedSchedule}
            hideModal={() => setFormVisible(false)}
            addSchedule={addSchedule}
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
