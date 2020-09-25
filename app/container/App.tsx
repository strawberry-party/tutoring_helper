import {
  LessonTime,
  ScheduleType,
  WeeklyScheduleType,
} from '../types/schedule';
import AssignContainer from './Homework';
import DailyScheduleSelector from '../component/Schedule/DailyScheduleSelector';
import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import DrawerNavigator from './DrawerNavigator';
import store from '../common/store';
import LoginStackNavigator from './LoginStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../common/RootNavigation';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({
    uid: '',
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {!user ? <LoginStackNavigator /> : <DrawerNavigator userId={user.uid} />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
