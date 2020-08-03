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

import AddAssignModal from '../component/Homework/FormWrapper';
import AddButton from '../component/Homework/AddButton';
import AssignList from '../component/Homework/AssignList';
import { AssignType } from '../types/homework';
import Body from '../component/Homework/Body';
import Homework from '../component/Homework/Homework';
import Root from '../component/Root';
import { RootState } from '../states';
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
  const assigns = useSelector(
    (state: RootState) => state.assignReducer.assigns,
  );
  const dispatch = useDispatch();

  const onAddAssign = (assign: AssignType) => {
    dispatch(assignActions.addAssign(assign));
    console.log('added');
  };

  const onCompleteAssign = (id: string) => {
    console.log('completed');
  };

  const onIncompleteAssign = (id: string) => {
    console.log('completed');
  };

  const onRemoveAssign = (id: string) => {
    console.log('removed');
  };

  // TODO: Homework container로 분리하기
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>숙제 관리</Text>
        {/* <AddButton />
          <AddAssignModal visible={addModalVisible} /> */}
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ backgroundColor: 'blue', padding: 10, flexGrow: 1 }}>
            <AssignList
              assigns={assigns}
              {...bindActionCreators(assignActions, dispatch)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 80,
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
    // addModalVisible: state.addModal.visible,
  };
}

export default connect(mapStateToProps)(TutoringHelper);
// TutoringHelper의 props로 mapStateToProps의 리턴객체를 전해준다
