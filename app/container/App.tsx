import { LessonTime, ScheduleType } from '../types/schedule';

import AssignContainer from './Homework';
import DailyScheduleSelector from '../component/Schedule/DailyScheduleSelector';
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
      {/* <DailyScheduleSelector/> */}
      <ScheduleContainer />
      {/* <AssignContainer/> */}
      {/* <Text> hello </Text> */}
      {/* <ScheduleForm selectedSchedule={new ScheduleType()}/> */}
      {/* <Tester/> */}
    </Provider>
  );
}

export default App;
