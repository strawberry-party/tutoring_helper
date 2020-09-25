//진도 추가 컴포넌트
import { Form } from 'native-base';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-community/picker';
import Modal from 'react-native-modal';
import { List } from 'react-native-paper';

const db = database();

function CreateProgress({
  currentStudentlessonTotalNum,
  currentStudentId,
  navigation,
  tutorId,
  bookArray,
}) {
  const lessonId = _.uniqueId('lesson_');
  if (currentStudentlessonTotalNum === undefined)
    currentStudentlessonTotalNum = 0;
  const [bookInfo, setBook] = useState({
    book: {},
    bookName: '',
    bigChapters: [],
    selectedChapters: [],
  });
  const [isChapterModalVisible, setChapterModalVisible] = useState(false);
  const [state, setState] = useState({
    chapterArray: null,
    files: [],
  });
  const bookNames = bookArray.map((book) => book.info.name);
  const bookNamesPicker = bookNames.map((bookName) => {
    return <Picker.Item key={bookName} label={bookName} value={bookName} />;
  });

  const handlePress = (chapter) => {
    var isIn = false;
    bookInfo.selectedChapters.forEach((check) => {
      if (check.key === chapter.key) {
        isIn = true;
      }
    });
    if (isIn) {
      console.log('안에있음');
      var temp = bookInfo.selectedChapters.filter(
        (check) => check.key !== chapter.key,
      );
    } else {
      if (typeof chapter.value === 'number') {
        //단원 마무리 처럼 소단원 key의 value가 바로 문제 수가 오는 경우 처리
        var temp = [
          ...bookInfo.selectedChapters,
          { ...chapter, value: { [chapter.key]: chapter.value } },
        ];
      }
      var temp = [...bookInfo.selectedChapters, chapter];
    }
    setBook({ ...bookInfo, selectedChapters: temp });
  };

  const renderChapters = ({ item }) =>
    checkSmallChapter(item) ? (
      <List.AccordionGroup>
        <List.Accordion title={item.key} id={item.key}>
          {smallChapters(item)}
        </List.Accordion>
      </List.AccordionGroup>
    ) : (
      <TouchableOpacity
        style={{ marginVertical: 10, borderWidth: 1, paddingVertical: 10 }}
        onPress={() => handlePress(item)}>
        <Text>{item.key}</Text>
      </TouchableOpacity>
    );

  const smallChapters = (bigChapter) => {
    return Object.entries(bigChapter.value)
      .sort()
      .map(([key, value]) => (
        <TouchableOpacity
          key={bigChapter.key + key}
          style={{ marginVertical: 10, borderWidth: 1, paddingVertical: 10 }}
          onPress={() => {
            const newKey = bigChapter.key + '-' + key;
            const chapter = { key: newKey, value };
            handlePress(chapter);
          }}>
          <Text>{key}</Text>
        </TouchableOpacity>
      ));
  };

  const checkSmallChapter = (chapter) => {
    var hasObject = false;
    Object.values(chapter.value).forEach((value) => {
      if (typeof value !== 'number') {
        hasObject = true;
      }
    });
    return hasObject;
  };

  const toggleChapterModal = () => {
    setChapterModalVisible(!isChapterModalVisible);
    const chapterArray = bookInfo.selectedChapters.map((chapter) => {
      const problems = Object.entries(chapter.value)
        .reverse()
        .map(([key, value]) => {
          return {
            title: key,
            count: value,
            correct: 0
          };
        });
      return {
        title: chapter.key,
        problems,
        checked: false,
      };
    });
    setState({ ...state, chapterArray });
  };

  const handleSubmit = () => {
    db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).update({
      lessonTotalNum: currentStudentlessonTotalNum + 1,
    });
    db.ref(
      `tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${lessonId}`,
    ).set({
      file: state.files,
      lessonNum: currentStudentlessonTotalNum + 1,
      chapterArray: state.chapterArray,
    });
    navigation.navigate('진도관리');
  };

  const selectBook = (bookName) => {
    const book = bookArray.filter((book) => book.info.name == bookName)[0];
    const bigChapters = Object.entries(book.info.contents)
      .sort()
      .map(([key, value]) => Object.assign({}, { key, value }));
    setBook({
      ...bookInfo,
      book,
      bookName,
      bigChapters,
      selectedChapters: [],
    });
  };

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      setState({ ...state, files: results });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <Form>
      <Picker
        prompt="교재를 선택하세요"
        selectedValue={bookInfo.bookName}
        onValueChange={(itemValue) =>
          itemValue === -1 ? '' : selectBook(itemValue)
        }>
        <Picker.Item label="교재를 선택하세요" value={-1} />
        {bookNamesPicker}
      </Picker>
      <TouchableOpacity style={{margin: 10}} onPress={toggleChapterModal}>
        <Text>단원을 선택하세요</Text>
      </TouchableOpacity>
      <Modal
        scrollHorizontal={false}
        style={{ backgroundColor: '#ffffff' }}
        onBackdropPress={toggleChapterModal}
        isVisible={isChapterModalVisible}>
        <FlatList
          contentContainerStyle={{ flexGrow: 2 }}
          data={bookInfo.bigChapters}
          renderItem={renderChapters}
          keyExtractor={(bigChapter) => bigChapter.key}
        />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={bookInfo.selectedChapters}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          keyExtractor={(chapter) => chapter.key}
        />
        <Button title="선택 완료" onPress={toggleChapterModal} />
      </Modal>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={bookInfo.selectedChapters}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(chapter) => chapter.key}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={selectMultipleFile}>
        <Text style={{ marginRight: 10, fontSize: 19 }}>
          파일을 추가하세요.
        </Text>
        <Image
          source={{
            uri: 'https://img.icons8.com/offices/40/000000/attach.png',
          }}
          style={styles.imageIconStyle}
        />
      </TouchableOpacity>
      <ScrollView>
        {state.files.map((item, key) => (
          <View key={key}>
            <Text style={styles.textStyle}>
              파일명: {item.name ? item.name : ''}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={
          state.chapterArray === null ? styles.disabledButton : styles.button
        }
        onPress={handleSubmit}
        disabled={state.chapterArray === null ? true : false}>
        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
          진도 추가
        </Text>
      </TouchableOpacity>
    </Form>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
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
  disabledButton: {
    backgroundColor: '#a3a3a3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center',
    height: 60,
    width: 312,
  },
});

export default connect(
  function (state) {
    return {
      tutorId: state.tutorReducer.uid,
      currentStudentId: state.currentStudentReducer.selectedStudentId,
      currentStudentlessonTotalNum: state.currentStudentReducer.lessonTotalNum,
      bookArray: state.currentStudentReducer.book,
    };
  },
  function (dispatch) {
    return {
      onPress: function (type, studentId, title) {
        dispatch({ type, studentId, title });
      },
    };
  },
)(CreateProgress);
