import { LessonTime, ScheduleType } from '../types/schedule';

import DrawerNavigator from './DrawerNavigator';
import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React from 'react';
import ScheduleContainer from './Schedule';
import { Text } from 'react-native';
import ToggleCalendarExample from '../component/Schedule/ToggleCalendarExample';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      {/* <ScheduleContainer /> */}
      <ToggleCalendarExample />
    </Provider>
  );
}

export default App;
