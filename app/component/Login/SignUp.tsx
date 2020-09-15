import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, updateName, signup } from '../../states/loginReducer';


function SignUp(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    // errorMessage: null,
  });

  const handleSignUp = () => {
    props.signup()
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always">
      <View>
        <Text style={styles.text}>회원가입</Text>

        <TextInput
          mode="outlined"
          label="이름"
          value={state.name}
          onChangeText={name => {
            setState({...state, name})
            props.updateName(name)
          }}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />

        <TextInput
          mode="outlined"
          label="이메일(아이디)"
          value={state.email}
          onChangeText={email => {
            setState({...state, email})
            props.updateEmail(email)
          }}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />

        <TextInput
          mode="outlined"
          label="비밀번호(6자리 이상)"
          secureTextEntry={true}
          value={state.password}
          onChangeText={password => {
            setState({...state, password})
            props.updatePassword(password)
          }}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />
        {/* <HelperText style={{marginHorizontal: 20}} type="error" visible={state.passwordConfirm === ('' || state.password) ? false : true}>
          6자리 이상의 비밀번호를 입력해주세요.
        </HelperText> */}

        <TextInput
          mode="outlined"
          label="비밀번호 확인"
          secureTextEntry={true}
          value={state.passwordConfirm}
          onChangeText={(text) => setState({ ...state, passwordConfirm: text })}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
          error={
            state.passwordConfirm === ('' || state.password) ? false : true
          }
        /> 
        <HelperText
          style={{ marginHorizontal: 20 }}
          type="error"
          visible={
            state.passwordConfirm === ('' || state.password) ? false : true
          }>
          비밀번호가 일치하지 않습니다
        </HelperText>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
            회원가입
          </Text>
        </TouchableOpacity>

        <View
          style={{ alignSelf: 'center', marginTop: 32, flexDirection: 'row' }}>
          <Text style={{ fontSize: 14 }}>이미 계정이 있으신가요?</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => props.navigation.goBack()}>
            <Text style={{ fontWeight: '500', color: '#e91e63' }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// TODO: 구글 로그인 및 페이크 로그인 state 추가

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  text: {
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
    marginTop: 60,
    marginBottom: 50,
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
    marginTop: 20,
    marginHorizontal: 40,
    height: 60,
  },
});

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, updateName, signup }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
