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
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-community/picker';

const db = database();

const initialBookInfo = {
  book: {},
  bookName: '교재를 선택하세요',
  bigChapters: [],
  bigChapterName: '대단원을 선택하세요',
  smallChapters: [],
  smallChapterName: '소단원을 선택하세요',
};

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
  const [bookInfo, setBook] = useState(initialBookInfo);
  const [hasSmallChapter, setHasSmallChapter] = useState(false);
  const [state, setState] = useState({
    chapter: null,
    files: [],
  });
  
  const bookNames = bookArray.map((book) => book.info.name);
  const bookNamesPicker = bookNames.map((bookName) => {
    return <Picker.Item key={bookName} label={bookName} value={bookName} />;
  });
  const bigChaptersPicker = bookInfo.bigChapters.map((chapter) => {
    return <Picker.Item key={chapter} label={chapter} value={chapter} />;
  });
  const smallChaptersPicker = bookInfo.smallChapters.map((chapter) => {
    return <Picker.Item key={chapter} label={chapter} value={chapter} />;
  });

  const handleSubmit = () => {
    db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}`).update({
      lessonTotalNum: currentStudentlessonTotalNum + 1,
    });
    db.ref(
      `tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${lessonId}`,
    ).set({
      file: state.files,
      lessonNum: currentStudentlessonTotalNum + 1,
      chapter: state.chapter,
    });
    navigation.navigate('진도관리');
  };

  const selectBook = (bookName) => {
    setHasSmallChapter(false);
    const book = bookArray.filter((book) => book.info.name == bookName)[0];
    const bigChapters = Object.keys(book.info.contents).sort();
    setBook({
      ...bookInfo,
      book,
      bookName,
      bigChapters,
      smallChapters: [],
      smallChapterName: '소단원을 선택하세요',
    });
  };

  const selectBigChapter = (chapterName) => {
    const content = bookInfo.book.info.contents[chapterName];
    var hasObject = false;
    Object.values(content).forEach((value) => {
      if (typeof value !== 'number') {
        hasObject = true;
      }
    });
    if (hasObject) {
      // 소단원이 존재할 시
      setHasSmallChapter(true);
      const smallChapters = Object.keys(content).sort();
      setBook({ ...bookInfo, bigChapterName: chapterName, smallChapters });
      return;
    } else {
      const chapter = {
        [chapterName]: content,
      };
      setBook({ ...bookInfo, bigChapterName: chapterName });
      setState({ ...state, chapter });
    }
  };

  const selectSmallChapter = (chapterName) => {
    const content =
      bookInfo.book.info.contents[bookInfo.bigChapterName][chapterName];
    var chapter = {};
    if (typeof content === 'number') {
      chapter = {
        [chapterName]: {
          [chapterName]: content,
        },
      };
    } else {
      chapter = {
        [chapterName]: content,
      };
    }
    setBook({ ...bookInfo, smallChapterName: chapterName });
    setState({ ...state, chapter });
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
      <Picker
        prompt="대단원을 선택하세요"
        selectedValue={bookInfo.bigChapterName}
        onValueChange={(itemValue) =>
          itemValue === -1 ? '' : selectBigChapter(itemValue)
        }>
        <Picker.Item label="대단원을 선택하세요" value={-1} />
        {bigChaptersPicker}
      </Picker>
      {hasSmallChapter ? (
        <Picker
          prompt="소단원을 선택하세요"
          enabled={hasSmallChapter}
          selectedValue={bookInfo.smallChapterName}
          onValueChange={(itemValue) =>
            itemValue === -1 ? '' : selectSmallChapter(itemValue)
          }>
          <Picker.Item label="소단원을 선택하세요" value={-1} />
          {smallChaptersPicker}
        </Picker>
      ) : (
        null
      )}

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
        style={state.chapter === null ? styles.disabledButton : styles.button}
        onPress={handleSubmit}
        disabled={state.chapter === null ? true : false}>
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
