import { Text, View } from 'react-native';
import React from 'react';

function TestResult({result}) {
  const showResult = result.map((item, index) => (
    <Text key={index}>
      {item.desc}: {item.score + '점'}
    </Text>
  ));
  return (
    <View>
      {showResult}
    </View>
  );
}

export default TestResult;
