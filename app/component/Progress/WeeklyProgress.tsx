import { Checkbox, DataTable, List } from 'react-native-paper';
import React, { useEffect } from 'react';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Fab } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LessonType } from '../../types/lesson';
import MakeAchievementTable from './MakeAchievementTable';
import MakeProgressTable from './MakeProgressTable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Week from './Week';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import { isTypeNode } from 'typescript';

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
      db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).on(
        'value',
        (snapshot) => {
          changeStudent('STUDENT_CHANGE', {
            ...snapshot.val(),
            id: currentStudentId,
          });
          dataToLessonState('LESSONSTATE_SETUP', snapshot.val().lessonArray);
        },
      );
    });
    return unsubscribe;
  }, [navigation]);

  //가짜데이터-------------------------------------
  const lesson = {
    lessonNum: 1,
    chapterArray: [
      {
        title: '삼각형의 성질',
        problem: [
          {
            title: 'A단계',
            count: 20,
          },
          {
            title: 'B단계',
            count: 57,
          },
          {
            title: 'C단계',
            count: 25,
          },
        ],
        checked: false,
      },
      {
        title: '사각형의 성질',
        problem: [
          {
            title: 'A단계',
            count: 20,
          },
          {
            title: 'B단계',
            count: 57,
          },
          {
            title: 'C단계',
            count: 25,
          },
        ],
        checked: false,
      },
      {
        title: '오각형의 성질',
        problem: [
          {
            title: 'A단계',
            count: 20,
          },
          {
            title: 'B단계',
            count: 57,
          },
          {
            title: 'C단계',
            count: 25,
          },
        ],
        checked: false,
      },
    ],
  };
  const lesson2 = {
    lessonNum: 2,
    chapterArray: [
      {
        title: '오각형의 성질',
        problem: [
          {
            title: 'A단계',
            count: 20,
          },
          {
            title: 'B단계',
            count: 57,
          },
          {
            title: 'C단계',
            count: 25,
          },
        ],
        checked: false,
      },
    ],
  };

  const tempLessonArray = [lesson, lesson2];
  //------------------------------------------------

  const handleDelete = (key) => {
    db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).update({
      lessonTotalNum: currentStudentlessonTotalNum - 1,
    });
    db.ref(
      `tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${key}`,
    ).remove();
  };

  // const sectionItems = [];
  // lessonArray.length === 0
  //   ? ''
  //   : lessonArray.map((lesson) => {
  //       const lessonInfo = lesson.lessonInfo;
  //       sectionItems.push({
  //         title: lessonInfo.lessonNum + ' 회차',
  //         key: lesson.key,
  //         data: [<Week lessonid={lesson.key} />],
  //       });
  //       console.log(sectionItems); //디버깅용
  //     });

  // sectionItems.sort((a, b) => (a.title > b.title ? 1 : -1)); //회차 순으로 정렬

  const sectionItems = [];
  tempLessonArray.map((lesson) => {
    sectionItems.push({
      title: lesson.lessonNum + '회차',
      chapterArray: lesson.chapterArray,
    });
  });

  function makeCheckProgress(cArray) {
    const progressTableList = [];

    cArray.map((item) => {
      const tag = (
        <MakeProgressTable title={item.title} checked={item.checked} />
      );
      progressTableList.push(tag);
    });

    return progressTableList;
  }

  function makeCheckAchievement(cArray) {
    const achievementTableList = [];

    cArray.map((item) => {
      const tag = <MakeAchievementTable title={item.title} />;
      achievementTableList.push(tag);
    });

    return achievementTableList;
  }

  const accordionList = [];
  sectionItems.map((item) => {
    const tag = (
      <List.Accordion
        title={item.title}
        left={(props) => <List.Icon {...props} icon="folder" />}>
        <List.Accordion title="진도관리">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.titleStyle}>
                과목태그
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                교재태그
              </DataTable.Title>
              <DataTable.Title style={styles.textMoreFlex}>
                단원명
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                수행여부
              </DataTable.Title>
            </DataTable.Header>
            {makeCheckProgress(item.chapterArray)}
          </DataTable>
        </List.Accordion>
        <List.Accordion title="필요한 파일 업로드">
          <Text>여기에 컨텐츠를 입력</Text>
        </List.Accordion>
        <List.Accordion title="성취도 기록">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.textCell}>단원명</DataTable.Title>
              <DataTable.Title style={styles.textCell}>문제명</DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                맞은 문제 수
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                총 문제 수
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                정답률
              </DataTable.Title>
            </DataTable.Header>
            {makeCheckAchievement(item.chapterArray)}
          </DataTable>
        </List.Accordion>
      </List.Accordion>
    );
    accordionList.push(tag);

    console.log('Push success\n'); //디버깅용
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.filter}>
        <Text>필터가 들어와야 할 자리</Text>
      </View>

      <View style={styles.accordion}>
        <ScrollView>
          <View>{accordionList}</View>
        </ScrollView>
      </View>

      <Fab
        style={styles.createButton}
        onPress={() => navigation.navigate('진도추가')}>
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
  textCell: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMoreFlex: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  accordion: {
    flex: 7,
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
