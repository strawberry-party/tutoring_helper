import { Text, View } from 'react-native';

import React from 'react';
import { StudentType } from '../../types/root';
import { connect } from 'react-redux';

interface MainProps {
  student: StudentType;
}
function Main(props) {
  const student = props.currentStudent;
  return (
    <View>
      <Text>과목 : {student.subject}</Text>
      <Text>다음 시간 : {student.nextTime}</Text>
      <Text>장소 : {student.address}</Text>
    </View>
  );
}

export default connect((state) => {
  const currentStudentId = state.tutorReducer.selectedStudentId;
  const studentMap = state.lessonReducer.studentMap;
  return {
    currentStudent: studentMap.get(currentStudentId)
  } 
}, null)(Main);
