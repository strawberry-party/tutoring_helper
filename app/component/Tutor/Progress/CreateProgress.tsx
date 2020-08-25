import { Form, Input, Item } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { StudentInfoType } from '../../../types/student';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import _ from 'lodash';

const db = database();

interface CreateProgressProps {
  currentStudentId: string;
  navigation: any;
}
// { student, navigation }: CreateProgressProps
function CreateProgress({currentStudentId, navigation}: CreateProgressProps) {
  const [state, setState] = useState({
    contents: {},
  });
  
  return (
    <Form>
      <Item last>
        <Input
          placeholder="배울 내용"
          onChangeText={(text) => {
            const contentObject = {key: _.uniqueId('lessonContent_'), isCompleted: false, text}
            setState({contents: contentObject})
          }}
        />
      </Item>
      <Button
        title="추가"
        onPress={() => {
          // toDatabase(state.title, false);
          db.ref('tutor_1/studentArray/'+currentStudentId+'/lessonArray/'+_.uniqueId('lesson_')).update({
            contents: '',
            file: '',
            lessonNum: Number(_.uniqueId()),
            test: [],
          })
          // props.onPress('LESSON_ADD', props.currentStudentId, state.title);
          navigation.navigate('진도관리');
        }}
      />
    </Form>
  );
}

export default connect(
  function (state) {
    return {
      currentStudentId: state.currentStudentReducer.selectedStudentId,
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
