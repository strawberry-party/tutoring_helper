import DrawerNavigator from './DrawerNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import StudentCalendar from '../component/Tutor/Schedule/StudentCalendar';
import { Text } from 'react-native';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      {/* <DrawerNavigator dbData/> */}
      <Text>Hello world </Text>
      <StudentCalendar />
    </Provider>
  );
}

export default App;
