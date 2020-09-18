import { LessonContentType, LessonTestType } from '../../types/lesson';
import { StyleSheet, Text, View } from 'react-native';

import Achievement from './Achievement';
import CheckingProgress from './CheckingProgress';
import { List } from 'react-native-paper';
import React from 'react';

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
    width: '100%',
  },
});

interface WeekProps {
  lessonid: string;
}

// export default function Week({ lessonid }: WeekProps) {
//   return (
//     <List.Accordion title="N회차        ">
//       <View style={styles.content}>
//         <Text style={styles.title}>진도 체크</Text>
//         <CheckingProgress lessonid={lessonid} />
//       </View>

//       <View style={styles.content}>
//         <Text style={{ ...styles.title, paddingBottom: 20 }}>
//           필요한 파일 업로드
//         </Text>
//       </View>

//       <View style={styles.content}>
//         <Text style={{ ...styles.title, paddingBottom: 20 }}>성취도 분석</Text>
//         <Achievement lessonid={lessonid} />
//       </View>
//     </List.Accordion>
//   );
// }
