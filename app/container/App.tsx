import { LessonTime, ScheduleType } from '../types/schedule';

import DrawerNavigator from './DrawerNavigator';
import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React from 'react';
import ScheduleContainer from './Schedule';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import { Text } from 'react-native';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      <ScheduleContainer />
    </Provider>
  );
}

export default App;
