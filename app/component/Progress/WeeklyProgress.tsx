import { LessonType } from '../../types/lesson';
import { SectionList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';
import Week from './Week';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import { Fab } from 'native-base';

const db = database();

interface SectionItem {
  title: string;
  data: Array<JSX.Element>;
}

interface WeeklyProgressProps {
  lessonArray: Array<LessonType>;
  navigation: any;
  dataToLessonState: Function;
  changeStudent: Function;
  currentStudentId: string;
  currentStudentlessonTotalNum: number;
  tutorId: string;
}

function WeeklyProgress({
  lessonArray,
  navigation,
  dataToLessonState,
  changeStudent,
  currentStudentId,
  currentStudentlessonTotalNum,
  tutorId,
}: WeeklyProgressProps) {


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).on('value', snapshot => {
        changeStudent('STUDENT_CHANGE', {...snapshot.val(), id: currentStudentId})
        dataToLessonState('LESSONSTATE_SETUP', snapshot.val().lessonArray);
      })
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (key) => {
    db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).update({
      lessonTotalNum: currentStudentlessonTotalNum - 1,
    })
    db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${key}`).remove()
  }

  const sectionItems = [];
  lessonArray.length === 0
    ? ''
    : lessonArray.map((lesson) => {
        const lessonInfo = lesson.lessonInfo;
        sectionItems.push({
          title: lessonInfo.lessonNum + ' 회차',
          key: lesson.key,
          data: [<Week lessonid={lesson.key} />],
        });
      })
      
  sectionItems.sort((a, b) => (a.title > b.title) ? 1 : -1); //회차 순으로 정렬

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <SectionList
        sections={sectionItems}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <TouchableOpacity style={{position: "absolute", right: 15, top: 5, zIndex: 1}} onPress={() => handleDelete(section.key)}>
              <MaterialCommunityIcons name="delete-forever-outline" size={20} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Fab style={styles.createButton} onPress={() => navigation.navigate('진도추가')}>
        <Ionicons name="add" size={20} />
      </Fab>
    </View>
  );
}

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
    borderBottomColor: '#c0b4b8',
    borderBottomWidth: 1,
  },
  createButton: {
    position: 'absolute',
    bottom: 15,
    elevation: 2,
    backgroundColor: '#ed4a82',
    zIndex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    tutorId: state.tutorReducer.uid,
    currentStudentId: state.currentStudentReducer.selectedStudentId,
    lessonArray: state.lessonReducer.lessonArray,
    currentStudentlessonTotalNum: state.currentStudentReducer.lessonTotalNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataToLessonState: (type, data, lessonNum) => {
      dispatch({ type, data, lessonNum });
    },
    changeStudent: (type, info) => {
      dispatch({ type, info });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyProgress);
