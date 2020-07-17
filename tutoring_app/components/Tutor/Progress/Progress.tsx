import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WeeklyProgress from './WeeklyProgress';

class Progress extends Component {
  render() {
    return (
      <View>
        <WeeklyProgress />
      </View>
    );
  }
}

export default Progress;