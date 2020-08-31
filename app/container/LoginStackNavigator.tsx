import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../component/SignIn';
import Signup from '../component/SignUp';

const LoginStack = createStackNavigator();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="로그인" component={SignIn} />
      <LoginStack.Screen name="회원가입" component={Signup} />
    </LoginStack.Navigator>
  );
}

export default LoginStackNavigator;
