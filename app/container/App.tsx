import DrawerNavigator from './DrawerNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import StudentCalendar from '../component/Schedule/StudentCalendar';
import { Text } from 'react-native';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      <StudentCalendar />
    </Provider>
  );
}

export default App;
