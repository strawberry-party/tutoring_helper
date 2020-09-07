import { LessonTime, ScheduleType, WeeklyScheduleType } from '../types/schedule';

import AssignContainer from './Homework';
import DailyScheduleSelector from '../component/Schedule/DailyScheduleSelector';
import DailyScheduleSelectorContainerExample from '../component/Schedule/DailyScheduleSelectorExample';
import DrawerNavigator from './DrawerNavigator';
import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React from 'react';
import ScheduleContainer from './Schedule';
import ScheduleForm from '../component/Schedule/ScheduleForm';
import Tester from '../component/Schedule/ScheduleTester';
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
