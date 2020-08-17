import React from 'react';
import { View, Text } from 'react-native';

function TestResult(props) {
  const result = props.content;
  const showResult = result.map(item => <Text key={item.content}>{item.content}: {item.score+'점'}</Text>)
  return (
    <View>
      {showResult}
    </View>
  );
}

export default TestResult;