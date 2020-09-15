import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../../states/loginReducer';

function SignIn(props) {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '978999020967-k10ki5sirf2rfg7og4l9htlkikldnus4.apps.googleusercontent.com',
  //     // webClientId: '978999020967-k0a1307sqi1ehv3e1eo2fgsjmf8e2cd1.apps.googleusercontent.com', debug용 Id
  //     offlineAccess: true,
  //   });
  // }, []);

  const [state, setState] = useState({
    email: null,
    password: null,
    errorMessage: null,
  });
  // const [googleUser, setUser] = useState({});

  // const googleLogin = async () => {
  //   try {
  //     const { idToken } = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     return auth().signInWithCredential(googleCredential);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
          props.getUser(user.uid)
          if (props.user != null) {
            console.log('hello');
            // props.navigation.navigate('')
              // this.props.navigation.navigate('Profile')
          }
      }
  })
  }, [])
  const handleLogin = () => {
    props.login()
    // auth()
    //   .signInWithEmailAndPassword(state.email, state.password)
    //   // .then(() => this.props.navigation.navigate('Profile'))
    //   .catch((error) => {
    //     switch (error.code) {
    //       case 'auth/user-not-found' :
    //         setState({...state, errorMessage: '이미 아이디가 있습니다!'})
    //         // console.log('That email address is already in use!');
    //         break;

    //       case 'auth/invalid-email' :
    //         setState({...state, errorMessage: '이메일 형식이 아닙니다!'})
    //         // console.log('That email address is invalid!');
    //         break;

    //       case 'auth/wrong-password' :
    //           setState({...state, errorMessage: '비밀번호가 일치하지 않습니다!'})
    //           // console.log('That email address is invalid!');
    //           break;

    //       default :
    //         console.log(error);
    //     }
    //   });
}

  // const login = () => {
  //   auth()
  //     .signInWithEmailAndPassword(state.email, state.password)
  //     // .then(() => console.log('로그인'))
  //     .catch((error) => {
  //       switch (error.code) {
  //         case 'auth/user-not-found' :
  //           setState({...state, errorMessage: '이미 아이디가 있습니다!'})
  //           // console.log('That email address is already in use!');
  //           break;

  //         case 'auth/invalid-email' :
  //           setState({...state, errorMessage: '이메일 형식이 아닙니다!'})
  //           // console.log('That email address is invalid!');
  //           break;

  //         case 'auth/wrong-password' :
  //             setState({...state, errorMessage: '비밀번호가 일치하지 않습니다!'})
  //             // console.log('That email address is invalid!');
  //             break;

  //         default :
  //           console.log(error);
  //       }
  //     });
  // };

  // console.log(googleUser);
  
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Text style={styles.text}>안녕하세요. 튜나입니다. </Text>
        <TextInput
          mode="outlined"
          label="이메일"
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
          label="비밀번호"
          value={state.password}
          secureTextEntry={true}
          onChangeText={password => {
            setState({...state, password})
            props.updatePassword(password)
          }}
          style={styles.textInput}
          selectionColor="#f48eb1"
          theme={{ colors: { primary: '#f48eb1', placeholder: '#b2b2b2' } }}
        />
        {/* <HelperText style={{marginHorizontal: 20}} type="error" visible={state.errorMessage === null ? false : true}>
          {state.errorMessage}
        </HelperText> */}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 20 }}>
            로그인
          </Text>
        </TouchableOpacity>

        {/* <GoogleSigninButton
          style={{ marginTop: 20, alignSelf: 'center', height: 60 }}
          size={GoogleSigninButton.Size.Wide}
          onPress={googleLogin}
        /> */}

        <View
          style={{ alignSelf: 'center', marginTop: 32, flexDirection: 'row' }}>
          <Text style={{ fontSize: 14 }}>아직 계정이 없으신가요?</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => props.navigation.navigate('회원가입')}>
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

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)