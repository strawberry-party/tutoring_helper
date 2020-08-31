import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Input, Form, Item } from 'native-base';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import _ from 'lodash';

const db = database();

function CreateStudent({ studentNum, navigation }) {
  // useIsFocused() ? console.warn('아직 완벽히 구현되지 않은 페이지 입니다.') : '';
  
  const [state, setState] = useState({
    name: '',
    address: '',
    nextTime: '',
    lessonArray: [],
    subject: [],
  });
  const handleSubmit = (state) => {
    db.ref(`tutor_1`).update({
      studentNum: studentNum + 1,
    });
    db.ref(`tutor_1/studentArray/${_.uniqueId('student_')}`).set(state)
    navigation.navigate('김태형 학생');
  };

  return (
    <ScrollView style={styles.container}>
      <Form>
          <View style={styles.studentNameInput}>
            <Item>
              <Input
                placeholder="학생 이름"
                onChangeText={(text) => setState({ ...state, name: text })}
              />
            </Item>
          </View>
        <View style={styles.subjectInput}>
          <Item>
            <Text>과외 과목</Text>
          </Item>
        </View>
        <View style={styles.materialInput}>
          <Item>
            <Text>교재 태그</Text>
          </Item>
        </View>
        <View style={styles.dayInput}>
          <Item>
            <Input
              placeholder="과외 요일 설정"
              onChangeText={(text) => setState({ ...state, nextTime: text })}
            />
          </Item>
        </View>
        <View style={styles.placeInput}>
          <Item last>
            <Input
              placeholder="과외 장소"
              onChangeText={(text) => setState({ ...state, address: text })}
            />
          </Item>
        </View>
        <View>
          <Button onPress={() => {handleSubmit(state)}} title="추가" />
        </View>
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 1,
  },
  // addButton: {
  //   position: 'absolute',
  //   top: 20,
  //   right: 20,
  // },
  studentNameInput: {
    flex: 2,
    width: 300,
  },
  subjectInput: {
    flex: 1,
  },
  materialInput: {
    flex: 1,
  },
  dayInput: {
    flex: 1,
  },
  placeInput: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    studentNum: state.tutorReducer.studentNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);