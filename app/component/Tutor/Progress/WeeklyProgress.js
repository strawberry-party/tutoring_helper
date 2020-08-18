import React from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import Week from './Week';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: '#fdf5f8',
  },
  item: {
    backgroundColor: '#ffffff',
  },
  createButton: {
    position: 'absolute',
    bottom: 100,
  },
})

function WeeklyProgress(props) {
  const currentStudent = props.route.params;
  // console.log(currentStudent);
  const students = props.students;
  // console.log(students);
  function progressFilter() {
    const [student] = students.filter(student => student.studentId === currentStudent.studentId)
    // console.log(student);
    return student.progress;
  }
  const studentProgress = progressFilter();
  // console.log(studentProgress);
  const sectionItems = studentProgress.map(progress => {
    return {title: progress.lessonNum + '회차', data: [<Week content={progress}/>]} 
  })

  return (
    <SectionList
      sections={sectionItems} 
      renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <Button style={styles.createButton} icon={<Ionicons name='add' size={20}/>} onPress={() => {props.navigation.navigate('진도추가')}}/>
      }
    />
  );
}

export default connect(
  function (state) {
    // console.log(state.studentReducer.studentArray);
    return {
      students: state.studentReducer.studentArray,
    }
  }, null
)(WeeklyProgress);

