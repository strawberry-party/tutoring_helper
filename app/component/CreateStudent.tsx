//학생 추가하는 컴포넌트
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
import UpdateSubjectTag from './UpdateSubjectTag';
import { WeeklyScheduleType } from '../types/schedule';
import DailyScheduleSelectorContainer from './DailyScheduleSelectorContainer';
import UpdateBookTag from './UpdateBookTag';

function CreateStudent({ tutorId, studentNum, bookTagArray, subjectTagArray }) {
  const id = _.uniqueId('student_');
  const [state, setState] = useState({
    name: '',
    address: '',
    nextTime: '',
    lessonArray: [],
    subjectTag: [],
    bookTag: [],
  });
  const [addressInfo, setAddress] = useState({
    code: '',
    detail: '',
  })
  const [isSubjectModalVisible, setSubjectModalVisible] = useState(false);
  const [isBookModalVisible, setBookModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);

  const toggleSubjectModal = () => {
    setSubjectModalVisible(!isSubjectModalVisible);
  };
  const toggleBookModal = () => {
    setBookModalVisible(!isBookModalVisible);
  };
  const toggleAddressModal = () => {
    setAddressModalVisible(!isAddressModalVisible);
  };

  const handleSubmit = () => {
    database()
      .ref(`tutors/${tutorId}`)
      .update({
        studentNum: studentNum + 1,
      });
    const info = JSON.parse(JSON.stringify(state)); //state 복제
    delete info.subjectTag;
    delete info.bookTag;
    database().ref(`tutors/${tutorId}/studentArray/${id}`).set(info);
    state.subjectTag.forEach((tag) => {
      database()
        .ref(`tutors/${tutorId}/studentArray/${id}/subjectTag/${tag.key}`)
        .set(tag.info);
    });
    state.bookTag.forEach((tag) => {
      database()
        .ref(`tutors/${tutorId}/studentArray/${id}/bookTag/${tag.key}`)
        .set(tag.info);
    });
    // navigation.navigate(id);
  };
  const handleSubjectTag = (tagInfo) => {
    if (state.subjectTag.includes(tagInfo)) {
      alert('이미 추가한 태그입니다!');
      return;
    }
    var newTag = state.subjectTag;
    newTag.push(tagInfo);
    setState({ ...state, subjectTag: newTag });
  };
  const handleBookTag = (tagInfo) => {
    if (state.bookTag.includes(tagInfo)) {
      alert('이미 추가한 태그입니다!');
      return;
    }
    var newTag = state.bookTag;
    newTag.push(tagInfo);
    setState({ ...state, bookTag: newTag });
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
          <Modal
            onBackdropPress={toggleSubjectModal}
            isVisible={isSubjectModalVisible}>
            <UpdateSubjectTag />
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
          <Modal
            style={{ margin: 0, backgroundColor: 'white' }}
            hasBackdrop={false}
            isVisible={isBookModalVisible}>
            <Text>교재 수정</Text>
            <UpdateBookTag />
            <TouchableOpacity
              style={{ position: 'absolute', top: 15, right: 15 }}
              onPress={toggleBookModal}>
              <Text>완료</Text>
            </TouchableOpacity>
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
        <TextInput
          mode="outlined"
          disabled={true}
          value={addressInfo.code}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />
        <TouchableOpacity
          style={styles.addressSearchButton}
          onPress={toggleAddressModal}>
          <Text style={{ textAlign: 'center' }}>주소 검색</Text>
        </TouchableOpacity>
        <Modal
          style={{ margin: 0, backgroundColor: 'white' }}
          hasBackdrop={false}
          isVisible={isAddressModalVisible}>
          <Text style={{ fontSize: 30, top: 10, left: 20, marginBottom: 10 }}>
            우편번호 찾기
          </Text>
          <Postcode
            style={{
              marginTop: 10,
              width: 400,
              height: 200,
              alignSelf: 'center',
            }}
            jsOptions={{ animation: true }}
            onSelected={(data) => {
              setAddress({ ...addressInfo, code: data.address });
              toggleAddressModal();
            }}
            onError={(error) => console.warn(error)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
              width: 40,
              height: 30,
            }}
            onPress={toggleAddressModal}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </Modal>
        <TextInput
          mode="outlined"
          label="상세 주소"
          value={addressInfo.detail}
          onChangeText={(text) => {
            setAddress({ ...addressInfo, detail: text })
            setState({...state, address: addressInfo.code + ' ' + addressInfo.detail})
          }}
          style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginBottom: 10}}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
          학생 추가
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
    zIndex: 1,
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
  addressSearchButton: {
    justifyContent: 'center',
    position: 'absolute',
    right: 28,
    top: 62,
    backgroundColor: '#bdbfc0',
    borderColor: '#e9e9ea',
    borderWidth: 1,
    borderRadius: 3,
    width: 70,
    height: 40,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
