import { Provider } from 'react-redux';
import React from 'react';
import store from '../common/store';
import RootContainer from './RootContainer';

function App(props) {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}

export default App;
