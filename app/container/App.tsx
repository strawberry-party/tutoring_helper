import HomeworkContainer from './Homework';
import Login from '../component/FakeLoginForm';
import { Provider } from 'react-redux';
import React from 'react';
import RootContainer from './RootContainer';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      {/* <HomeworkContainer /> */}
      {/* <RootContainer /> */}
      <Login/>
    </Provider>
  );
}

export default App;
