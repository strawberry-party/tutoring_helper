import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Week from './Week';

class WeeklyProgress extends Component {
  render() {
    return (
      <View>
        <Week />
      </View>
    );
  }
}

export default WeeklyProgress;