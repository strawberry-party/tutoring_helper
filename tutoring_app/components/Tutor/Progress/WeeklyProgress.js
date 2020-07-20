import React, { Component } from 'react';
import { View } from 'react-native';
import Week from './Week';
import { ListItem } from 'react-native-elements';

class WeeklyProgress extends Component {
  render() {
    return (
      <View>
        <ListItem title='1주차' bottomDivider chevron />
        <ListItem title='2주차' bottomDivider chevron />
        <ListItem title='3주차' bottomDivider chevron />
        <Week />
      </View>
    );
  }
}

export default WeeklyProgress;