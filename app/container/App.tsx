import { Provider } from 'react-redux';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import store from '../common/store';

function App() {
  return (
    <Provider store={store}>
      <DrawerNavigator dbData/>
    </Provider>
  );
}

export default App;
