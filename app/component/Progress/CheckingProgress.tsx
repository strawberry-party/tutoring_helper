//진도 관리 체크 여부 관리하는 컴포넌트
import React from 'react';
import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import _ from 'lodash';

const db = database();

function CheckingProgress({tutorId, lessonid, lessonArray, currentStudentId}) {
  const contents = lessonArray.filter(lesson => lesson.key === lessonid)[0].lessonInfo.contents //아직은 하나의 내용만 들어갈 수 있음
  
  const checkboxItems = [];
  
  contents === undefined ? '' : Object.entries(contents).reverse().map(([key, value]) => {
    // console.log(value);
    var isCompleted = value.isCompleted;
    checkboxItems.push(
      <CheckBox
        key={key}
        title={value.text}
        checked={isCompleted}
        onPress={() => {
          db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${lessonid}/contents/${key}`).update({
            isCompleted: !isCompleted,
          })
          isCompleted = !isCompleted;
        }}
      />
    )
  })
  return (
    <View>
      {checkboxItems}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    tutorId: state.tutorReducer.uid,
    currentStudentId: state.currentStudentReducer.selectedStudentId,
    lessonArray: state.lessonReducer.lessonArray,
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
