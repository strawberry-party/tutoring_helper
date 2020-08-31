import { Form, Input, Item } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StudentInfoType } from '../../../types/student';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import _ from 'lodash';
import { Button } from 'react-native';

const db = database();

interface CreateProgressProps {
  currentStudentId: string;
  navigation: any;
  currentStudentlessonTotalNum: number;
}

function CreateProgress({currentStudentlessonTotalNum, currentStudentId, navigation}: CreateProgressProps) {
  const [state, setState] = useState({
    key: '',
    text: '',
  });

  const handleCreate = () => {
    db.ref(`tutor_1/studentArray/${currentStudentId}`).update({
      lessonTotalNum: currentStudentlessonTotalNum + 1,
    })
    
    db.ref(`tutor_1/studentArray/${currentStudentId}/lessonArray/${state.key}`).set({
      contents: '',
      file: '',
      lessonNum: currentStudentlessonTotalNum + 1,
      test: [],
    })
    navigation.navigate('진도관리');
  }
  
  return (
    <Form>
      <Item last>
        <Input
          placeholder="배울 내용"
          onChangeText={(text) => {
            setState({key: _.uniqueId('lesson_'), text})
          }}
        />
      </Item>
      <Button
        title="추가"
        disabled={state.text==='' ? true : false}
        onPress={() => {handleCreate()}}
      />
    </Form>
  );
}

export default connect(
  function (state) {
    const currentStudentId = state.currentStudentReducer.selectedStudentId;
    const studentArray = state.tutorReducer.studentArray;
    return {
      currentStudentId: state.currentStudentReducer.selectedStudentId,
      currentStudentlessonTotalNum: studentArray.filter(
        (student) => student.key === currentStudentId,
      )[0].info.lessonTotalNum,
    }
  },
  function (dispatch) {
    return {
      onPress: function (type: string, studentId: string, title: string) {
        dispatch({ type, studentId, title });
      },
    };
  },
)(CreateProgress);
