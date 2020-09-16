import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

const UpdateTutorInfo = ({tutorName}) => {
  const [state, setState] = useState({
    name: tutorName,
  })

  return (
    <View>
      <Text>정보 수정</Text>
      <TextInput
        mode="outlined"
        label="이름"
        value={state.name}
        onChangeText={(text) => setState({ ...state, name: text })}
        style={styles.textInput}
        selectionColor="#f48eb1"
        theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
      />
      <Text>수업 과목 관리</Text>
      <Text>교재 관리</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    tutorName: state.tutorReducer.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTutorInfo);