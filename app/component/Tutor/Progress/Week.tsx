import { StyleSheet, Text, View } from 'react-native';

import CheckingProgress from './CheckingProgress';
import React from 'react';
import TestResult from './TestResult';
import { createExpressionWithTypeArguments } from 'typescript';

const styles = StyleSheet.create({
  content: {
    margin: 5,
  },
  title: {
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default function Week({ contents, test }) {
  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.title}>진도 체크</Text>
        <CheckingProgress contents={contents} />
      </View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, paddingBottom: 20 }}>
          필요한 파일 업로드
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, paddingBottom: 20 }}>Test 결과</Text>
        {test && <TestResult result={test} />}
      </View>
    </View>
  );
}
