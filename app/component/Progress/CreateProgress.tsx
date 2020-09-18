import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Form, Input, Item } from 'native-base';
import React, { useEffect, useState } from 'react';

import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-community/picker';
import { StudentInfoType } from '../../types/student';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';

const db = database();

interface CreateProgressProps {
  currentStudentId: string;
  navigation: any;
  currentStudentlessonTotalNum: number;
  tutorId: string;
  bookArray: [];
}

function CreateProgress({
  currentStudentlessonTotalNum,
  currentStudentId,
  navigation,
  tutorId,
  bookArray,
}: CreateProgressProps) {
  const lessonId = _.uniqueId('lesson_');
  if (currentStudentlessonTotalNum === undefined)
    currentStudentlessonTotalNum = 0;

  const [state, setState] = useState({
    text: '',
    files: [],
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
      test: [],
    });
    db.ref(
      `tutors/${tutorId}/studentArray/${currentStudentId}/lessonArray/${lessonId}/contents/content_1`,
    ).set({
      text: state.text,
      isCompleted: false,
    });
    navigation.navigate('진도관리');
  };

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      // console.log(results);
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
      {/* <Picker>

      </Picker> */}
      <TextInput
        mode="outlined"
        label="진도 내용"
        value={state.text}
        onChangeText={(text) => setState({ ...state, text: text })}
        style={styles.textInput}
        selectionColor="#f48eb1"
        theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
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
        style={state.text === '' ? styles.disabledButton : styles.button}
        onPress={handleSubmit}
        disabled={state.text === '' ? true : false}>
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
      onPress: function (type: string, studentId: string, title: string) {
        dispatch({ type, studentId, title });
      },
    };
  },
)(CreateProgress);
