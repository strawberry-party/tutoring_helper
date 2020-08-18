import { Form, Input, Item } from 'native-base';
import React, { useState } from 'react';

import { Button } from 'react-native-elements';
import { StudentType } from '../../../types/root';
import { connect } from 'react-redux';

interface CreateProgressProps {
  student: StudentType;
  navigation: any;
}

function CreateProgress({ student, navigation }: CreateProgressProps) {
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
          // onPress('PROGRESS_ADD', state.title, false);
          navigation.navigate('진도관리');
        }}
      />
    </Form>
  );
}

export default connect(
  function (state) {
    return {};
  },
  function (dispatch) {
    return {
      onPress: function (type, title, isDone) {
        dispatch({ type, title, isDone });
      },
    };
  },
)(CreateProgress);
