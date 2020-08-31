import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import AddButton from '../component/common/AddButton';
import AlarmDialog from '../component/common/AlarmDialog';
import PushMaker from '../component/common/PushMaker';
import { RootState } from '../states';
import ScheduleModal from '../component/Schedule/ScheduleModal';
import { ScheduleType } from '../types/schedule';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import { actions as tagActions } from '../states/tagState';

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

  const tags = useSelector((state: RootState) => state.tagReducer.tags);
  const [formVisible, setFormVisible] = useState(false);

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
          <AlarmDialog text="알림" />
        </View>

        <ScrollView
          style={{
            borderColor: 'skyblue',
            // borderWidth: 3,
          }}>
          <View
            style={{
              borderColor: 'blue',
              // borderWidth: 3,
            }}>
            <StudentCalendar />
          </View>
        </ScrollView>

        <View style={styles.mock}>
          <ScheduleModal
            modalVisible={formVisible}
            selectedSchedule={new ScheduleType()}
            hideModal={() => setFormVisible(false)}
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

const mapDispatchToProps = Object.assign({ tagActions });

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
