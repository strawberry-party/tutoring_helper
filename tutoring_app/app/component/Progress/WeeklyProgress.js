import React, { Component } from 'react';

import { ListItem } from 'react-native-elements';
import { View } from 'react-native';
import Week from './Week';

class WeeklyProgress extends Component {
  render() {
    return (
      <View>
        <ListItem title="1주차" bottomDivider chevron />
        <ListItem title="2주차" bottomDivider chevron />
        <ListItem title="3주차" bottomDivider chevron />
        <Week />
      </View>
    );
  }
}

export default WeeklyProgress;
