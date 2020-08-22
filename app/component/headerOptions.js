import store from '../common/store';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

// const currentStudentId = store.getState().tutorReducer.selectedStudentId;
// const currentStudent = store.getState().lessonReducer.studentMap.get(currentStudentId);
// console.log(currentStudent);
const headerOptions = {
  title: '',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#e91e63',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerRight: () => (
  //   <Text style={styles.studentNameText}>{currentStudent.name + ' 학생'}</Text>
  // )
}

// const styles = StyleSheet.create({
//   studentNameText: {
//     paddingRight: 20,
//     color: 'white',
//     fontSize: 20,
//     // fontWeight: 'bold',
//   }
// })

export default headerOptions;