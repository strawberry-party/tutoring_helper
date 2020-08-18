import React, { useState } from 'react';
import { Form, Item, Input } from 'native-base';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

function CreateProgress(props) {
  const [state, setState] = useState({
    title: ''
  });
  return (
    <Form>
      <Item last>
        <Input placeholder="배울 내용" onChangeText={(text) => setState({title: text})} />
      </Item>
      {/* {console.log(state.title)} */}
      {/* {console.log(props.onPress('PROGRESS_ADD', state.title, false))} */}
      <Button title='추가' onPress={() => {
        props.onPress('PROGRESS_ADD', state.title, false)
        props.navigation.navigate('진도관리');
      }}/>

    </Form>
  );
}

export default connect(
  function (state) {
    // console.log(state.studentReducer.studentArray[0].progress);
    return {}
  },
  function (dispatch) {
    return{
      onPress: function (type, title, isDone) {
        dispatch({type, title, isDone})
      }
    }
  }
)(CreateProgress)