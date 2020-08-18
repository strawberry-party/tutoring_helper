import { Text, View } from 'react-native';

import React from 'react';
import { StudentType } from '../../types/root';

interface MainProps {
  student: StudentType;
}
function Main({student}: MainProps) {
  return (
    <View>
      <Text>과목 : {student.subject}</Text>
      <Text>다음 시간 : {student.nextTime}</Text>
      <Text>장소 : {student.address}</Text>
    </View>
  );
}

export default Main;
