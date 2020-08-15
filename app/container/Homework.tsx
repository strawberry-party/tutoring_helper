import 'react-native-gesture-handler';

import {
  AddAssignModal,
  EditAssignModal,
} from '../component/Homework/AssignModal';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import AddAssignButton from '../component/Homework/AddAssignButton';
import AssignList from '../component/Homework/AssignList';
import { AssignType } from '../types/homework';
import Filter from '../component/Homework/FilterSorter';
import React from 'react';
import { RootState } from '../states';
import { actions as assignActions } from '../states/assignState';
import { actions as filterSorterActions } from '../states/assignFilterSorterState';
import { actions as modalVisibilityActions } from '../states/assignModalState';

type HomeworkContainerProps = any; // TODO: 타입 정의, any 대체하기

// type HomeworkContainerProps = any;
function HomeworkContainer({
  hideAddModal,
  showAddModal,
  hideEditModal,
  showEditModal,

  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,

  showAll,
  showCompleted,
  showIncomplete,
}: HomeworkContainerProps) {
  const assigns: Array<AssignType> = useSelector(
    (state: RootState) => state.assignReducer.assigns,
  );

  const addModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.addModalVisible,
  );

  const editModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.editModalVisible,
  );

  const selectedAssignId: string = useSelector(
    (state: RootState) => state.assignModalReducer.selectedAssignId,
  );

  const selectedAssign: AssignType = useSelector(
    (state: RootState) => state.assignModalReducer.selectedAssign,
  );

  const filter = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.filter,
  );

  const sorter = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.sorter,
  );

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        borderColor: 'grey',
        borderWidth: 3,
        padding: 10,
      }}>
      <Text style={styles.titleText}>숙제 관리</Text>

      <View style={{ borderColor: 'green', borderWidth: 3, flex: 1 }}>
        <View style={{ backgroundColor: 'pink' }}>
          <Filter
            activeFilter={filter}
            showAll={showAll}
            showCompleted={showCompleted}
            showIncomplete={showIncomplete}
          />
        </View>

        <ScrollView
          style={{
            borderColor: 'skyblue',
            borderWidth: 3,
          }}>
          <View
            style={{
              borderColor: 'blue',
              borderWidth: 3,
            }}>
            <AssignList
              assigns={assigns}
              showEditModal={showEditModal}
              onCompleteAssign={completeAssign}
              onIncompleteAssign={incompleteAssign}
              onRemoveAssign={removeAssign}
              activeFilter={filter}
            />
          </View>
        </ScrollView>

        <View style={{ borderColor: 'pink', borderWidth: 3 }}>
          <AddAssignModal
            addModalVisible={addModalVisible}
            hideAddModal={hideAddModal}
            addAssign={addAssign}
          />
        </View>

        <View style={{ borderColor: 'pink', borderWidth: 3 }}>
          <EditAssignModal
            editModalVisible={editModalVisible}
            selectedAssignId={selectedAssignId}
            hideEditModal={hideEditModal}
            editAssign={editAssign}
            selectedAssign={selectedAssign}
          />
        </View>
      </View>

      <AddAssignButton
        addModalVisible={addModalVisible}
        showAddModal={showAddModal}
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
});

function mapStateToProps(state) {
  return {
    assigns: state.assignReducer.assigns,
    // assigns: state.assignReducer.assigns.filter((assign: AssignType) => {
    //   switch (state.filter) {
    //     case typeof 'ALL':
    //       return true;
    //     case typeof 'COMPLETED':
    //       return assign.isCompleted;
    //     case typeof 'INCOMPLETED':
    //       return !assign.isCompleted;
    //     default:
    //       console.log('something went wrong on Homework.tsx mapStateToProps');
    //       return true;
    //   }
    // }), // apply filter later
    addModalVisible: state.assignModalReducer.addModalVisible,
    filter: state.assignFilterSorterReducer.filter,
    sorter: state.assignFilterSorterReducer.sorter,
  };
}

// function mapDispatchToProps(dispatch) {
//   bindActionCreators(Object.assign({}, assignActions, modalVisibilityActions), dispatch);
// }

const mapDispatchToProps = Object.assign(
  {},
  assignActions,
  modalVisibilityActions,
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
