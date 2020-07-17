import React, { Component } from 'react';
import { View } from 'react-native';
import CheckingProgress from './CheckingProgress';

class Week extends Component {
  render() {
    return (
      <View>
        <CheckingProgress />
      </View>
    );
  }
}

export default Week;