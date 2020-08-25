import { Text, View } from 'react-native';

import React from 'react';
import { StudentInfoType } from '../../types/student';
import { connect } from 'react-redux';

interface MainProps {
  currentStudentInfo: StudentInfoType; //후에 'InfoType으로 바꾸기
}

function Main({currentStudentInfo}: MainProps) {

  return (
    <View>
      <Text>과목 : {currentStudentInfo.subject}</Text>
      <Text>다음 시간 : {currentStudentInfo.nextTime}</Text>
      <Text>장소 : {currentStudentInfo.address}</Text>
    </View>
  );
}

export default connect((state) => {
  const currentStudentId = state.currentStudentReducer.selectedStudentId;
  const studentArray = state.tutorReducer.studentArray;
  return {
    currentStudentInfo: studentArray.filter(student => student.key === currentStudentId)[0].info,
  }
}, null)(Main);
