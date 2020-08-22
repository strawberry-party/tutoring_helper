import { Form, Input, Item } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { StudentType } from '../../../types/root';
import { connect } from 'react-redux';

interface CreateProgressProps {
  student: StudentType;
  navigation: any;
}
// { student, navigation }: CreateProgressProps
function CreateProgress(props) {
  const [state, setState] = useState({
    title: '',
  });
  
  return (
    <Form>
      <Item last>
        <Input
          placeholder="배울 내용"
          onChangeText={(text) => setState({ title: text })}
        />
      </Item>
      <Button
        title="추가"
        onPress={() => {
          // toDatabase(state.title, false);
          props.onPress('LESSON_ADD', props.currentStudentId, state.title);
          props.navigation.navigate('진도관리');
        }}
      />
    </Form>
  );
}

export default connect(
  function (state) {
    return {
      currentStudentId: state.tutorReducer.selectedStudentId,
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
