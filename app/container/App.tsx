import {
  LessonTime,
  ScheduleType,
  WeeklyScheduleType,
} from '../types/schedule';
import React, { useEffect, useState } from 'react';

import AssignContainer from './Homework';
import DailyScheduleSelector from '../component/Schedule/DailyScheduleSelector';
import DrawerNavigator from './DrawerNavigator';
import LoginStackNavigator from './LoginStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import ScheduleContainer from './Schedule';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import { navigationRef } from '../common/RootNavigation';
import store from '../common/store';

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
      {/* <NavigationContainer ref={navigationRef}>
        {!user ? (
          <LoginStackNavigator />
        ) : (
          <DrawerNavigator userId={user.uid} />
        )}
      </NavigationContainer> */}
      <ScheduleContainer />
    </Provider>
  );
}

export default App;
