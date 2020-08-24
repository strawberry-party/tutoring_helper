import React, { Component } from 'react';
import { Text, View } from 'react-native';

import LocalNotification from './LocalNotification';

export default class LevelScreen extends Component {
  // componentWillUnmount() {
  //   LocalNotification.unregister();
  // }
  // componentDidMount() {
  //   LocalNotification.register();
  // }

  render() {
    return (
      <View>
        <Text> Hello Push </Text>
      </View>
    );
  }
}
