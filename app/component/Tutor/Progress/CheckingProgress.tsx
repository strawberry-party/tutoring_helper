import React, { useState } from 'react';

import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';

function CheckingProgress({id, contents, onPress, currentStudentId}) {
  // TODO: 리덕스 사용하도록 수정
  // console.log(contents);
  
  var checkboxItems: Array<JSX.Element> = [];
  // console.log(checkboxItems);
  
  for (let [key, item] of contents) {
    // console.log(key);
    
    checkboxItems.push(
      <CheckBox
        key={key}
        title={item.text}
        checked={item.isCompleted}
        onPress={() => {onPress('CHECKED', currentStudentId, id, key)}}
      />,
    );
  }
  return (
    <View>
      {checkboxItems}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currentStudentId: state.tutorReducer.selectedStudentId,
  }
};


const mapDispatchToProps = (dispatch) => {
  return{
    onPress: (type: string, studentId: string, lessonId: string, contentId: string) => {
      dispatch({type, studentId, lessonId, contentId});
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckingProgress);
