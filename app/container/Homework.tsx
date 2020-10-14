import 'react-native-gesture-handler';

import { AssignType, AssignWOId } from '../types/homework';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import AddAssignButton from '../component/common/AddButton';
import AssignList from '../component/Homework/AssignList';
import AssignModal from '../component/Homework/AssignModal';
import { Button } from 'react-native-paper';
import { FilterButton } from '../component/Homework/Buttons';
import FilterModal from '../component/Homework/FilterModal';
import { RootState } from '../states';
import { actions as assignActions } from '../states/assignState';
import { default as dayjs } from 'dayjs';
import { actions as filterSorterActions } from '../states/assignFilterSorterState';
import { actions as modalVisibilityActions } from '../states/assignModalState';

type HomeworkContainerProps = any; // TODO: 타입 정의, any 대체하기

// type HomeworkContainerProps = any;
function HomeworkContainer({
  hideAddModal,
  showAddModal,
  hideEditModal,
  showEditModal,

  getAssignList,
  getCompleted,

  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,

  showAll,
  showCompleted,
  showIncomplete,
  setVisibleSubjectIds,
  sortDsc,
  sortAsc,
  sortDue,
  sortOut,
  sortTitle,

  showSelectedTags,

  currentStudentId,
  tutorId,
}: HomeworkContainerProps) {
  const initialData = { tutorId, currentStudentId };

  useEffect(() => {
    getAssignList(initialData);
    getCompleted(initialData);
  }, []);

  const onAddAssign = (data) => addAssign({ tutorId, currentStudentId, data });

  const assignList = useSelector((state) => state.assignReducer.assignList);
  console.log('assignList: ', assignList);

  const completed = useSelector((state) => state.assignReducer.completed);
  console.log('completed: ', completed);

  const addModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.addModalVisible,
  );

  const editModalVisible: boolean = useSelector(
    (state: RootState) => state.assignModalReducer.editModalVisible,
  );

  const [filterModalVisible, toggleFilterModal] = React.useState(false);

  const showFilterModal = () => toggleFilterModal(true);
  const hideFilterModal = () => toggleFilterModal(false);

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

  const visibleSubjectTagIds = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.visibleSubjectTagIds,
  );

  const visibleBookTagIds = useSelector(
    (state: RootState) => state.assignFilterSorterReducer.visibleBookTagIds,
  );

  const subjectTags = useSelector(
    (state: RootState) => state.tagReducer.subjectTags,
  );
  const bookTags = useSelector((state: RootState) => state.tagReducer.bookTags);

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
        </View>

        <Button
          onPress={() =>
            onAddAssign({
              text: '과제',
              due: '2020-10-18',
              out: '2020-10-16',
              isCompleted: false,
              bookTagId: 'none',
              subjectTagId: 'none',
            })
          }>
          Press me to add assign
        </Button>

        <ScrollView>
          <View>
            {assignList &&
              (assignList.loading ? (
                <Text>로딩중...</Text>
              ) : assignList.error ? (
                <Text>에러 발생!</Text>
              ) : !assignList.data ? (
                <Text> 과제 정보 없음 </Text>
              ) : (
                <AssignList
                  assigns={assignList.data.val()}
                  showEditModal={showEditModal}
                  onCompleteAssign={completeAssign}
                  onIncompleteAssign={incompleteAssign}
                  onRemoveAssign={removeAssign}
                  activeFilter={filter}
                  activeSorter={sorter}
                  activeSorterDir={sorterDir}
                  visibleSubjectTagIds={visibleSubjectTagIds}
                  bookTags={bookTags}
                  subjectTags={subjectTags}
                />
              ))}
          </View>
        </ScrollView>

        <View>
          {completed &&
            (completed.loading ? (
              <Text>로딩중...</Text>
            ) : completed.error ? (
              <Text>에러 발생!</Text>
            ) : !completed.data ? (
              <Text> 없음 </Text>
            ) : (
              <Text> 완료한 과제 수: {completed.data.val()} </Text>
            ))}
        </View>

        {/* <View style={styles.mock}>
          <AssignModal
            modalVisible={addModalVisible}
            hideModal={hideAddModal}
            onSubmit={onAddAssign}
            bookTags={bookTags}
            subjectTags={subjectTags}
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
            bookTags={bookTags}
            subjectTags={subjectTags}
          />
            </View> */}

        <View style={styles.mock}>
          <FilterModal
            modalVisible={filterModalVisible}
            hideModal={hideFilterModal}
            bookTags={bookTags}
            subjectTags={subjectTags}
            activeFilter={filter}
            tagFilter={{ visibleBookTagIds, visibleSubjectTagIds }}
            filterActions={{
              showAll,
              showCompleted,
              showIncomplete,
              setVisibleSubjectIds,
            }}
          />
        </View>

        <AddAssignButton visible={addModalVisible} show={showAddModal} />
      </View>
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
    visibleSubjectTagIds: state.assignFilterSorterReducer.visibleSubjectTagIds,
    visibleBookTagIds: state.assignFilterSorterReducer.visibleBookTagIds,

    // currentStudentId: state.currentStudentReducer.selectedStudentId,
    // tutorId: state.tutorReducer.uid,
  };
}

const mapDispatchToProps = Object.assign(
  {},
  assignActions,
  modalVisibilityActions,
  filterSorterActions,
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkContainer);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
