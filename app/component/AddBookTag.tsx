//태그 추가 및 삭제 컴포넌트 (모달에 보여지는 컴포넌트)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-community/picker';

interface StateProps {
  subject: string | number;
  school: string | number;
  grade: string | number;
  semester: string | number;
}

const AddBookTag = ({ tutorId, books }) => {
  const [state, setState] = useState({
    subject: '선택',
    school: '선택',
    grade: '선택',
    semester: '선택',
    books,
  });
  const [currentBook, setCurrentBook] = useState([]);

  const handlePress = (book) => {
    var newBooks = [];
    // console.log(currentBook);
    
    if (currentBook.includes(book)) {
      newBooks = currentBook.filter(check => check.key !== book.key)
      setCurrentBook(newBooks);  
    } else {
      newBooks = [...currentBook, book]
    }
    setCurrentBook(newBooks);
  }

  const handleAdd = () => {
    currentBook.forEach(book => {
      database().ref(`tutors/${tutorId}/bookTagArray/${book.key}`).set(book.info)
    })
  }
  const showBooks = currentBook.map(book => <Text key={book.key}>- {book.info.name}</Text>)

  const renderItem = ({ item }) => (
    <ScrollView style={styles.tagItem}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Text style={styles.tagName}>{item.info.name}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={{ margin: 20, flex: 1, backgroundColor: 'white' }}>
      <View>
        <Text>선택한 책</Text>
        {showBooks}
        {/* <Text>{currentBook.map(book => book.key)}</Text> */}
      </View>
      
      <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={state.subject}
          style={{ width: 100 }}
          onValueChange={(itemValue: string, itemIndex) =>
            setState({ ...state, subject: itemValue })
          }>
          <Picker.Item label="초등 과학" value="초등 과학" />
          <Picker.Item label="수학" value="수학" />
          <Picker.Item label="화학" value="화학" />
        </Picker>
        <Picker
          selectedValue={state.subject}
          style={{ width: 100 }}
          onValueChange={(itemValue: string, itemIndex) =>
            setState({ ...state, school: itemValue })
          }>
          <Picker.Item label="초등학교" value="초등학교" />
          <Picker.Item label="중학교" value="중학교" />
          <Picker.Item label="고등학교" value="고등학교" />
        </Picker>
        <Picker
          selectedValue={state.subject}
          style={{ width: 100 }}
          onValueChange={(itemValue: string, itemIndex) =>
            setState({ ...state, grade: itemValue })
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
        <Picker
          selectedValue={state.subject}
          style={{ width: 100 }}
          onValueChange={(itemValue: string, itemIndex) =>
            setState({ ...state, semester: itemValue })
          }>
          <Picker.Item label="1학기" value="1학기" />
          <Picker.Item label="2학기" value="2학기" />
        </Picker>
      </ScrollView>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <TouchableOpacity style={{alignSelf: 'center', marginBottom: 5,}} onPress={handleAdd}>
        <Text>추가</Text>
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
    books: state.bookReducer.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBookTag);
