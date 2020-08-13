import React, { Component } from 'react';

import CheckingProgress from './CheckingProgress';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingTop: 3,
    fontSize: 15,
    fontWeight: 'bold',
  }
})

export default function Week() {
  return (
    <View>
      <Text style={styles.title}>진도 체크</Text>
      <CheckingProgress />
      <Text style={{...styles.title, paddingBottom: 20}}>필요한 파일 업로드</Text>
      <Text style={{...styles.title, paddingBottom: 20}}>Test 결과</Text>
    </View>
  );
}