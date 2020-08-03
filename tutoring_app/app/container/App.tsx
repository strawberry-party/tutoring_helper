import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Provider } from 'react-redux';
import TutoringHelper from './TutoringHelper';
import store from '../common/store';

export default function App() {
    return (
      <Provider store={store}>
        <TutoringHelper />
      </Provider>
    );
  }
