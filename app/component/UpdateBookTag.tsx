//태그 추가 및 삭제 컴포넌트 (모달에 보여지는 컴포넌트)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddBookTag from './AddBookTag';

const ModifyBookTag = ({ tutorId, bookTagArray }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const newTagId = _.uniqueId('bookTag_')
  
  const renderItem = ({ item }) => 
    <ScrollView style={styles.tagItem}>
      <Text style={styles.tagName}>{item.info.name}</Text>
      <TouchableOpacity style={{position: "absolute", right: 15, top: 5, zIndex: 1}} onPress={() => handleDelete(item.key)}>
        <MaterialCommunityIcons name="delete-forever-outline" size={20} />
      </TouchableOpacity>
    </ScrollView>

  const addTag = () => {
    database().ref(`tutors/${tutorId}/bookTagArray/${newTagId}`).set({
      name: name
    })
  }
  const handleDelete = (key) => {
    database().ref(`tutors/${tutorId}/bookTagArray/${key}`).remove()
  }

  return (
    <View style={{ margin: 20, flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={bookTagArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <Modal isVisible={isModalVisible}>
        <AddBookTag />
        <Button title="Hide modal" onPress={toggleModal} />
      </Modal>
      <TouchableOpacity style={{alignSelf: 'center', marginBottom: 5,}} onPress={toggleModal}>
        <Text>교재 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tagItem: {
    backgroundColor: '#ffffff',
    borderColor: '#d5cdcf',
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tagName: {
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    tutorId: state.tutorReducer.uid,
    bookTagArray: state.tagReducer.bookTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModifyBookTag);
