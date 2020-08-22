import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import RootContainer from './RootContainer';
import store from '../common/store';
import database from '@react-native-firebase/database'
import _ from 'lodash';


const dbData = database();

function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}

export default App;
