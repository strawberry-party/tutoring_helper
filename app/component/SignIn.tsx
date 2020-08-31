import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '978999020967-k0a1307sqi1ehv3e1eo2fgsjmf8e2cd1.apps.googleusercontent.com',
});

function SignIn({ navigation }) {
  const [state, setState] = useState({
    email: '',
    password: '',
    // errorMessage: null,
  });
  const [googleUser, setUser] = useState();

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(state.email, state.password)
      // .then(() => console.log('로그인'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Text style={styles.text}>안녕하세요. 딸기과외입니다. </Text>

        <TextInput
          mode="outlined"
          label="이메일"
          value={state.email}
          onChangeText={(text) => setState({ ...state, email: text })}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />

        <TextInput
          mode="outlined"
          label="비밀번호"
          secureTextEntry={true}
          value={state.password}
          onChangeText={(text) => setState({ ...state, password: text })}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
            로그인
          </Text>
        </TouchableOpacity>

        <GoogleSigninButton
          style={{ marginTop: 20, alignSelf: 'center', height: 60 }}
          size={GoogleSigninButton.Size.Wide}
          onPress={onGoogleButtonPress}
        />

        <View
          style={{ alignSelf: 'center', marginTop: 32, flexDirection: 'row' }}>
          <Text style={{ fontSize: 14 }}>아직 계정이 없으신가요?</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.navigate('회원가입')}>
            <Text style={{ fontWeight: '500', color: '#e91e63' }}>
              회원가입
            </Text>
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
    marginTop: 30,
    alignSelf: 'center',
    height: 60,
    width: 312,
  },
});

export default SignIn;
