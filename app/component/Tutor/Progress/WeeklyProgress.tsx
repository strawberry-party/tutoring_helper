import { LessonContentType, LessonType } from '../../../types/lesson';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { StudentType } from '../../../types/root';
import Week from './Week';
import { connect } from 'react-redux';

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
  student: StudentType;
  navigation: any;
}

function WeeklyProgress({ student, navigation }: WeeklyProgressProps) {
  const lessons = student.lessonMap;
  const sectionItems: Array<SectionItem> = Array.from(
    lessons.values(),
  ).map((lesson: LessonType) => getSectionItem(lesson));

  function getSectionItem(lesson: LessonType): SectionItem {
    return {
      title: `${lesson.lessonNum.toString()} 회차`,
      data: [<Week contents={lesson.contents} test={lesson.test}/>]
    };
  }
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

export default connect(function (state) {
  // console.log(state.lessonReducer.studentMap);
  return {
    students: state.lessonReducer.studentMap,
  };
}, null)(WeeklyProgress);
