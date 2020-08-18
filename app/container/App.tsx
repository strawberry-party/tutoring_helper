import { Provider } from 'react-redux';
import React from 'react';
import RootContainer from './RootContainer';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}

export default App;
