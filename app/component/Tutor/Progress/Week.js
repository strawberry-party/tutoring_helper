import React from 'react';

import CheckingProgress from './CheckingProgress';
import { View, Text, StyleSheet } from 'react-native';
import TestResult from './TestResult';

const styles = StyleSheet.create({
  content: {
    margin: 5
  },
  title: {
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
  }
})

export default function Week(props) {
  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.title}>진도 체크</Text>
        <CheckingProgress content={props.content.progress}/>
      </View>
      <View style={styles.content}>
        <Text style={{...styles.title, paddingBottom: 20}}>필요한 파일 업로드</Text>
      </View>
      <View style={styles.content}>
        <Text style={{...styles.title, paddingBottom: 20}}>Test 결과</Text>
        <TestResult content={props.content.test} />
      </View>
    </View>
  );
}