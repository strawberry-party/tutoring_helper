import { StyleSheet, Text, View } from 'react-native';
import CheckingProgress from './CheckingProgress';
import React from 'react';
import Achievement from './Achievement';
import { LessonContentType, LessonTestType } from '../../types/lesson';

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

interface WeekProps {
  lessonid: string;
}

export default function Week({ lessonid }: WeekProps) {
  
  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.title}>진도 체크</Text>
        <CheckingProgress lessonid={lessonid} />
      </View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, paddingBottom: 20 }}>
          필요한 파일 업로드
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, paddingBottom: 20 }}>성취도 분석</Text>
        <Achievement lessonid={lessonid}/>
      </View>
    </View>
  );
}
