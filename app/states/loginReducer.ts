import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';

export const updateName = name => {
  return {
    type: UPDATE_NAME,
    payload: name
  }
}

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  }
}

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  }
}

export const login = () => {
  return async (dispatch, getState) => {
      try {
          const { name, email, password } = getState().loginReducer
          const response = await auth().signInWithEmailAndPassword(email, password)

          dispatch(getUser(response.user.uid))
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found' :
            // setState({...state, errorMessage: '이미 아이디가 있습니다!'})
            console.log('That email address is already in use!');
            break;

          case 'auth/invalid-email' :
            // setState({...state, errorMessage: '이메일 형식이 아닙니다!'})
            console.log('That email address is invalid!');
            break;

          case 'auth/wrong-password' :
              // setState({...state, errorMessage: '비밀번호가 일치하지 않습니다!'})
              console.log('That email address is invalid!');
              break;

          default :
            console.log(error);
        }
      }
  }
}

export const getUser = uid => {
  return async (dispatch, getState) => {
      try {
          var user = await database().ref(`tutors/${uid}`).on('value', snapshot => user = snapshot.val())

          dispatch({ type: LOGIN, payload: user })
      } catch (e) {
          alert(e)
      }
  }
}

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { name, email, password } = getState().loginReducer
      const response = await auth().createUserWithEmailAndPassword(email, password)
      response.user.updateProfile({
        displayName: name
      })
      if (response.user.uid) {
        const user = {
          email: email,
          name: name,
          studentNum: 0,
        }

        database().ref(`tutors/${response.user.uid}`)
          .set(user)

        dispatch({ type: SIGNUP, payload: user })
      }
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      }
  }
}

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload
    case SIGNUP:
      return action.payload
    case UPDATE_NAME:
      return { ...state, name: action.payload }
    case UPDATE_EMAIL:
      return { ...state, email: action.payload }
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload }
    default:
      return state
  }
}

export default loginReducer