import HomeworkContainer from './Homework';
import { Provider } from 'react-redux';
import React from 'react';
import RootContainer from './RootContainer';
import { enableMapSet } from 'immer';
import store from '../common/store';

enableMapSet();
function App() {
  return (
    <Provider store={store}>
      <HomeworkContainer />
      {/* <RootContainer /> */}
    </Provider>
  );
}

export default App;
