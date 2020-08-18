import React from 'react';
import { View, Text } from 'react-native';

function Main(props) {
  const student = props.route.params;
  return (
    <View>
      <Text>과목 : {student.subject}</Text>
      <Text>시간 : {student.time}</Text>
      <Text>장소 : {student.address}</Text>
    </View>
  );
}

export default Main;