import { LessonContentType, LessonType } from '../../../types/lesson';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { StudentInfoType } from '../../../types/student';
import Week from './Week';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'

const db = database();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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
});

interface SectionItem {
  title: string;
  data: Array<JSX.Element>;
}

interface WeeklyProgressProps {
  lessonArray: Array<LessonType>;
  navigation: any;
  dataToLessonState: Function;
  currentStudentId: string;
}

function WeeklyProgress({lessonArray, navigation, dataToLessonState, currentStudentId}: WeeklyProgressProps) {
  // console.log(lessonArray);
  useEffect(() => {
    db.ref('tutor_1/studentArray/'+currentStudentId+'/lessonArray').on('value', snapshot => {
      // console.log('db changed');
      // console.log(snapshot);
      dataToLessonState('LESSONSTATE_SETUP', snapshot.val())
    })
  }, [])
  
  const sectionItems = [];
  lessonArray.length === 0 ? '' : lessonArray.map((lesson) => {
    const lessonInfo = lesson.lessonInfo;
    sectionItems.push(
      {title: lessonInfo.lessonNum + ' 회차', data: [<Week id={lesson.key}/>]}
    )
  });
  
  return (
    <SectionList
      sections={sectionItems}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <Button
          style={styles.createButton}
          icon={<Ionicons name="add" size={20} />}
          onPress={() => {
            navigation.navigate('진도추가');
          }}
        />
      }
    />
  );
}

const mapStateToProps = (state) => {
  const currentStudentId = state.currentStudentReducer.selectedStudentId;
  const studentArray = state.tutorReducer.studentArray;
  return {
    currentStudentId,
    lessonArray: state.lessonReducer.lessonArray,
    currentStudentInfo: studentArray.filter(student => student.key === currentStudentId)[0].info,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    dataToLessonState: (type, data) => {
      dispatch({type, data})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyProgress);
