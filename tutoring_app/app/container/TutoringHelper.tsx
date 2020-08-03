/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';

import AddAssignModal from '../component/Homework/AddAssignModal';
import AssignList from '../component/Homework/AssignList';
import { AssignType } from '../types/homework';
import Body from '../component/Homework/Body';
import Homework from '../component/Homework/Homework';
import Root from '../component/Root';
import { RootState } from '../states';
import { actions as addModalVisibilityActions } from '../states/addAssignState';
import { actions as assignActions } from '../states/assignState';
import { assignList } from '../common/mockData';
import { bindActionCreators } from 'redux';
import { log } from 'react-native-reanimated';
import store from '../common/store';

// import { actions as assignActions } from '../states/assignState';

console.log('store getState');

console.log(store.getState().assignReducer.assigns);
// TODO: 타입 정의, any 대체하기

function TutoringHelper() {
  const assigns: Array<AssignType> = useSelector(
    (state: RootState) => state.assignReducer.assigns,
  );

  const addAssignModalVisible: boolean = useSelector(
    (state: RootState) => state.addAssignModal.visible,
  );

  const dispatch = useDispatch();

  const onAddAssign = (assign: AssignType) => {
    dispatch(assignActions.addAssign(assign));
    console.log('added');
  };

  const onCompleteAssign = (id: string) => {
    console.log('completed');
    dispatch(assignActions.completeAssign(id));
  };

  const onIncompleteAssign = (id: string) => {
    console.log('un-completed');
    dispatch(assignActions.incompleteAssign(id));
  };

  const onRemoveAssign = (id: string) => {
    // show remove modal to check confirm
    alert('정말 삭제하시겠습니까?');
    console.log('removed');
    dispatch(assignActions.removeAssign(id));
  };

  const showModal = () => {
    console.log('show modal');
    dispatch(addModalVisibilityActions.showModal());
  };
  const hideModal = () => {
    console.log('hide modal');
    dispatch(addModalVisibilityActions.hideModal());
  };

  // TODO: Homework container로 분리하기
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titleText}>숙제 관리</Text>

        <Text>여기 필터</Text>
        <View>
          <ScrollView>
            <View style={{ backgroundColor: 'blue', padding: 10, flexGrow: 1 }}>
              <AssignList
                assigns={assigns}
                onCompleteAssign={onCompleteAssign}
                onIncompleteAssign={onIncompleteAssign}
                onRemoveAssign={onRemoveAssign}
              />
            </View>
          </ScrollView>
          <AddAssignModal
            visible={addAssignModalVisible}
            showModal={showModal}
            hideModal={hideModal}
            addAssign={onAddAssign}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 100, // 하단바 높이에 따라 조절
  },
  test: {
    alignContent: 'center',
    padding: 80,
    flexGrow: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  console.log('mapStateToProps');
  console.log(state);

  return {
    assigns: state.assignReducer.assigns, // apply filter later
    addModalVisible: state.addAssignModal.visible,
  };
}

export default connect(mapStateToProps)(TutoringHelper);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
