import React from 'react';
import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import _ from 'lodash';

const db = database();

function CheckingProgress({id, lessonArray, currentStudentId}) {
  // console.log(contents);
  const contents = lessonArray.filter(lesson => lesson.key === id)[0].lessonInfo.contents
  // console.log(contents);
  
  const checkboxItems: Array<JSX.Element> = [];
  // console.log(checkboxItems);
  
  contents === undefined ? '' : Object.entries(contents).reverse().map(([key, value]) => {
    // console.log(value);
    
    var isCompleted = value.isCompleted;
    checkboxItems.push(
      <CheckBox
        key={key}
        title={value.text}
        checked={isCompleted}
        onPress={() => {
          db.ref('tutor_1/studentArray/'+currentStudentId+'/lessonArray/'+id+'/contents/'+key).update({
            isCompleted: !isCompleted,
          })
          isCompleted = !isCompleted;
          // onPress('CHECKED', currentStudentId, id, key)
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
