import 'react-native-gesture-handler';

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import AddAssignButton from '../component/common/AddButton';
import AlarmDialog from '../component/common/AlarmDialog';
import AssignList from '../component/Homework/AssignList';
import AssignModal from '../component/Homework/AssignModal';
import { AssignType } from '../types/homework';
import { FilterButton } from '../component/Homework/FilterSorter';
import FilterModal from '../component/Homework/FilterModal';
import PushMaker from '../component/common/PushMaker';
import React from 'react';
import { RootState } from '../states';
import { actions as assignActions } from '../states/assignState';
import { actions as filterSorterActions } from '../states/assignFilterSorterState';
import { actions as modalVisibilityActions } from '../states/assignModalState';
import { actions as tagActions } from '../states/tagState';

type HomeworkContainerProps = any; // TODO: 타입 정의, any 대체하기

// type HomeworkContainerProps = any;
function HomeworkContainer({
  
  hideAddModal,
  showAddModal,
  hideEditModal,
  showEditModal,
  showFilterModal,
  hideFilterModal,

  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,

  showAll,
  showCompleted,
  showIncomplete,
  sortDsc,
  sortAsc,
  sortDue,
  sortOut,
  sortTitle,

  showSelectedTags,

  addTag,
}: HomeworkContainerProps) {
  // const tagMap: Map<string, TagType> = useSelector(
  //   (state: RootState) => state.tagReducer.tagMap,
  // );

  const assignMap: Map<string, AssignType> = useSelector(
    (state: RootState) => state.assignReducer.assignMap,
  );

  const addModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.addModalVisible,
  );

  const editModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.editModalVisible,
  );

  const filterModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.filterModalVisible,
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

  const sorterDir = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.sorterDir,
  );

  const tagFilter = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.tagFilter,
  );

  const tags = useSelector((state: RootState) => state.tagReducer.tags);

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        borderColor: 'grey',
        // borderWidth: 3,
        padding: 10,
      }}>
      <Text style={styles.titleText}>숙제 관리</Text>
      <View style={{ borderColor: 'green', flex: 1 }}>
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FilterButton
            showFilterModal={showFilterModal}
            // activeSorter={sorter}
            // activeSorterDir={sorterDir}
            // sorterDirActions={{ sortDsc, sortAsc }}
            // sorterActions={{ sortDue, sortOut, sortTitle }}
          />
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
            <AssignList
              assignMap={assignMap}
              showEditModal={showEditModal}
              onCompleteAssign={completeAssign}
              onIncompleteAssign={incompleteAssign}
              onRemoveAssign={removeAssign}
              activeFilter={filter}
              activeSorter={sorter}
              activeSorterDir={sorterDir}
              activeTagFilter={tagFilter}
              completed={0}
              tags={tags}
            />
          </View>
        </ScrollView>

        <View style={styles.mock}>
          <AssignModal
            modalVisible={addModalVisible}
            hideModal={hideAddModal}
            onSubmit={addAssign}
            tags={tags}
            onAddTag={addTag}
            modalType={'AddModal'}
            selectedAssignId={'none'}
            selectedAssign={new AssignType()}
          />
        </View>

        <View style={styles.mock}>
          <AssignModal
            modalVisible={editModalVisible}
            selectedAssignId={selectedAssignId}
            hideModal={hideEditModal}
            onSubmit={editAssign}
            selectedAssign={selectedAssign}
            modalType={'EditModal'}
            tags={tags}
            onAddTag={addTag}
          />
        </View>

        <View style={styles.mock}>
          <FilterModal
            modalVisible={filterModalVisible}
            hideModal={hideFilterModal}
            tags={tags}
            onAddTag={addTag}
            activeFilter={filter}
            tagFilter={tagFilter}
            filterActions={{
              showAll,
              showCompleted,
              showIncomplete,
              showSelectedTags,
            }}
          />
        </View>
      </View>

      <AddAssignButton
        visible={addModalVisible}
        show={showAddModal}
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
    assigns: state.assignReducer.assigns,
    tags: state.tagReducer.tags,
    addModalVisible: state.assignModalReducer.addModalVisible,
    filterModalVisible: state.assignModalReducer.filterModalVisible,
    filter: state.assignFilterSorterReducer.filter,
    sorter: state.assignFilterSorterReducer.sorter,
  };
}

// function mapDispatchToProps(dispatch) {
//   bindActionCreators(Object.assign({}, assignActions, modalVisibilityActions), dispatch);
// }

// const myMApDispatchToPRops = (callback) => store.dispatch(callback)

const mapDispatchToProps = Object.assign(
  {},
  assignActions,
  modalVisibilityActions,
  filterSorterActions,
  tagActions,
);

// { addAssign: addAssign, }

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
