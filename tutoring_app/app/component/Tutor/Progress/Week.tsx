import React, { Component } from 'react';
import { View } from 'react-native';
import CheckingProgress from './CheckingProgress';
import { Text } from 'react-native-elements';

class Week extends Component {
  render() {
    return (
      <View>
        <Text h1>
          진도 체크
        </Text>
        <CheckingProgress />
        <Text h1>
          필요한 파일 업로드
        </Text>
        <Text h1>
          Test 결과
        </Text>
      </View>
    );
  }
}

export default Week;