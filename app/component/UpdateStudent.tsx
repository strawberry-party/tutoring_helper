import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import { TextInput, Chip } from 'react-native-paper';
import Postcode from 'react-native-daum-postcode';
import Modal from 'react-native-modal';
import ModifySubjectTag from './ModifySubjectTag';
import ModifyBookTag from './ModifyBookTag';
import { Week, generateWeek, WeeklyScheduleType } from '../types/schedule';
import DailyScheduleSelectorContainer from './DailyScheduleSelectorContainer';

function UpdateStudent({
  tutorId,
  navigation,
  subjectTagArray,
  bookTagArray,
  route,
}) {
  const studentId = route.params.key;
  const [state, setState] = useState({
    name: '',
    address: '',
    nextTime: '',
    lessonArray: [],
    subjectTag: [],
    bookTag: [],
  });
  useEffect(() => {
    database()
      .ref(`tutors/${tutorId}/studentArray/${studentId}`)
      .on('value', (snapshot) => {
        const studentInfo = JSON.parse(JSON.stringify(snapshot.val()));
        var newSelectedSubjectTags = [];
        var newSelectedBookTags = [];
        studentInfo.subjectTag === undefined
          ? ''
          : (newSelectedSubjectTags = Object.entries(
              studentInfo.subjectTag,
            ).map(([key, info]) => {
              return { key, info };
            }));
        studentInfo.bookTag === undefined
          ? ''
          : (newSelectedBookTags = Object.entries(studentInfo.bookTag).map(
              ([key, info]) => {
                return { key, info };
              },
            ));
        delete studentInfo.subjectTag;
        delete studentInfo.bookTag;
        setState({
          ...studentInfo,
          subjectTag: newSelectedSubjectTags,
          bookTag: newSelectedBookTags,
        });
      });
    return () => console.log('수정 완료');
  }, [studentId]);

  const [isSubjectModalVisible, setSubjectModalVisible] = useState(false);
  const [isBookModalVisible, setBookModalVisible] = useState(false);

  const toggleSubjectModal = () => {
    setSubjectModalVisible(!isSubjectModalVisible);
  };
  const toggleBookModal = () => {
    setBookModalVisible(!isBookModalVisible);
  };

  const handleUpdate = () => {
    const info = JSON.parse(JSON.stringify(state)); //state 복제
    delete info.subjectTag;
    delete info.bookTag;
    database().ref(`tutors/${tutorId}/studentArray/${studentId}`).set(info);
    state.subjectTag.forEach((tag) => {
      database()
        .ref(
          `tutors/${tutorId}/studentArray/${studentId}/subjectTag/${tag.key}`,
        )
        .set(tag.info);
    });
    state.bookTag.forEach((tag) => {
      database()
        .ref(`tutors/${tutorId}/studentArray/${studentId}/bookTag/${tag.key}`)
        .set(tag.info);
    });

    navigation.goBack();
  };
  const handleBookTag = (tagInfo) => {
    var inBookState = false;
    state.bookTag.forEach((book) => {
      if (book.key === tagInfo.key) {
        alert('이미 추가한 태그입니다!');
        inBookState = true;
      }
    });
    if (!inBookState) {
      var newTag = state.bookTag;
      newTag.push(tagInfo);
      setState({ ...state, bookTag: newTag });
    }
  };
  const handleSubjectTag = (tagInfo) => {
    var inSubjectState = false;
    state.subjectTag.forEach((book) => {
      if (book.key === tagInfo.key) {
        alert('이미 추가한 태그입니다!');
        inSubjectState = true;
      }
    });
    if (!inSubjectState) {
      var newTag = state.subjectTag;
      newTag.push(tagInfo);
      setState({ ...state, subjectTag: newTag });
    }
  };

  //과목 태그
  const currentSubjectTag = [];
  state.subjectTag.map((tagInfo) => {
    currentSubjectTag.push(
      <Chip
        key={tagInfo.key}
        style={{ marginRight: 5 }}
        children={tagInfo.info.name}
        onClose={() => {
          const newTag = state.subjectTag.filter(
            (check) => check.key !== tagInfo.key,
          );
          setState({ ...state, subjectTag: newTag });
        }}
      />,
    );
  });
  const subjectTagScrollItem = [];
  subjectTagArray.map((item) => {
    subjectTagScrollItem.push(
      <Chip
        key={item.key}
        style={{ marginRight: 5 }}
        onPress={() => handleSubjectTag(item)}
        children={item.info.name}
      />,
    );
  });

  //교재 태그
  const currentBookTag = [];
  state.bookTag.map((tagInfo) => {
    currentBookTag.push(
      <Chip
        key={tagInfo.key}
        style={{ marginRight: 5 }}
        children={tagInfo.info.name}
        onClose={() => {
          const newTag = state.bookTag.filter(
            (check) => check.key !== tagInfo.key,
          );
          setState({ ...state, bookTag: newTag });
        }}
      />,
    );
  });
  const bookTagScrollItem = [];
  bookTagArray.map((item) => {
    bookTagScrollItem.push(
      <Chip
        key={item.key}
        style={{ marginRight: 5 }}
        onPress={() => handleBookTag(item)}
        children={item.info.name}
      />,
    );
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        mode="outlined"
        label="학생 이름"
        value={state.name}
        onChangeText={(text) => setState({ ...state, name: text })}
        style={styles.textInput}
        selectionColor="#f48eb1"
        theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
      />
      <View style={styles.item}>
        <View style={styles.subheader}>
          <Text style={styles.text}>과목</Text>
          <ScrollView horizontal={true} style={{ marginLeft: 5 }}>
            {currentSubjectTag}
          </ScrollView>
          <TouchableOpacity
            style={{ marginTop: 5, marginRight: 10 }}
            onPress={toggleSubjectModal}>
            <Text>태그 수정</Text>
          </TouchableOpacity>
          <Modal isVisible={isSubjectModalVisible}>
            <ModifySubjectTag />
            <Button title="Hide modal" onPress={toggleSubjectModal} />
          </Modal>
        </View>
        <ScrollView horizontal={true} style={{ marginTop: 10, marginLeft: 30 }}>
          {subjectTagScrollItem.length === 0 ? (
            <Text>과목을 추가해보세요!</Text>
          ) : (
            subjectTagScrollItem
          )}
        </ScrollView>
      </View>
      <View style={styles.item}>
        <View style={styles.subheader}>
          <Text style={styles.text}>교재</Text>
          <ScrollView horizontal={true} style={{ marginLeft: 5 }}>
            {currentBookTag}
          </ScrollView>
          <TouchableOpacity
            style={{ marginTop: 5, marginRight: 10 }}
            onPress={toggleBookModal}>
            <Text>태그 수정</Text>
          </TouchableOpacity>
          <Modal isVisible={isBookModalVisible}>
            <ModifyBookTag />
            <Button title="Hide modal" onPress={toggleBookModal} />
          </Modal>
        </View>
        <ScrollView horizontal={true} style={{ marginTop: 10, marginLeft: 30 }}>
          {bookTagScrollItem.length === 0 ? (
            <Text>교재를 추가해보세요!</Text>
          ) : (
            bookTagScrollItem
          )}
        </ScrollView>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>요일 설정</Text>
        <ScrollView horizontal={true} style={{ marginTop: 10, marginLeft: 30 }}>
          <DailyScheduleSelectorContainer
            weeklySchedule={new WeeklyScheduleType()}
          />
        </ScrollView>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>장소 설정</Text>
        <Text>{state.address}</Text>
        <Postcode
          style={{
            backgroundColor: '#ffffff',
            marginTop: 10,
            width: 400,
            height: 200,
            alignSelf: 'center',
          }}
          jsOptions={{ animation: true }}
          onSelected={(data) => {
            setState({ ...state, address: data.address });
          }}
          onError={(error) => console.warn(error)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
          정보 수정
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  item: {
    flex: 1,
    marginBottom: 5,
    paddingBottom: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
  },
  subheader: {
    flex: 1,
    flexDirection: 'row',
  },

  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },

  textInput: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center',
    height: 60,
    width: 312,
  },
});

const mapStateToProps = (state) => {
  return {
    tutorId: state.tutorReducer.uid,
    studentNum: state.tutorReducer.studentNum,
    subjectTagArray: state.tagReducer.subjectTags,
    bookTagArray: state.tagReducer.bookTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
