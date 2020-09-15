//태그 추가 및 삭제 컴포넌트 (모달에 보여지는 컴포넌트)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ModifySubjectTag = ({ tutorId, subjectTagArray }) => {
  
  const newTagId = _.uniqueId('subjectTag_')
  
  const [name, setName] = useState('');
  const renderItem = ({ item }) => 
    <ScrollView style={styles.tagItem}>
      <Text style={styles.tagName}>{item.info.name}</Text>
      <TouchableOpacity style={{position: "absolute", right: 15, top: 5, zIndex: 1}} onPress={() => handleDelete(item.key)}>
        <MaterialCommunityIcons name="delete-forever-outline" size={20} />
      </TouchableOpacity>
    </ScrollView>

  const addTag = () => {
    database().ref(`tutors/${tutorId}/subjectTagArray/${newTagId}`).set({
      name: name
    })
  }
  const handleDelete = (key) => {
    database().ref(`tutors/${tutorId}/subjectTagArray/${key}`).remove()
  }

  return (
    <View style={{ margin: 20, flex: 1, backgroundColor: 'white' }}>
      <Text>과목 태그 수정</Text>
      <FlatList
        data={subjectTagArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <TextInput
        mode="outlined"
        label="새로운 태그"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
        selectionColor="#f48eb1"
        theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
      />
      <TouchableOpacity style={{alignSelf: 'center', marginBottom: 5,}} onPress={addTag}>
        <Text>태그 추가</Text>
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
    subjectTagArray: state.tagReducer.subjectTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModifySubjectTag);
