import { LessonTime, ScheduleType } from '../types/schedule';

import DrawerNavigator from './DrawerNavigator';
import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React from 'react';
import ScheduleForm from '../component/Schedule/ScheduleForm';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import { Text } from 'react-native';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      {/* <StudentCalendar /> */}
      <ScheduleForm
      selectedSchedule={
        new ScheduleType()
      }
      />
    </Provider>
  );
}

export default App;
